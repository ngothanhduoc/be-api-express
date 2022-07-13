const express = require("express");
const routes = require("./routes/v1");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!, from express");
});

// v1 api routes
app.use("/v1", routes);

module.exports = app;
