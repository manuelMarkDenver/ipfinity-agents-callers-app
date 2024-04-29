import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
import connectDb from "./config/db.js";

import agentsRoutes from "./routes/agent-routes.js";
import callersRoutes from "./routes/caller-routes.js";
import callsQueueRoutes from "./routes/calls-queue-routes.js";

import { notFound, errorHandler } from "./middleware/error-middleware.js";

const port = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/agents", agentsRoutes);
app.use("/api/v1/callers", callersRoutes);
app.use("/api/v1/queue", callsQueueRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
