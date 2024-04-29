import axios from "axios";
import { faker } from "@faker-js/faker";

export const createAgentSlice = (set, get) => ({
  agents: [],
  availableAgents: [],
  isAgentsLoading: false,
  agentsError: null,

  fetchAgentsData: async () => {
    set({ isLoading: true });

    try {
      const response = await axios.get("/api/v1/agents");
      set({ agents: response.data, isLoading: false, error: null });
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

      set({
        agents: [...get().agents, response.data.agent],
        isAgentsLoading: false,
        agentsError: null,
      });

      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  deleteAgent: async (agentId) => {
    try {
      const response = await axios.delete(`/api/v1/agents/${agentId}`);

      set({
        agents: get().agents.filter((agent) => agent._id !== agentId),
        error: null,
        isLoading: false,
      });

      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
});
