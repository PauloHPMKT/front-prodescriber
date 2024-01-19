import { api } from "./api";

export default {
  createDescription: (messages: object) => {
    return api.post("/openai/chat", messages);
  },

  login: (data: object) => {
    console.log(data, "eu venho do api service");
    return api.post("/auth/login", data);
  },
};
