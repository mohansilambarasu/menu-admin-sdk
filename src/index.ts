import { createElement } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import appStyles from "./ui/styles/App.css?inline";
import formStyles from "./ui/styles/Form.css?inline";
import globalStyles from "./ui/styles/global.css?inline";
import listStyles from "./ui/styles/List.css?inline";
import variablesStyles from "./ui/styles/variables.css?inline";

export interface MenuAdminConfig {
  theme?: "light" | "dark";
}

export interface MenuAdminInstance {
  unmount: () => void;
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap');`;

export function createMenuAdmin(
  container: HTMLElement,
  config: MenuAdminConfig = {},
): MenuAdminInstance {
  if (!container) {
    throw new Error(
      "MenuAdmin: container must be a valid DOM element. " +
        "Usage: createMenuAdmin(document.getElementById('my-el'), config)",
    );
  }

  const { theme = "light" } = config;

  const shadowRoot = container.attachShadow({ mode: "open" });

  const styleTag = document.createElement("style");

  // FONT_IMPORT must be first with no whitespace before it
  // @import breaks if anything precedes it including whitespace
  styleTag.textContent =
    FONT_IMPORT +
    `
${variablesStyles}
${globalStyles}
${appStyles}
${formStyles}
${listStyles}
`;

  const mountpoint = document.createElement("div");
  mountpoint.className = "menu-admin-root";
  shadowRoot.appendChild(styleTag);
  shadowRoot.appendChild(mountpoint);

  const root = createRoot(mountpoint);
  root.render(createElement(App, { theme }));

  return {
    unmount: () => {
      root.unmount();
      container.innerHTML = "";
    },
  };
}
