import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import QueueCallsModel from "../models/queue-calls-model.js";
import AgentModel from "../models/agent-model.js";
import CallerModel from "../models/caller-model.js";

import CONSTANTS from "../constants/constants.json" assert { type: "json" };

// const callerHistoryChecker = (queueCallId, agentHistory) => {
//   let history = [];

//   const callerIdExist = agentHistory.includes(queueCallId);

//   if (callerIdExist) {
//     return (history = agentHistory);
//   }

//   console.log("histyr", [...agentHistory, queueCallId]);

//   return [...agentHistory, queueCallId];
// };

// @desc Get all call from the queue
// @route GET /api/v1/queue
// @access Private
export const getAllQueueCalls = asyncHandler(async (req, res) => {
  const queueCalls = await QueueCallsModel.find()
    .populate({ path: "agentId" })
    .populate({ path: "callerId" })
    .exec();
  if (!queueCalls || queueCalls.length === 0) {
    res.status(200).json([]);
  }

  res.status(200).json(queueCalls);
});

// @desc Get all call from the queue
// @route GET /api/v1/queue/active
// @access Private
export const getInQueueCalls = asyncHandler(async (req, res) => {
  const queueCalls = await QueueCallsModel.find({ inQueue: true })
    .populate({ path: "agentId" })
    .populate({ path: "callerId" })
    .exec();
  if (!queueCalls || queueCalls.length === 0) {
    res.status(200).json([]);
  }

  res.status(200).json(queueCalls);
});

// @desc Get a call from the queue
// @route GET /api/v1/:queueCallId
// @access Private
export const getQueueCall = asyncHandler(async (req, res) => {
  const { queueCallId } = req.params;

  const queueCall = await QueueCallsModel.findById(queueCallId);

  if (!queueCall) {
    res.status(200);
    throw new Error(CONSTANTS.ERRORS.NOT_FOUND.QUEUE_CALL_NOT_FOUND);
  }

  res.status(200).json(queueCall);
});

// @desc Create a call from the queue
// @route POST /api/v1/queue
// @access Private
export const createQueueCall = asyncHandler(async (req, res) => {
  const { agentId, callerId } = req.body;
  if (agentId && !mongoose.Types.ObjectId.isValid(agentId)) {
    res.status(400);
    throw new Error(CONSTANTS.ERRORS.NOT_VALID.INVALID_ID);
  }

  if (!mongoose.Types.ObjectId.isValid(callerId)) {
    res.status(400);
    throw new Error(CONSTANTS.ERRORS.NOT_VALID.INVALID_ID);
  }

  if (!callerId) {
    res.status(400);
    throw new Error("Please provide caller id");
  }

  const caller = await CallerModel.findById(callerId);

  if (!caller) {
    res.status(404);
    throw new Error(CONSTANTS.ERRORS.NOT_FOUND.CALLER_NOT_FOUND);
  }

  const queueCall = await QueueCallsModel.create({
    callerId,
  });

  if (!queueCall) {
    res.status(400);
    throw new Error(CONSTANTS.ERRORS.QUEUE_CALL.QUEUE_CALL_NOT_CREATED);
  }

  res.status(201).json({
    message: CONSTANTS.CRUD.QUEUE_CALL.QUEUE_CALL_CREATED,
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
    inQueue:
      req.body.inQueue !== undefined ? req.body.inQueue : queueCall.inQueue,
    resolved:
      req.body.resolved !== undefined ? req.body.resolved : queueCall.resolved,
    notes: req.body.notes !== undefined ? req.body.notes : queueCall.notes,
    callStartTime:
      req.body.callStartTime !== undefined
        ? req.body.callStartTime
        : queueCall.callStartTime,
    callEndTime:
      req.body.callEndTime !== undefined
        ? req.body.callEndTime
        : queueCall.callEndTime,
    agentsHandledHistory:
      req.body.agentsHandledHistory !== undefined
        ? req.body.agentsHandledHistory
        : queueCall.agentsHandledHistory,
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
      inQueue: updatedQueueCall.inQueue,
      resolved: updatedQueueCall.resolved,
      notes: updatedQueueCall.notes,
      callStartTime: updatedQueueCall.callStartTime,
      callEndTime: updatedQueueCall.callEndTime,
      agentsHandledHistory: updatedQueueCall.agentsHandledHistory,
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

// @desc Activate a call from the queue and assign it to an agent
// @route PUT /api/v1/queue/:queueCallId?agentId=:agentId&callerId=:callerId
// @access Private
export const activateQueueCall = asyncHandler(async (req, res) => {
  const { queueCallId } = req.params;
  const { agentId } = req.query;
  const agent = await AgentModel.findById(agentId);

  const queueCall = await QueueCallsModel.findOne({
    _id: queueCallId,
    inQueue: true,
  });

  if (!queueCall) {
    res.status(400);
    throw new Error(CONSTANTS.ERRORS.NOT_FOUND.QUEUE_CALL_NOT_FOUND);
  }

  // Check if agent exists
  if (!agent) {
    res.status(404);
    throw new Error(CONSTANTS.ERRORS.NOT_FOUND.AGENT_NOT_FOUND);
  }

  const caller = await CallerModel.findById(queueCall?.callerId?._id);
  // Check if caller exists
  if (!caller) {
    res.status(404);
    throw new Error(CONSTANTS.ERRORS.CALLER_NOT_FOUND);
  }

  // If agent exist, check if agent is available for call
  if (!agent.availableForCall) {
    res.status(400);
    throw new Error(CONSTANTS.ERRORS.AGENT.NOT_AVAILABLE_FOR_CALL);
  }

  const updatedAgent = await AgentModel.findByIdAndUpdate(
    agentId,
    {
      availableForCall: false,
      currentCaller: queueCall?.callerId?._id,
      activeCall: queueCallId,
      callHistory: [
        ...agent.callHistory,
        {
          callId: queueCallId,
          callerId: queueCall?.callerId?._id,
          handledAt: Date.now(),
        },
      ],
    },
    { new: true }
  );

  if (!updatedAgent) {
    res.status(400);
    throw new Error(CONSTANTS.ERRORS.CRUD.AGENT.FAILED_UPDATE);
  }

  const updateData = {
    agentId: agentId !== undefined ? agentId : null,
    callerId: queueCall.callerId,
    inQueue: false,
    resolved: queueCall.resolved,
    callStartTime: Date.now(),
    callEndTime: queueCall.callEndTime,
    agentsHandledHistory: [
      ...queueCall.agentsHandledHistory,
      {
        callId: queueCallId,
        agentId: agentId,
        callerId: queueCall?.callerId?._id,
        handledAt: Date.now(),
      },
    ],
  };

  const updatedQueueCall = await QueueCallsModel.findByIdAndUpdate(
    queueCallId,
    updateData,
    { new: true }
  );

  if (!updatedQueueCall) {
    res.status(400);
    throw new Error(CONSTANTS.ERRORS.CRUD.QUEUE_CALL.FAILED_UPDATE);
  }

  res.status(200).json({
    message: CONSTANTS.CRUD.QUEUE_CALL.QUEUE_CALLS_ASSIGNED_OK,
  });
});

// @desc Complete a call
// @route PUT /api/v1/queue/:queueCallId
// @access Private
export const endCall = asyncHandler(async (req, res) => {
  const { queueCallId } = req.params;

  const queueCall = await QueueCallsModel.findById(queueCallId);
  if (!queueCall) {
    res.status(404);
    throw new Error(CONSTANTS.ERRORS.NOT_FOUND.QUEUE_CALL_NOT_FOUND);
  }

  const updateData = {
    resolved: true,
    inQueue: false,
    callEndTime: Date.now(),
  };

  const updatedQueueCall = await QueueCallsModel.findByIdAndUpdate(
    queueCallId,
    updateData,
    { new: true }
  );

  if (!updatedQueueCall) {
    res.status(400);
    throw new Error(CONSTANTS.ERRORS.CRUD.QUEUE_CALL.FAILED_UPDATE);
  }

  // Updating agent
  const agent = await AgentModel.findById(queueCall.agentId);

  if (!agent) {
    res.status(404);
    throw new Error(CONSTANTS.ERRORS.NOT_FOUND.AGENT_NOT_FOUND);
  }

  const updatedAgent = await AgentModel.findByIdAndUpdate(
    queueCall.agentId,
    {
      availableForCall: true,
      currentCaller: null,
      activeCall: null,
    },
    { new: true }
  );

  if (!updatedAgent) {
    res.status(400);
    throw new Error(CONSTANTS.ERRORS.CRUD.AGENT.FAILED_UPDATE);
  }

  res.status(200).json({ message: "Call completed successfully" });
});
