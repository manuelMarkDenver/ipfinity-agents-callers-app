import axios from "axios";
import { create } from "zustand";
import { faker } from "@faker-js/faker";

const useCallersStore = create((set, get) => ({
  data: [],
  isLoading: false,
  error: null,

  fetchData: async () => {
    set({ isLoading: true });

    try {
      const response = await axios.get("/api/v1/callers");
      set({ data: response.data, isLoading: false, error: null });
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
        data: [...get().data, response.data],
        isLoading: false,
        error: null,
      });

      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

axios.get("/api/v1/callers").then((response) => {
  useCallersStore.setState({ data: response.data });
  useCallersStore.setState({ isLoading: false, error: null });
});

export default useCallersStore;
