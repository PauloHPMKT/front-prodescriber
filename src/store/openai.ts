import { defineStore } from "pinia";
import { Openai } from "../types/openai";
import { AxiosResponse } from "axios";
import openaiService from "../services/openai.service";

export const useOpenAIStore = defineStore("openai", {
  state: () => ({
    descriptionContent: {
      item: "",
      prompt: "",
      result: "",
    } as Openai.ChatResponse,
  }),
  actions: {
    async createOpenaiDescription(
      request: Openai.ChatRequest | object
    ): Promise<AxiosResponse<any, any>> {
      const description = await openaiService.createDescription(request);
      return description;
    },
    async saveDescription(content: any): Promise<AxiosResponse<any, any>> {
      console.log(content);
      const savedContent = await openaiService.saveDescription(content);
      return savedContent;
    },
    storeDescriptionContent(content: Openai.ChatResponse) {
      this.$state.descriptionContent = content;
    },
    cleanStore() {
      this.$state.descriptionContent = {} as Openai.ChatResponse;
    },
  },
});
