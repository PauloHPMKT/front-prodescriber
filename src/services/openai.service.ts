import { AxiosRequestConfig } from "axios";
import { api } from "./api";

export default {
  createDescription: (messages: object) => {
    return api.post("/openai/chat", messages);
  },

  listDescriptions: (data?: AxiosRequestConfig) => {
    return api.get("/openai/history", data);
  },

  saveDescription: (data: any) => {
    console.log(data);
    return api.post("/openai/save-response", data);
  },
};
