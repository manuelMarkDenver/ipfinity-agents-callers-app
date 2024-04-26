import express from "express";
import dotenv from "dotenv";
dotenv.config();

import agentRoutes from "./routes/agent-routes.js";

const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => res.send("api running"));
app.get("/api", (req, res) => res.send("api running"));

app.use("/api/agents", agentRoutes);
app.listen(port, () => console.log(`Server started on port ${port}`));
