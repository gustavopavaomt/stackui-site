import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import "@stackui/react/styles.css";
import { App, ToastProvider } from "@stackui/react";

import { DemoApp, DemoLists, DemoNavigation } from "./app";
import { DemoControls, DemoPickers, DemoSheets, DemoToasts } from "./scenarios";

/**
 * The demo shown inside the landing's phones. One page, many scenarios (`?d=`), each in its own iframe so that
 * sheets, the tab bar and toasts stay inside their phone.
 */
const CENAS = { app: DemoApp, lists: DemoLists, navigation: DemoNavigation, sheets: DemoSheets, controls: DemoControls, toasts: DemoToasts, pickers: DemoPickers };
type Cena = keyof typeof CENAS;

const params = new URLSearchParams(location.search);
const cena: Cena = (params.get("d") as Cena) in CENAS ? (params.get("d") as Cena) : "app";

/** The landing sends the accent color and the theme it shows ({ type: "stackui-theme", tint, theme }). */
function aplicarTema(tint?: string | null, tema?: string | null) {
  const raiz = document.documentElement;
  if (tint) raiz.style.setProperty("--st-tint", tint);
  if (tema === "light" || tema === "dark") raiz.dataset.theme = tema;
}
aplicarTema(params.get("tint"), params.get("theme"));
// Without a tab bar, toasts sit near the bottom edge.
if (cena !== "app") document.documentElement.style.setProperty("--st-toast-bottom", "calc(24px + env(safe-area-inset-bottom))");

function Demo() {
  const [Tela] = useState(() => CENAS[cena]);
  useEffect(() => {
    const ouvir = (e: MessageEvent) => {
      // Only the page that embeds this demo (same origin) may restyle it.
      if (e.origin !== location.origin || e.data?.type !== "stackui-theme") return;
      aplicarTema(e.data.tint, e.data.theme);
    };
    window.addEventListener("message", ouvir);
    return () => window.removeEventListener("message", ouvir);
  }, []);
  return (
    <App>
      <ToastProvider>
        <Tela />
      </ToastProvider>
    </App>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
);
