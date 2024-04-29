import { create } from "zustand";
import { createAgentSlice } from "./agentSlice";
import { createCallersSlice } from "./callerSlice";
import { createQueueCallsSlice } from "./queueCallSlice";
import { createCallerAndQueueSlice } from "./callersAndQueueSlice";

export const useBoundStore = create((...args) => ({
  ...createAgentSlice(...args),
  ...createCallersSlice(...args),
  ...createQueueCallsSlice(...args),
  ...createCallerAndQueueSlice(...args),
}));
