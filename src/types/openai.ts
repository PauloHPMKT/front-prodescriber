export namespace Openai {
  export interface Message {
    role: string;
    content: string;
  }

  export interface ChatRequest {
    messages: Message[];
  }
}
