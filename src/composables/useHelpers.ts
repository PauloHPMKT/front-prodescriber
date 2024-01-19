export const useHelpers = () => {
  function removeMultipleItems(keys: string[]) {
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
  }

  return {
    removeMultipleItems,
  };
};
