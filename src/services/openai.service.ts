import { api } from "./api";

export default {
  createDescription: (messages: object) => {
    return api.post("/openai/chat", messages);
  },

  login: (data: object) => {
    return api.post("/auth/login", data);
  },

  me: () => {
    return api.get("/app/me");
  },
};
