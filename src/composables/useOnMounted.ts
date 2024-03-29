import { useRouter } from "vue-router";

export const useOnMounted = (router?: ReturnType<typeof useRouter>) => {
  function removeStoreOnLoad(cleanStore: any) {
    return cleanStore;
  }

  function dateTimeFormated(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const today = new Date();
    const date = Intl.DateTimeFormat("pt-BR", options).format(today);
    return date;
  }

  function checkBrowserConnection() {
    if ("onoffline" in window) {
      window.addEventListener("offline", () => {
        console.log("Disconnected...so sad!!!");
        router && router.push({ name: "connectionrefused" });
      });
    }

    window.addEventListener("online", () => {
      router && router.go(-1);
    });
  }

  return {
    removeStoreOnLoad,
    dateTimeFormated,
    checkBrowserConnection,
  };
};
