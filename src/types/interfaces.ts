export namespace Breadcrumb {
  export interface Buttons {
    label: string;
    action: string;
  }

  export enum Actions {
    LIKE = "like",
    DISLIKE = "dislike",
    GENERATE = "generate",
  }
}

export interface IconParams {
  name: string;
  title?: string;
}

export interface StatusProps {
  status_message: string;
}
