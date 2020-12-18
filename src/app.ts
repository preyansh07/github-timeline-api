import express from "express";
import { config } from "./config/app-config";
import { router as healthRouter } from "./routes/health";
import { router as swaggerRouter } from "./routes/swagger";

const app = express();

app.use(healthRouter);
app.use(swaggerRouter);

const { PORT } = config;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
