const mysql = require("mysql2/promise");
const config = require("./config.js");
const dbConfigController = require("./db.js");

const chatHistoryController = async function getConversationHistory(
  subscriberID
) {
  const dbConfig = dbConfigController.dbConfig;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT type, message FROM chat_history WHERE subscriberID = ? ORDER BY sequenceID, timestamp",
      [subscriberID]
    );
    await connection.end();

    if (rows.length === 0) {
      return null;
    }

    // Transform the rows into the format expected by GPT API
    return rows.map((row) => {
      return { role: row.type, content: row.message };
    });
  } catch (err) {
    console.error("Error fetching conversation history:", err);
    throw err;
  }
};

module.exports = { chatHistoryController };
