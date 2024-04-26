import express from 'express';
import { getAgent } from '../controllers/agentController.js';

const router = express.Router();

router.route("/").get(getAgent);

export default router