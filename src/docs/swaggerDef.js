const { version } = require("../../package.json");
const config = require("../config/config");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "GalaxyOne Backend Training API Documentation",
    version,
  },
  servers: [
    {
      url: config.domain,
    },
  ],
};

module.exports = swaggerDef;
