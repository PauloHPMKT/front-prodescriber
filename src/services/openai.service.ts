import { AxiosRequestConfig } from "axios";
import { Openai } from "../types/openai";
import { api } from "./api";

export default {
  createDescription: (messages: Openai.ChatRequest) => {
    return api.post("/openai/chat", messages);
  },

  listDescriptions: (data?: AxiosRequestConfig) => {
    return api.get("/openai/history", data);
  },

  saveDescription: (data: any) => {
    return api.post("/openai/save-response", data);
  },
};
