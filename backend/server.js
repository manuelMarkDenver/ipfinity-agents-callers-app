import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";

import agentsRoutes from "./routes/agent-routes.js";
import callersRoutes from "./routes/caller-routes.js";
import callsQueueRoutes from './routes/calls-queue-routes.js'

import { notFound, errorHandler } from "./middleware/error-middleware.js";

const port = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("api running"));
app.get("/api", (req, res) => res.send("api running"));

app.use("/api/v1/agents", agentsRoutes);
app.use("/api/v1/callers", callersRoutes);
app.use("/api/v1/queue", callsQueueRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
