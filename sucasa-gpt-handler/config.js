config = {
  app: {
    maintenanceMode: false,
  },
  gpt: {
    apiUrl: "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
    temperature: 0.7,
    maxToken: 400,
    model: "gpt-4-1106-preview",
  },
  files: {
    vdbPath: "./vdb.txt",
  },
};
module.exports = { config };
