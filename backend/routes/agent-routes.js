import express from "express";
import {
  getAgent,
  getAgents,
  getAvailableAgents,
  createAgent,
  updateAgent,
  deleteAgent,
} from "../controllers/agent-controller.js";
import mongoIdChecker from "../middleware/mongodb-id-checker.js";

const router = express.Router();

// router.param("agentId", mongoIdChecker);

router.route("/").get(getAgents).post(createAgent);
router.get("/available", getAvailableAgents);
router.route("/:agentId").get(getAgent).put(updateAgent).delete(deleteAgent);

export default router;
