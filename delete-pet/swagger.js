const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pet Profile Service API",
      version: "1.0.0",
      description: "API para gestionar perfiles de mascotas",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            code: {
              type: "integer",
              example: 500,
              description: "Código de estado HTTP",
            },
            message: {
              type: "string",
              example: "Error inesperado",
              description: "Mensaje descriptivo del error",
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs-deletePet", swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;
