const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Pet Profile API",
      version: "1.0.0",
      description: "API para el manejo de perfiles de mascotas",
      
    },
    
    servers: [
      {
        url: "http://localhost:3002/api",
      }
    ],
    tags: [
      {
        name: "Pets",
        description: "Operaciones relacionadas con los perfiles de mascotas",
      },
    ],
    produces: ["application/json"],
  },
  // Especificamos las rutas que contienen los comentarios Swagger
  apis: ["./routes/petRoutes.js"], // Asegúrate de que la ruta esté correctamente especificada
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs-create", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 
};

module.exports = setupSwagger;
