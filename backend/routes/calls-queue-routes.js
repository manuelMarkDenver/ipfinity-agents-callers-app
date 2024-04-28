import express from "express";
import {
  getAllQueueCalls,
  getInQueueCalls,
  getQueueCall,
  createQueueCall,
  updateQueueCall,
  deleteQueueCall,
  activateQueueCall,
  endCall,
} from "../controllers/calls-queue.controller.js";

import mongoIdChecker from "../middleware/mongodb-id-checker.js";

const router = express.Router();

// router.param("queueCallId", mongoIdChecker);
// router.param("agentId", mongoIdChecker);
// router.param("callerId", mongoIdChecker);

router.route("/").get(getAllQueueCalls).post(createQueueCall);
router.route("/inqueue").get(getInQueueCalls);
router.route("/:queueCallId").get(getQueueCall);
router.put("/:queueCallId/activateQueueCall", activateQueueCall);
router.put("/:queueCallId", updateQueueCall);
router.delete("/:queueCallId", deleteQueueCall);

router.put("/:queueCallId/endCall", endCall);

export default router;
