const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Tracker API Docs",
      version: "1.0.0",
      description: "API documentation for Expense Tracker application",
    },
    servers: [
      {
        url: "http://localhost:8080", 
      },
    ],
  },
  // Path to API docs (we'll use JSDoc comments inside routes)
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
