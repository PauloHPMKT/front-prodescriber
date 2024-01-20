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

export interface DescriptionProps {
  description: string;
}

export interface BaseInputProps {
  label?: string;
  hidePasswordRevealler?: boolean;
  icon?: boolean;
  modelValue: string;
  placeholder?: string;
}

export interface ReveallerPasswordProps {
  is_password: boolean;
}

export interface NavigatePathsProps {
  id: number;
  router: string;
  icon: string;
  description: string;
}
