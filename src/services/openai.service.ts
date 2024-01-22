import { api } from "./api";

export default {
  createDescription: (messages: object) => {
    return api.post("/openai/chat", messages);
  },

  listDescriptions: () => {
    return api.get("/openai/chat");
  },
};
