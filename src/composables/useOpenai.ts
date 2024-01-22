import { Openai } from "../types/openai";

export const useOpenai = () => {
  function chatRequest(role: string, prompt: string): Openai.ChatRequest {
    const data: Openai.ChatRequest = {
      messages: [
        {
          role: role,
          content: prompt,
        },
      ],
    };
    return data;
  }
  return {
    chatRequest,
  };
};
