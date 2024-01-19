export const useOnMounted = () => {
  function removeFromStorageOnLoad(item: string) {
    if (item) {
      window.addEventListener("load", () => {
        localStorage.removeItem(item);
      });
    }
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

  return {
    removeFromStorageOnLoad,
    dateTimeFormated,
  };
};
