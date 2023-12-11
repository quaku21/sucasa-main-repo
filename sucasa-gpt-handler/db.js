const mysql = require("mysql2/promise");

// Database connection details
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "sucasa@2023",
  database: "sucasa-gpt-handler",
};

module.exports = { dbConfig };
