import express from "express";
import {
  getCallers,
  createCaller,
  getCaller,
  updateCaller,
  deleteCaller,
} from "../controllers/caller-controller.js";
import mongoIdChecker from "../middleware/mongodb-id-checker.js";

const router = express.Router();

router.param("callerId", mongoIdChecker);

router.route("/").get(getCallers).post(createCaller);
router.route("/:callerId").get(getCaller);
router.route("/:callerId").put(updateCaller).delete(deleteCaller);

export default router;
