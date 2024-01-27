import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", {
  state: () => ({
    isVisible: false,
    isSuccess: false,
    isError: false,
    statusMessage: "",
  }),
  actions: {
    showToast() {
      this.$state.isVisible = true;
    },
    hideToast() {
      this.$state.isVisible = false;
    },
    execute(message: string, status: boolean) {
      this.$state.statusMessage = message;
      this.showToast();
      setTimeout(() => {
        this.hideToast();
      }, 2000);

      this.$state.isSuccess = status;
      this.$state.isError = !status;
    },
  },
});
