export namespace Openai {
  export interface Message {
    role: string;
    content: string;
  }

  export interface ChatRequest {
    messages: Message[];
  }

  export interface ChatResponse {
    _id?: string;
    item: string;
    prompt: string;
    result: string;
  }
}
