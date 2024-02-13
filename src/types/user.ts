export interface User {
  _id?: string | null;
  username: string | null;
  email: string | null;
  password: string | null | undefined;
  avatar: string | null;
  role: "admin" | "user";
  role_system: "user" | "system";
}
