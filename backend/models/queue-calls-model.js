import mongoose from "mongoose";

const QueueCallsSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      default: null,
      required: false,
    },
    callerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Caller",
      required: true,
    },
    inQueue: {
      type: Boolean,
      default: true,
    },
    resolved: {
      type: Boolean,
      default: false,
      required: false,
    },
    notes: {
      type: String,
      default: "",
      required: false,
    },
    callStartTime: {
      type: Date,
      default: null,
      required: false,
    },
    callEndTime: {
      type: Date,
      default: null,
      required: false,
    },
    agentsHandledHistory: [
      {
        callId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "QueueCalls",
          default: null,
        },
        agentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Agent",
          default: null,
        },
        callerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Caller",
          default: null,
        },
        handledAt: { type: Date, default: null },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("QueueCalls", QueueCallsSchema);
