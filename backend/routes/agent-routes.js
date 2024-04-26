import express from 'express';
import { getAgent } from '../controllers/agent-controller.js';

const router = express.Router();

router.route("/").get(getAgent);

export default router