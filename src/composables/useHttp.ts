import { AxiosRequestConfig } from "axios";

type FilteredObject = { [key: string]: string };

export const useHttp = () => {
  function filterResponse(obj?: any): AxiosRequestConfig {
    /**
     * a função está parametrizada para acessar o objeto
     * em níveis mais profundos caso exista
     *
     */
    const config = {
      transformResponse: [
        function (data: any): FilteredObject[] {
          return JSON.parse(data).map((object: any) => {
            const filteredObject: FilteredObject = {};
            Object.keys(obj).forEach((key) => {
              const propertyPath = obj[key].split(".");
              let value = object;

              for (const prop of propertyPath) {
                value && value.hasOwnProperty(prop)
                  ? (value = value[prop])
                  : (value = undefined);
              }
              filteredObject[key] = value;
            });
            return filteredObject;
          });
        },
      ],
    };
    return config;
  }

  return {
    filterResponse,
  };
};
