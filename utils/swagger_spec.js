const swaggerJSDoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api Documention of SkillUp",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3005",
      },
    ],
  },
  apis: ["./mongodb.js"],
};
module.exports = swaggerJSDoc(options);
