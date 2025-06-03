const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pet Get Service API",
      version: "1.0.0",
      description: "API para obtener información de mascotas por ID",
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
        Pet: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "123",
            },
            name: {
              type: "string",
              example: "Fido",
            },
            species: {
              type: "string",
              example: "Dog",
            },
            age: {
              type: "integer",
              example: 5,
            },
            responsibleId: {
              type: "string",
              example: "user123",
            },
          },
          required: ["id", "name", "species"],
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Mascota no encontrada.",
            },
            status: {
              type: "integer",
              example: 404,
            },
          },
          required: ["message", "status"],
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs-getPetId", swaggerUi.serve, swaggerUi.setup(specs,));
};

module.exports = setupSwagger;
