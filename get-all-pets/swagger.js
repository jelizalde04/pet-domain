const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Pet Profile Service API",
      version: "1.0.0",
      description: "API for managing pet profiles",
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
  // Especificamos las rutas que contienen los comentarios Swagger
  apis: ["./routes/petRoutes.js"], // Apunta a los archivos de rutas y controladores donde están los comentarios Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs-allPets", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Configura la documentación en '/api-docs'
};

module.exports = setupSwagger;
