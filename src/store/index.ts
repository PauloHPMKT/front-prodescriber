import { defineStore } from "pinia";
import { User } from "../types/user";
import { Account } from "../types/account";
import userService from "../services/user.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: {} as User,
  }),
  persist: true,
  actions: {
    async login(body: Account.Login) {
      const res = await userService.login(body);
      return res;
    },
    async getMe(): Promise<User> {
      const { data } = await userService.me();
      return data;
    },
    getCurrentUser(user: User) {
      this.$state.currentUser = user;
    },
    logout() {
      this.$state.currentUser = {} as User;
    },
  },
});
