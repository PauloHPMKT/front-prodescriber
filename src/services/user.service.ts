import { api } from "./api";
import { Account } from "../types/account";

export default {
  login: (data: Account.Login) => {
    return api.post("/auth/login", data);
  },

  me: () => {
    return api.get("/app/me");
  },
};
