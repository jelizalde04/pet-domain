const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pet Update Service API",
      version: "1.0.0",
      description: "API para actualización de perfiles de mascotas",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"], 
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs-updatePet", swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;
