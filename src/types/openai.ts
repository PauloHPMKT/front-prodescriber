export namespace Openai {
  export interface Message {
    content: string;
    role: string;
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
