import { NavigatePathsProps } from "../types/interfaces";

export const navigationServices: NavigatePathsProps[] = [
  {
    id: 0,
    router: "/app/gen-descriptions",
    icon: "file-description",
    description: "Gerador de Descrições",
    content: `
        O gerador de descrições é uma ferramenta que permite a criação de
        descrições de produtos de forma rápida e eficiente.
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
        O gerador de descrições é uma ferramenta que permite a criação de
        descrições de produtos de forma rápida e eficiente.
    `,
  },
  {
    id: 3,
    router: "/app/content-rewriter",
    icon: "text-grammar",
    description: "Revisor de Conteúdo",
    content: `
        O gerador de descrições é uma ferramenta que permite a criação de
        descrições de produtos de forma rápida e eficiente.
    `,
  },
];
