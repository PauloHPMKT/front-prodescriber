import { api } from "./api";

export default {
  createDescription: (messages: object) => {
    console.log(messages);
    return api.post("/openai/chat", messages);
  },
};
