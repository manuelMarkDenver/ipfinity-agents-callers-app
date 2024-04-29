import axios from "axios";
import { faker } from "@faker-js/faker";

export const createCallerAndQueueSlice = (set, get) => ({
  isCallersQueueLoading: false,
  isCallersQueueError: null,

  createCallerAndQueueCall: async () => {
    const fakeCaller = {
      name: faker.person.fullName(),
      phoneNumber: faker.phone.imei(),
    };

    try {
      const response = await axios.post("/api/v1/callers/", { ...fakeCaller });
      const updatedQueueCall = {
        ...response?.data?.queueCall,
        callerId: response?.data?.caller,
        
      };
      
      set({
        callers: [...get().callers, response.data.caller],
        allQueueCalls: [...get().allQueueCalls, updatedQueueCall],
        isLoading: false,
        error: null,
      });

      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
});
