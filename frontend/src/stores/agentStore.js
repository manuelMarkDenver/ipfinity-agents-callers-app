import axios from "axios";
import { create } from "zustand";
import { faker } from "@faker-js/faker";

const useAgentsStore = create((set, get) => ({
  data: [],
  availableAgents: [],
  isLoading: false,
  error: null,

  fetchData: async () => {
    set({ isLoading: true });

    try {
      const response = await axios.get("/api/v1/agents");
      set({ data: response.data, isLoading: false, error: null });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchAvailableAgents: async () => {
    set({ isLoading: true });

    try {
      const response = await axios.get("/api/v1/agents/available");
      set({ availableAgents: response.data, isLoading: false, error: null });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  createRandomAgent: async () => {
    let response = null;

    const fakeAgent = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };

    try {
      response = await axios.post("/api/v1/agents/", fakeAgent);

      set({ data: [...get().data, response.data], error: null, isLoading: false });

      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

axios
  .get("/api/v1/agents")
  .then((response) => {
    useAgentsStore.setState({ data: response.data });
    useAgentsStore.setState({ isLoading: false, error: null });
  })
  .catch((err) => {
    useAgentsStore.setState({ error: err.message, isLoading: false });
  });

axios
  .get("/api/v1/agents/available")
  .then((response) => {
    useAgentsStore.setState({ availableAgents: response.data });
    useAgentsStore.setState({ isLoading: false, error: null });
  })
  .catch((err) => {
    useAgentsStore.setState({ error: err.message, isLoading: false });
  });

export default useAgentsStore;
