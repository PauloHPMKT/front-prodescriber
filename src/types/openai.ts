export namespace Openai {
  export interface Message {
    role: string;
    content: string;
  }

  export interface ChatRequest {
    messages: Message[];
  }

  export interface ChatResponse {
    item: string;
    prompt: string;
    result: string;
  }
}
