export interface User {
  _id?: string | null;
  name: string | null;
  email: string | null;
  password: string | null | undefined;
  company: string | null;
  role: "admin" | "user" | null;
  role_gpt_generate: string;
}
