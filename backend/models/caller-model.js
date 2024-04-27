import mongoose from "mongoose";

const CallerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    currentAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      default: null,
    },
    agentHistory: [
      {
        agent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Agent",
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

export default mongoose.model("Caller", CallerSchema);
