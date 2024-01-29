import { NavigatePathsProps } from "../types/interfaces";

export const navigatePaths: NavigatePathsProps[] = [
  {
    id: 0,
    router: "/app/dashboard",
    icon: "chart-combo-stacked",
    description: "Dashboard",
  },
  {
    id: 1,
    router: "/app/users",
    icon: "user-multiple",
    description: "Usuários",
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
