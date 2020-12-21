import express from "express";
import cors from "cors";

import { config } from "./config/app-config";
import { router as healthRouter } from "./routes/health";
import { router as swaggerRouter } from "./routes/swagger";
import { router as reposRouter } from "./routes/repos";

const app = express();

app.use(cors());

app.use(healthRouter);
app.use(swaggerRouter);
app.use(reposRouter);

const { port } = config;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
