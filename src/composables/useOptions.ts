import { useRoute } from "vue-router";
import { NavigatePathsProps } from "../types/interfaces";

export const navigationServices: NavigatePathsProps[] = [
  {
    id: 0,
    router: "/app/gen-descriptions",
    icon: "file-description",
    description: "Gerador de Descrições",
    content: `
        O gerador de descrições permite a criação de
        descrições com rapidez e eficiecia.
    `,
  },
  {
    id: 1,
    router: "/app/prompts",
    icon: "pencil-minus",
    description: "GPT gerador de prompts",
    content: `
        Crie prompts utilizando o poder do GPT-3 para personalizar a
        geração de descrições de seus produtos.
    `,
  },
  {
    id: 2,
    router: "/app/translater",
    icon: "language",
    description: "Tradutor",
    content: `
        O Workflow de tradução da IA permite a transcrição
        e tradução de textos de forma totalmente confiável.
    `,
  },
  {
    id: 3,
    router: "/app/content-rewriter",
    icon: "text-grammar",
    description: "Revisor de Conteúdo",
    content: `
        O revisor de conteúdo garante maior precisão e consistência
        para criar documentos de alta qualidade.
    `,
  },
];

export const useRouterOptions = () => {
  const router = useRoute();

  function matchedRouter(route: string): boolean {
    return router.matched.some((record) => record.path === route);
  };

  return {
    matchedRouter,
  }
}
