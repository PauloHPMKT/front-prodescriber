export namespace Breadcrumb {
  export interface Buttons {
    label: string;
    action: string;
    icon: string;
  }

  export enum Actions {
    LIKE = "like",
    DISLIKE = "dislike",
    GENERATE = "generate",
  }

  export interface Icons {
    icon: string;
    action: string;
  }

  export enum IconsActions {
    LIKE = "like",
    DISLIKE = "dislike",
    COPY = "copy",
  }
}

export interface IconParams {
  name: string;
  title?: string;
}

export interface LoaderProps {
  loader_description: string;
}

export interface StatusProps {
  status_message: string;
}

export interface DescriptionProps {
  item: string;
  result: string;
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
  content: string;
}

export interface useServiceOptions {
  id: number;
  icon: string;
  description: string;
}
