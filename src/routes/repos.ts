import express from "express";
import { UserReposResponse } from "../interfaces/UserReposResponse";

export const router = express.Router();

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Repo:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *     UserReposResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Repo'
 *
 * /users/{username}/repos:
 *   get:
 *     description: Get latest 25 GitHub repos of a user
 *     parameters:
 *       - name: username
 *         in: path
 *         description: GitHub username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReposResponse'
 */
router.get("/users/:username/repos", (req, res) => {
  const response: UserReposResponse = {
    data: [
      {
        name: "my-awesome-repo",
        description: "Repository description",
        createdAt: "2020-10-05T12:26:03Z",
      },
    ],
  };

  res.json(response);
});
