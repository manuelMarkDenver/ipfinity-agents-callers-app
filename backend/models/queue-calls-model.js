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
      required: false,
    },
    callHandled: {
      type: Boolean,
      default: false,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
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
    agentsHandledHistory: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("QueueCalls", QueueCallsSchema);
