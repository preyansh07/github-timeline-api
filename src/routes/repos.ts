import express from "express";
import { UserReposResponse } from "../interfaces/UserReposResponse";
import { graphql } from "@octokit/graphql";
import { config } from "../config/app-config";
import { ErrorResponse } from "../interfaces/ErrorResponse";
import { ApiError } from "../interfaces/ApiError";

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
 *     ApiError:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *         message:
 *           type: string
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ApiError'
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
 *       404:
 *         description: user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/users/:username/repos", async (req, res) => {
  try {
    const { user } = await graphql(
      `
        query UserRepositories($gh_username: String!) {
          user(login: $gh_username) {
            repositories(
              first: 10
              orderBy: { field: CREATED_AT, direction: DESC }
            ) {
              totalCount
              nodes {
                name
                description
                createdAt
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }
      `,
      {
        headers: {
          authorization: `token ${config.githubToken}`,
        },
        gh_username: req.params.username,
      }
    );

    const response: UserReposResponse = {
      data: user.repositories.nodes,
    };

    res.json(response);
  } catch (error) {
    console.error(error.message);
    let apiError: ApiError;
    if (
      error.errors !== undefined &&
      error.errors.map((error) => error.type).includes("NOT_FOUND")
    ) {
      apiError = {
        status: 404,
        message: `No GitHub user found with username '${req.params.username}'.`,
      };
    } else {
      apiError = {
        status: 500,
        message: "Something went wrong. Please try again after sometime.",
      };
    }

    const errorResponse: ErrorResponse = {
      errors: [apiError],
    };

    res.status(apiError.status).json(errorResponse);
  }
});
