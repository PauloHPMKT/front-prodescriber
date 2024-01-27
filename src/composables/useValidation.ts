export const useValidation = () => {
  function minLength(val: string): boolean | string {
    if (val && val.length < 3) {
      return "Sua mensagem deve ter no mínimo 3 caracteres";
    }
    return true;
  }

  function required(val: string): boolean | string {
    if (val === "") {
      return `Campo de decrição não pode ser vazio!`;
    }
    return true;
  }

  function formsValidation<T extends Record<string, any>>(
    data: T
  ): boolean | string {
    const requiredFields = Object.keys(data) as Array<keyof T>;
    const allFieldsVerify = requiredFields.every((field) => !data[field]);
    if (allFieldsVerify) {
      return `preencha todos os campos corretamente!`;
    }
    for (const field of requiredFields) {
      if (!data[field]) {
        const typeField = field === "password" ? "senha" : field;
        return `preencha o campo ${String(typeField)}!`;
      }
    }
    return true;
  }

  return {
    minLength,
    required,
    formsValidation,
  };
};
