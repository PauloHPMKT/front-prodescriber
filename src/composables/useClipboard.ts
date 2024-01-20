export const useClipboard = () => {
  function copyToClipboard(result: string): string | null {
    const textToCopy = result;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        return "Descrição copiada com sucesso!";
      })
      .catch((error) => {
        console.error(error);
        if (error) {
          return "Erro ao copiar descrição!";
        }
      });
    return null;
  }

  return {
    copyToClipboard,
  };
};
