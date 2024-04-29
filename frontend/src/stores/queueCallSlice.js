import axios from "axios";

export const createQueueCallsSlice = (set, get) => ({
  allQueueCalls: [],
  inQueueCalls: [],
  isAllQueueCallsLoading: false,
  allQueueCallsError: null,

  fetchQueueCallsData: async () => {
    set({ isLoading: true });

    try {
      const response = await axios.get("/api/v1/queue");

      set({ allQueueCalls: response.data, isLoading: false, error: null });
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

      // const updatedAgents =
      //   response &&
      //   get().agents?.map((agent) => {
      //     if (agent?._id === agentId) {
      //       return { ...agent, ...response?.data?.agent };
      //     }
      //     return agent;
      //   });
      // const updatedQueue =
      //   response &&
      //   get().allQueueCalls?.map((queue) => {
      //     if (queue?._id === queueCallId) {
      //       return { ...queue, ...response?.data?.queue };
      //     }
      //     return queue;
      //   });

      // set({ agents: updatedAgents, isLoading: false, error: null });

      // set({ allQueueCalls: updatedQueue, isLoading: false, error: null });

      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  endCall: async (queueCallId) => {
    try {
      const response = await axios.put(`/api/v1/queue/${queueCallId}/endCall`);
      const updatedAgents =
        response &&
        get().agents?.map((agent) => {
          if (agent?._id === response?.data?.agent?._id) {
            return { ...agent, ...response?.data?.agent };
          }
          return agent;
        });
      const updatedQueue =
        response &&
        get().allQueueCalls?.map((queue) => {
          if (queue?._id === response?.data?.queue?._id) {
            return { ...queue, ...response?.data?.queue };
          }
          return queue;
        });
      set({ agents: updatedAgents, isLoading: false, error: null });

      set({ allQueueCalls: updatedQueue, isLoading: false, error: null });

      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
});
