const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pet Get Service API",
      version: "1.0.0",
      description: "API to get pet information by ID",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Use JWT tokens for authentication
        },
      },
      schemas: {
        Pet: {  // Pet schema definition
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier of the pet",
            },
            name: {
              type: "string",
              description: "Name of the pet",
            },
            species: {
              type: "string",
              description: "Species of the pet",
            },
            breed: {
              type: "string",
              description: "Breed of the pet",
            },
            image: {
              type: "string",
              description: "Image URL of the pet",
            },
            birthdate: {
              type: "string",
              format: "date",
              description: "Birthdate of the pet",
            },
            residence: {
              type: "string",
              description: "Residence of the pet",
            },
            gender: {
              type: "string",
              description: "Gender of the pet",
            },
            color: {
              type: "string",
              description: "Color of the pet",
            },
            responsibleId: {
              type: "string",
              description: "ID of the person responsible for the pet",
            },
          },
        },
        Error: {  // Error response schema definition
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
            details: {
              type: "string",
              description: "Additional error details (optional)",
            },
          },
        },
      },
    },
    // Apply security globally to all routes that require authentication
    security: [{ bearerAuth: [] }],
  },
  // Specify the files where Swagger will look for documentation comments
  apis: ["./routes/petGetRoutes.js"],
};

const swaggerDocs = swaggerJsdoc(options);

/**
 * Setup Swagger UI middleware on the given Express app.
 * Exposes API documentation at '/api-docs-getPetId'.
 * 
 * @param {import('express').Express} app - Express application instance
 */
const setupSwagger = (app) => {
  app.use("/api-docs-getPetId", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
