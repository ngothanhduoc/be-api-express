const mongoose = require("mongoose");
const app = require("./src/app");
const config = require("./src/config/config");

const port = config.port;

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.info("Connected to MongoDB ");
  app.listen(port, () => {
    console.info("Express started listening on port " + port);
  });
});
