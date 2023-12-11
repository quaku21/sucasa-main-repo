const fs = require("fs");

const fileReader = function readFileContentSync(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
};

module.exports = { fileReader };

// // Usage example
// try {
//   const content = readFileContentSync("path/to/your/file.txt");
//   console.log(content);
// } catch (error) {
//   console.error(error);
// }
