import type { Categoria } from "./data";

/* Small inline icons for the demos (the library takes any icon element). */
const icone = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

export const MAIS = icone("M12 5v14M5 12h14");
export const FILTRO = icone("M4 6h16M7 12h10M10 18h4");
export const RETICENCIAS = icone("M5 12h.01M12 12h.01M19 12h.01");
export const LAPIS = icone("M4 20h4L19 9l-4-4L4 16zM14 6l4 4");
export const LIXO = icone("M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3");
export const CASA = icone("M3 11l9-7 9 7M5 10v10h14V10");
export const LISTA = icone("M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01");
export const ENGRENAGEM = icone("M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z");
export const SINO = icone("M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0");
export const ROSTO = icone("M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M9 10v1M15 10v1M12 10v3h-1M9.5 16a4 4 0 0 0 5 0");
export const CARTAO = icone("M3 6h18v12H3zM3 10h18M7 15h3");
export const MOEDA = icone("M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.7 3 2 3 .8 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6.5V8M12 16v1.5");
export const ESCUDO = icone("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z");
export const COMPARTILHAR = icone("M12 3v12M8 7l4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7");
export const COPIAR = icone("M8 8h12v12H8zM4 16V4h12");
export const DOCUMENTO = icone("M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6");

export const ICONES_CATEGORIA: Record<Categoria, React.ReactNode> = {
  groceries: icone("M3 4h2l2.4 11h10.2L20 7H6.2M10 20h.01M17 20h.01"),
  dining: icone("M7 3v8M5 3v4a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 0-3 2-3 5s1 4 3 4v9"),
  transport: icone("M6 17h12M5 17V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v10M5 12h14M8 20v-3M16 20v-3"),
  shopping: icone("M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2"),
  bills: icone("M13 2L4 14h7l-1 8 9-12h-7z"),
  health: icone("M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"),
  travel: icone("M3 13l18-7-7 18-2-8z"),
  fun: icone("M4 5h16v14H4zM4 9h16M9 5l-2 4M15 5l-2 4"),
  salary: icone("M4 7h16v12H4zM9 7V5h6v2M4 12h16"),
  transfer: icone("M7 7h12l-3-3M17 17H5l3 3"),
};
