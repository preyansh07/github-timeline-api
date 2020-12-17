import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const app = express();
const PORT = 8000;

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "GitHub timeline API with Swagger",
      version: "0.1.0",
      description:
        "This is a Express.js RESTful API based on OpenAPI 3.0 Specification and documented with Swagger. It exposes GitHub user timeline data using GitHub GraphQL API.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Preyansh Mitharwal",
        url: "https://preyansh07.github.io",
        email: "preyansh.mitharwal@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development environment",
      },
    ],
  },
  apis: ["./index.ts"],
};

const swaggerSpecification = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerSpecification)
);

/**
 * @swagger
 *
 * /health:
 *   get:
 *     produces:
 *       - text/plain
 *     responses:
 *       200:
 *         description: Health status
 */
app.get("/health", (req, res) =>
  res.send("All OK! from Express + TypeScript Server")
);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
