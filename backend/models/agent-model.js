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
    activeCall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Caller",
      default: null,
    },
    callHistory: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Agent", AgentSchema);
