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

export namespace Accounts {
  export interface Login {
    email: string;
    password: string;
  }
}

export interface IconParams {
  name: string;
  title?: string;
}

export interface StatusProps {
  status_message: string;
}

export interface BaseInputProps {
  label?: string;
  hidePasswordRevealler?: boolean;
  modelValue: string;
  placeholder?: string;
}

export interface ReveallerPasswordProps {
  is_password: boolean;
}
