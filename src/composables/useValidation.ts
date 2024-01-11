export const useValidation = () => {
  function minLength(val: string): boolean | string {
    if (val && val.length < 3) {
      return "Sua mensagem deve ter no mínimo 3 caracteres";
    }
    return true;
  }

  return {
    minLength,
  };
};
