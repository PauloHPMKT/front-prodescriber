export namespace Account {
  export interface Login {
    email: string;
    password: string;
  }

  export interface Create {
    name: string;
    nickname?: string;
    email: string;
    password: string;
  }
}
