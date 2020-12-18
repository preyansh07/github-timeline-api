import express from "express";

export const router = express.Router();

/**
 * @swagger
 *
 * /health:
 *   get:
 *     description: Get health status of the API
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get("/health", (req, res) =>
  res.send("All OK! from Express + TypeScript Server")
);
