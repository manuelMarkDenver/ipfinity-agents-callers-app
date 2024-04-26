import express from "express";
import {
  getQueueCalls,
  getQueueCall,
  createQueueCall,
  updateQueueCall,
  deleteQueueCall,
  activateQueueCall,
  completeQueueCall,
} from "../controllers/calls-queue.controller.js";

import mongoIdChecker from "../middleware/mongodb-id-checker.js";

const router = express.Router();

router.param("queueCallId", mongoIdChecker);
router.param("agentId", mongoIdChecker);
router.param("callerId", mongoIdChecker);

router.route("/").get(getQueueCalls).post(createQueueCall);
router.route("/:queueCallId").get(getQueueCall);
router.put("/:queueCallId", updateQueueCall);
router.delete("/:queueCallId", deleteQueueCall);

router.put(
  "/:queueCallId/:agentId/:callerId/activateQueueCall",
  activateQueueCall
);

router.put("/:queueCallId/completeQueueCall", completeQueueCall);

export default router;
