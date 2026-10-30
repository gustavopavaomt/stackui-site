import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";

import "stackui-kit/styles.css";
import { App, ToastProvider } from "stackui-kit";

import { DemoApp, DemoLists, DemoNavigation } from "./app";
import { PREVIEWS } from "./previews";
import { DemoControls, DemoPickers, DemoSheets, DemoToasts } from "./scenarios";

/**
 * Everything that runs inside a frame, one per iframe so sheets, the tab bar and toasts stay inside it:
 * the example apps of the product page (`?d=<app>`) and the live examples of the docs (`?c=<component>`).
 */
const APPS: Record<string, () => React.ReactNode> = { app: DemoApp, lists: DemoLists, navigation: DemoNavigation, sheets: DemoSheets, controls: DemoControls, toasts: DemoToasts, pickers: DemoPickers };
const params = new URLSearchParams(location.search);
const nome = params.get("c") ?? params.get("d") ?? "";
const Exemplo = (params.has("c") ? PREVIEWS[nome] : APPS[nome]) ?? (() => null);

/** The docs page sends its appearance and accent ({ type: "stackui-theme", tint, theme }). */
function aplicarTema(tint?: string | null, tema?: string | null) {
  const raiz = document.documentElement;
  if (tint) raiz.style.setProperty("--st-tint", tint);
  if (tema === "light" || tema === "dark") raiz.dataset.theme = tema;
}
aplicarTema(params.get("tint"), params.get("theme"));
// Without a tab bar, toasts sit near the bottom edge.
if (nome !== "tab-bar" && nome !== "app") document.documentElement.style.setProperty("--st-toast-bottom", "calc(16px + env(safe-area-inset-bottom))");

function Demo() {
  useEffect(() => {
    const ouvir = (e: MessageEvent) => {
      // Only the page that embeds this example (same origin) may restyle it.
      if (e.origin !== location.origin || e.data?.type !== "stackui-theme") return;
      aplicarTema(e.data.tint, e.data.theme);
    };
    window.addEventListener("message", ouvir);
    return () => window.removeEventListener("message", ouvir);
  }, []);
  return (
    <App>
      <ToastProvider>
        <Exemplo />
      </ToastProvider>
    </App>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
);
