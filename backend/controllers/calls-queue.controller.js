import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import QueueCallsModel from "../models/queue-calls-model.js";
import AgentModel from "../models/agent-model.js";
import CallerModel from "../models/caller-model.js";

const callerHistoryChecker = (queueCallId, agentHistory) => {
  let history = [];

  const callerIdExist = agentHistory.includes(queueCallId);

  if (callerIdExist) {
    return (history = agentHistory);
  }

  return [...agentHistory, queueCallId];
};

// @desc Get all call from the queue
// @route GET /api/v1/queue
// @access Private
export const getQueueCalls = asyncHandler(async (req, res) => {
  const queueCalls = await QueueCalls.find();

  res.status(200).json(queueCalls);
});

// @desc Get a call from the queue
// @route GET /api/v1/:queueCallId
// @access Private
export const getQueueCall = asyncHandler(async (req, res) => {
  const { queueCallId } = req.params;

  const queueCall = await QueueCallsModel.findById(queueCallId);

  res.status(200).json(queueCall);
});

// @desc Create a call from the queue
// @route POST /api/v1/queue
// @access Private
export const createQueueCall = asyncHandler(async (req, res) => {
  const { agentId, callerId } = req.body;

  if (agentId && !mongoose.Types.ObjectId.isValid(agentId)) {
    res.status(400);
    throw new Error("Invalid ID");
  }

  if (!mongoose.Types.ObjectId.isValid(callerId)) {
    res.status(400);
    throw new Error("Invalid ID");
  }

  if (!callerId) {
    res.status(400);
    throw new Error("Please provide caller id");
  }

  const queueCall = await QueueCallsModel.create({
    callerId,
  });

  if (!queueCall) {
    res.status(400);
    throw new Error("Queue call not created");
  }

  res.status(201).json({
    message: "Queue call created successfully",
    data: queueCall,
  });
});

// @desc Update a call from the queue
// @route PUT /api/v1/queue/:queueCallId
// @access Private
export const updateQueueCall = asyncHandler(async (req, res) => {
  const { queueCallId } = req.params;

  console.log("body", req?.body);

  if (!queueCallId) {
    res.status(404);
    throw new Error("Please provide queue call id");
  }

  const queueCall = await QueueCallsModel.findById(queueCallId);

  if (!queueCall) {
    res.status(400);
    ``;
    throw new Error("Queue call not found");
  }

  const updateData = {
    agentId:
      req.body.agentId !== undefined ? req.body.agentId : queueCall.agentId,
    callerId:
      req.body.callerId !== undefined ? req.body.callerId : queueCall.callerId,
    callHandled:
      req.body.callHandled !== undefined
        ? req.body.callHandled
        : queueCall.callHandled,
    completed:
      req.body.completed !== undefined
        ? req.body.completed
        : queueCall.completed,
    callStartTime:
      req.body.callStartTime !== undefined
        ? req.body.callStartTime
        : queueCall.callStartTime,
    callEndTime:
      req.body.callEndTime !== undefined
        ? req.body.callEndTime
        : queueCall.callEndTime,
  };

  const updatedQueueCall = await QueueCallsModel.findByIdAndUpdate(
    queueCallId,
    updateData,
    {
      new: true,
    }
  );

  if (!updatedQueueCall) {
    res.status(400);
    throw new Error("Failed to update queue call");
  }

  res.status(200).json({
    message: "Queue call updated successfully",
    data: {
      agentId: updatedQueueCall.agentId,
      callerId: updatedQueueCall.callerId,
      callHandled: updatedQueueCall.callHandled,
      completed: updatedQueueCall.completed,
      callStartTime: updatedQueueCall.callStartTime,
      callEndTime: updatedQueueCall.callEndTime,
    },
  });
});

// @desc Delete a call from the queue
// @route DELETE /api/v1/queue/:queueCallId
// @access Private
export const deleteQueueCall = asyncHandler(async (req, res) => {
  const { queueCallId } = req.params;

  const queueCall = await QueueCallsModel.findById(queueCallId);

  if (!queueCall) {
    res.status(404);
    throw new Error("Queue call not found");
  }

  const deletedQueueCall = await QueueCallsModel.findByIdAndDelete(queueCallId);

  if (!deletedQueueCall) {
    res.status(400);
    throw new Error("Failed to delete queue call");
  }

  res.status(200).json({
    message: "Queue call deleted successfully",
    data: deletedQueueCall,
  });
});

export const activateQueueCall = asyncHandler(async (req, res) => {
  const { queueCallId, agentId, callerId } = req.params;
  const agent = await AgentModel.findById(agentId);

  // Check if agent exists
  if (!agent) {
    res.status(404);
    throw new Error("Agent not found");
  }

  const caller = await CallerModel.findById(callerId);
  // Check if caller exists
  if (!caller) {
    res.status(404);
    throw new Error("Caller not found");
  }

  // If agent exist, check if agent is available for call
  if (!agent.availableForCall) {
    res.status(400);
    throw new Error("Agent is not available for call");
  }

  const updatedAgent = await AgentModel.findByIdAndUpdate(
    agentId,
    {
      availableForCall: false,
      activeCall: queueCallId,
      callerId: callerId,
      callHistory: callerHistoryChecker(queueCallId, agent.callHistory),
    },
    { new: true }
  );

  if (!updatedAgent) {
    res.status(400);
    throw new Error("Failed to update agent");
  }

  const queueCall = await QueueCallsModel.findById(queueCallId);

  if (!queueCall) {
    res.status(400);
    throw new Error("Queue call not found");
  }

  const updateData = {
    agentId: agentId !== undefined ? agentId : null,
    callerId: queueCall.callerId,
    callHandled: true,
    completed: queueCall.completed,
    callStartTime: Date.now(),
    callEndTime: queueCall.callEndTime,
  };

  const updatedQueueCall = await QueueCallsModel.findByIdAndUpdate(
    queueCallId,
    updateData,
    { new: true }
  );

  if (!updatedQueueCall) {
    res.status(400);
    throw new Error("Failed to update queue call");
  }

  res.status(200).json(updatedQueueCall);
});

export const completeQueueCall = asyncHandler(async (req, res) => {
  const { queueCallId } = req.params;

  const queueCall = await QueueCallsModel.findById(queueCallId);
  if (!queueCall) {
    res.status(404);
    throw new Error("Queue call not found");
  }

  const updateData = {
    completed: true,
    callEndTime: Date.now(),
  };

  const updatedQueueCall = await QueueCallsModel.findByIdAndUpdate(
    queueCallId,
    updateData,
    { new: true }
  );

  if (!updatedQueueCall) {
    res.status(400);
    throw new Error("Failed to update queue call");
  }

  res.status(200).json(updatedQueueCall);
});
