import axios from "axios";
import { faker } from "@faker-js/faker";

export const createCallersSlice = (set, get) => ({
  callers: [],
  isCallersLoading: false,
  callersError: null,

  fetchCallersData: async () => {
    set({ isLoading: true });

    try {
      const response = await axios.get("/api/v1/callers");
      set({ callers: response.data, isLoading: false, error: null });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  createRandomCaller: async () => {
    const fakeCaller = {
      name: faker.person.fullName(),
      phoneNumber: faker.phone.imei(),
    };

    try {
      const response = await axios.post("/api/v1/callers/", { ...fakeCaller });

      set({
        callers: [...get().callers, response.data],
        isLoading: false,
        error: null,
      });

      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  deleteCaller: async (callerId, queueId) => {
    try {
      const [call, queue] = await Promise.all([
        axios.delete(`/api/v1/callers/${callerId}`),
        axios.delete(`/api/v1/queue/${queueId}`),
      ]);
      if (call.status === 200 && queue.status === 200) {
        const response = await axios.get("/api/v1/callers");
        set({ callers: response.data, isLoading: false, error: null });
      }

      const updatedCallers = get().callers.filter(
        (caller) => caller._id !== callerId
      );
      set({ callers: updatedCallers, isLoading: false, error: null });

      const updatedQueueCalls = get().allQueueCalls.filter(
        (queueCall) => queueCall._id !== queueId
      );
      set({ allQueueCalls: updatedQueueCalls, isLoading: false, error: null });

      return { message: "Caller successfully deleted", data: { call, queue } };
    } catch (err) {
      set({ callersError: err.message, isCallersLoading: false });
    }
  },
});
