import { create } from "zustand";
import axios from "axios";

const useQueueCallsStore = create((set, get) => ({
  data: [],
  inQueueCalls: [],
  isLoading: false,
  error: null,

  fetchData: async () => {
    set({ isLoading: true });

    try {
      const response = await axios.get("/api/v1/queue");

      set({ data: response.data, isLoading: false, error: null });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchAllInqueueCalls: async () => {
    set({ isLoading: true });

    try {
      const response = await axios.get("/api/v1/queue/inqueue");
      set({ inQueueCalls: response.data, isLoading: false, error: null });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  startCall: async (queueCallId, agentId) => {
    try {
      const response = await axios.put(
        `/api/v1/queue/${queueCallId}/activateQueueCall?agentId=${agentId}`
      );

      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  endCall: async (queueCallId) => {
    try {
      const response = await axios.put(`/api/v1/queue/${queueCallId}/endCall`);

      await get().fetchAllInqueueCalls();

      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

axios.get("/api/v1/queue/inqueue").then((response) => {
  useQueueCallsStore.setState({ inQueueCalls: response.data });
  useQueueCallsStore.setState({ isLoading: false, error: null });
});

export default useQueueCallsStore;
