import { defineStore } from "pinia";
import { User } from "../types/user";
import { Account } from "../types/account";
import openaiService from "../services/openai.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: {} as User,
  }),
  persist: true,
  actions: {
    async login(body: Account.Login) {
      const res = await openaiService.login(body);
      return res;
    },
    async getMe(): Promise<User> {
      const { data } = await openaiService.me();
      console.log(data, "get me");
      return data;
    },
    getCurrentUser(user: User) {
      this.$state.currentUser = user;
      console.log(this.$state.currentUser);
    },
  },
});
