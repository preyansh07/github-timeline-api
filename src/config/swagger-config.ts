import swaggerJsdoc from "swagger-jsdoc";
import { config } from "./app-config";

const swaggerDefinition = {
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
      url: `http://localhost:${config.PORT}`,
      description: "Development environment",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpecification = swaggerJsdoc(options);
