export const useHelpers = () => {
  function removeMultipleItems(keys: string[]) {
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
  }

  function truncate(text: string): string {
    return text.split(" ").slice(0, 2).toString().replace(",", " ");
  }

  function greetings(): string {
    const date = new Date();
    const hour = date.getHours();
    let greeting = "";

    if (hour >= 0 && hour < 12) greeting = "Bom dia";
    else if (hour >= 12 && hour < 18) greeting = "Boa tarde";
    else greeting = "Boa noite";

    return greeting;
  }

  return {
    removeMultipleItems,
    truncate,
    greetings,
  };
};
