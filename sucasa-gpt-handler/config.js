let config = {
  app: {
    maintenanceMode: false,
    development: true,
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
  mail: {
    username: "bookings.sucasa@gmail.com",
    password: "Purpledragon@23",
    senderemail: "bookings.sucasa@gmail.com",
    sendername: "Sucasa Properties",
    host: "smtp.gmail.com",
    secure: true,
    port: "465",
  },
};

// Define the database property outside of the config object
config.database = config.app.development
  ? {
      host: "localhost",
      user: "root",
      password: "sucasa@2023",
      database: "sucasa-gpt-handler",
    }
  : {
      host: "localhost",
      user: "sucaydcm_root",
      password: "sucasa@2023",
      database: "sucaydcm_sucasa-gpt-handler",
    };

module.exports = { config };
