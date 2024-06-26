import asyncHandler from "express-async-handler";
import Caller from "../models/caller-model.js";

import CONSTANTS from "../constants/constants.json" assert { type: "json" };
import QueueCallsModel from "../models/queue-calls-model.js";

// @desc get callers
// @route GET /api/v1/callers/
// @access Private
export const getCallers = asyncHandler(async (req, res) => {
  const callers = await Caller.find();

  if (!callers || callers.length === 0) {
    res.status(200).json([]);
  }

  res.status(200).json(callers);
});

// @desc get a caller
// @route GET /api/v1/caller/:callerId
// @access Private
export const getCaller = asyncHandler(async (req, res) => {
  const { callerId } = req.params;

  const caller = await Caller.findById(callerId);

  if (!caller) {
    res.status(404);
    throw new Error("Caller not found");
  }

  res.status(200).json(caller);
});

// @desc create a caller
// @route POST /api/v1/callers/
// @access Private
export const createCaller = asyncHandler(async (req, res) => {
  const { name, phoneNumber } = req.body;

  if (!name || !phoneNumber) {
    res.status(400);

    throw new Error("Please provide name and phone number");
  }

  const caller = await Caller.create({
    name,
    phoneNumber,
  });
  if (!caller) {
    res.status(400);
    throw new Error(CONSTANTS.ERRORS.CRUD.CALLER.FAILED_CREATE);
  }

  const queueCall = await QueueCallsModel.create({ callerId: caller?._id });

  if (!queueCall) {
    res.status(400);
    throw new Error(CONSTANTS.ERRORS.QUEUE_CALL.QUEUE_CALL_NOT_CREATED);
  }

  res.status(201).json({
    message: CONSTANTS.CRUD.CALLER_AND_QUEUE_CALL.CALLER_AND_QUEUE_CALL_CREATED,
    caller,
    queueCall,
  });
});

// @desc update a caller
// @route PUT /api/v1/callers/:callerId
// @access Private
export const updateCaller = asyncHandler(async (req, res) => {
  const { callerId } = req.params;

  const { name, phoneNumber } = req.body;

  if (!callerId) {
    res.status(400);
    throw new Error("Please provide caller id");
  }

  const caller = await Caller.findById(callerId);

  if (!caller) {
    res.status(400);
    throw new Error("Caller not found");
  }

  const updatedCaller = await Caller.findByIdAndUpdate(
    callerId,
    {
      name: name || caller.name,
      phoneNumber: phoneNumber || caller.phoneNumber,
    },
    {
      new: true,
    }
  );

  if (!updatedCaller) {
    res.status(400);
    throw new Error("Unable to update caller");
  }

  res
    .status(200)
    .json({ message: "Caller successfully updated", data: { updatedCaller } });
});

// @desc delete a caller
// @route DELETE /api/v1/callers/:callerId
// @access Private
export const deleteCaller = asyncHandler(async (req, res) => {
  const { callerId } = req.params;
  if (!callerId) {
    res.status(400);
    throw new Error("Please provide caller id");
  }

  const caller = await Caller.findByIdAndDelete(callerId);

  if (!caller) {
    res.status(404);
    throw new Error("Error deleting caller");
  }

  res.status(200).json({ message: "Caller deleted", data: { caller } });
});
