import mongoose from 'mongoose';
import asyncHandler from "express-async-handler";
import Agent from "../models/agent-model.js";

// @desc Get list agents
// @route GET /api/v1/agents/list
// @access Public
export const getAgents = asyncHandler(async (req, res) => {
  const agents = await Agent.find();

  if (!agents || agents.length === 0) {
    res.status(200).json([]);
  }

  res.status(200).json(agents);
});

// @desc Get single agent
// @route GET /api/v1/agent/:agentId
// @access Public
export const getAgent = asyncHandler(async (req, res) => {
  const { agentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(agentId))
    res.status(404).json({ message: "Invalid ID" }); // validating `id`

  const agent = await Agent.findById(agentId);

  if (!agent) {
    res.status(404);
    throw new Error("Agent not found");
  }

  res.status(200).json(agent);
});

// @desc Create agent
// @route POST /api/v1/agent/
// @access Private
export const createAgent = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({ message: "Please provide name and email" });
  }

  const agentExists = await Agent.findOne({ email });

  if (agentExists) {
    res.status(400);

    throw new Error("Agent already exists");
  }

  const agent = await Agent.create({
    name,
    email,
  });

  if (agent) {
    res.status(201).json({
      message: "Agent successfully created",
      data: {
        name,
        email,
      },
    });
  } else {
    res.status(400).json({
      message: "Failed to create agent",
    });
  }
};

// @desc Update agent
// @route PUT /api/v1/agent/
// @access Private
export const updateAgent = asyncHandler(async (req, res) => {
  const { agentId } = req.params;

  if (!agentId) {
    res.status(400);
    throw new Error("Please provide agent id");
  }

  const agent = Agent.findById(agentId);

  if (!agent) {
    res.status(404);
    throw new Error("Agent not found");
  }

  const updatedAgent = await Agent.findByIdAndUpdate(
    agentId,
    {
      name: req.body.name || agent.name,
      email: req.body.email || agent.email,
    },
    { new: true }
  );

  if (!updatedAgent) {
    res.status(400);
    throw new Error("Error updating agent");
  }

  res
    .status(200)
    .json({ message: "Agent successfully updated", data: updatedAgent });
});

// @desc Delete agent
// @route DELETE /api/v1/agent/
// @access Private

export const deleteAgent = asyncHandler(async (req, res) => {
  const { agentId } = req.params;

  const deletedAgent = await Agent.findByIdAndDelete(agentId);

  if (!deletedAgent) {
    res.status(404);
    throw new Error("Agent not found");
  }

  res.status(200).json(deletedAgent);
});
