import axios from "axios";
import config from "./config.js";
import dotenv from "dotenv";
import OpenAI from "openai";
// require("dotenv").config();

const API_KEY = process.env.OPENAI_API_KEY;
// const API_URL = config.gpt.apiUrl;

const openai = new OpenAI({
  apiKey: "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",
});

const callGPTAPI = async (req, res) => {
  try {
    const message = "Which is the capital of Albania?";
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0,
      max_tokens: 1000,
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// const callGPTAPI = async (prompt) => {
//   try {
//     const response = await axios.post(
//       API_URL,
//       {
//         prompt: prompt,
//         max_tokens: config.gpt.maxToken,
//         stop: null,
//         temperature: config.gpt.temperature,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log(response);

//     return response.data.choices[0].text;
//   } catch (error) {
//     console.error("Error communicating with GPT API:", error);
//     throw error;
//   }
// };

export default callGPTAPI;
