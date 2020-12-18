import express from "express";
import { swaggerSpecification } from "../config/swagger-config";
import swaggerUiExpress from "swagger-ui-express";

export const router = express.Router();

router.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerSpecification)
);
