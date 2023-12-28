const express = require("express");
const utils = require("./utils.js");
const bodyParser = require("body-parser");
const config = require("./config.js");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();
const fileReader = require("./file-reader.js");
const chatHistoryController = require("./chat-history-controller.js");
const mysql = require("mysql2/promise");
const hbs = require("hbs");
const mailer = require("./mailer.js");

const app = express();

app.engine("html", hbs.__express);
app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.json()); // Parses json, multi-part (file), url-encoded
app.use(bodyParser.json());
app.use(cors());

// Function to read and cache the file
function cacheFileContent(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    cachedContent = data;
  });
}

// Define routes here
app.use(function (req, res, next) {
  if (config.config.app.maintenanceMode) {
    res.status(404).send("App in maintennance mode");
  }
  next();
});

app.use("/api", async (req, res, next) => {
  const userAgent = req.headers["user-agent"];
  if (!utils.utils.browserDetect(userAgent)) {
    console.log("Unknown user");
    return res.status(403).send("Unknown User");
  }
  return next(); // user is authenticated
});

app.use("/api/callSucasaGPT", async (req, res, next) => {
  let { prompt, subscriberID } = req.body;

  if (!prompt.trim()) {
    return res.status(400).send("Prompt is required in the body");
  }

  try {
    // Fetch conversation history
    const history = await chatHistoryController.chatHistoryController(
      subscriberID
    );
    let messages = history || [];

    // Read knowledge base
    const vdb = await fileReader.fileReader("./vdb.txt");

    //prepend knowledge base
    messages.unshift({ role: "system", content: vdb });

    //add current user message
    messages.push({ role: "user", content: prompt });

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Call GPT API
    const response = await openai.chat.completions.create({
      model: config.config.gpt.model,
      messages: messages,
      temperature: config.config.gpt.temperature,
      max_tokens: config.config.gpt.maxToken,
    });

    // Check if response is valid
    if (
      response &&
      response.choices &&
      response.choices.length > 0 &&
      response.choices[0].message
    ) {
      const gptResponse = response.choices[0].message.content;

      // Connect to the database
      const connection = await mysql.createConnection(config.config.database);

      // Determine the new sequenceID
      const [rows] = await connection.execute(
        "SELECT MAX(sequenceID) AS maxSequence FROM chat_history WHERE subscriberID = ?",
        [subscriberID]
      );
      const sequenceID = (rows[0].maxSequence || 0) + 1;

      // Insert user's prompt and GPT's response into the database
      const insertQuery =
        "INSERT INTO chat_history (subscriberID, message, type, sequenceID) VALUES (?, ?, ?, ?)";
      await connection.execute(insertQuery, [
        subscriberID,
        prompt,
        "user",
        sequenceID,
      ]);
      await connection.execute(insertQuery, [
        subscriberID,
        gptResponse,
        "assistant",
        sequenceID,
      ]);

      // Close the database connection
      await connection.end();

      // Return GPT's response

      //set a custom field here

      return res.status(200).json({ response: gptResponse });
    } else {
      throw new Error("Invalid response from GPT API");
    }

    // Rest of your implementation...
  } catch (err) {
    console.error(err);
    return res.status(500).json(err.message);
  }
});

app.get("*", function (req, res) {
  //res.render("pages/index/index.html", { csrfToken });
  //console.log("Hit here");
  return res.send({
    statusCode: 200,
    message: "Sucasa GPT Server running",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
