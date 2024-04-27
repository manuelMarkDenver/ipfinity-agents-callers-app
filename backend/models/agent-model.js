import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    availableForCall: {
      type: Boolean,
      default: true,
    },
    currentCaller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Caller",
      default: null,
    },
    activeCall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QueueCalls",
      default: null,
    },
    callHistory: [
      {
        callId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "QueueCalls",
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

export default mongoose.model("Agent", AgentSchema);
