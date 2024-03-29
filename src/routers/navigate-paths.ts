import { NavigatePathsProps } from "../types/interfaces";

export const navigatePaths: NavigatePathsProps[] = [
  {
    id: 0,
    router: "/app/dashboard",
    icon: "chart-combo-stacked",
    description: "Dashboard",
    content: "Dashboard",
  },
  {
    id: 1,
    router: "/app/gen-descriptions",
    icon: "user-multiple",
    description: "Gerador de Descrições",
    content: "Usuários",
  },
  {
    id: 1,
    router: "/app/gen-list-descriptions",
    icon: "list",
    description: "Lista de descrições",
    content: "Descrições",
  },
];

/**
 *
 * Adicionar uma rota para criar um
 * tradutor e reescritor de texto
 * alem de um encurtador de links (url)
 * criar uma rota para armazenamento de prompts
 */

/**
 * 
 * 
 * 
 * const self: any = this.$refs.profileCard;
		document.addEventListener("click", (e: Event) => {
			if (self !== undefined && self.contains(e.target) === false) {
				this.setProfileCard = false;
			}
		});
 */
