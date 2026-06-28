export interface MenuAdminConfig {
  theme?: "light" | "dark";
}

export interface MenuAdminInstance {
  unmount: () => void;
}

export function createMenuAdmin(
  container: HTMLElement,
  config?: MenuAdminConfig,
): MenuAdminInstance;
