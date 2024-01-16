export const useValidation = () => {
  function minLength(val: string): boolean | string {
    if (val && val.length < 3) {
      return "Sua mensagem deve ter no mínimo 3 caracteres";
    }
    return true;
  }

  function isEmpty(val: string): boolean | string {
    if (val === "") {
      return "Campo de 'Produto' não pode ser vazio!";
    }
    return true;
  }

  return {
    minLength,
    isEmpty,
  };
};
