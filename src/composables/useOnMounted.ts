export const useOnMounted = () => {
  function removeFromStorageOnLoad(item: string) {
    if (item) {
      window.addEventListener("load", () => {
        localStorage.removeItem(item);
      });
    }
  }

  return {
    removeFromStorageOnLoad,
  };
};
