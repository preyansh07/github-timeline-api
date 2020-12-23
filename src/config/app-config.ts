import dotenv from "dotenv";

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  apiBaseUrl: process.env.APP_BASE_URL,
  githubToken: process.env.GITHUB_TOKEN,
};
