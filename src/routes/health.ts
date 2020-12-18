import express from "express";

export const router = express.Router();

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
router.get("/health", (req, res) =>
  res.send("All OK! from Express + TypeScript Server")
);
