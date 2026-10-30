/* The docs: the sidebar, in order, and each page's Markdown (src/site/content/<en|pt>/<slug>.md). */
import type { Lang } from "./i18n";

const EN = import.meta.glob("./content/en/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const PT = import.meta.glob("./content/pt/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export type Pagina = { slug: string; titulo: string; md: string };
export type Grupo = { titulo: string; paginas: Pagina[] };

/** [slug, English title, Portuguese title] */
type Item = [string, string, string];

const GRUPOS: [[string, string], Item[]][] = [
  [
    ["The Basics", "O básico"],
    [
      ["introduction", "Introduction", "Introdução"],
      ["installation", "Installation", "Instalação"],
      ["layout", "Layout", "Layout"],
      ["navigation", "Navigation", "Navegação"],
      ["lists", "Lists", "Listas"],
      ["forms", "Forms and input", "Formulários"],
      ["presentation", "Sheets and alerts", "Folhas e alertas"],
      ["feedback", "Feedback", "Retorno"],
      ["theming", "Theming", "Temas"],
      ["pwa", "Installable apps", "Apps instaláveis"],
      ["accessibility", "Accessibility", "Acessibilidade"],
    ],
  ],
  [["Layout", "Layout"], [["text-and-stacks", "Text and stacks", "Texto e pilhas"]]],
  [
    ["Navigation", "Navegação"],
    [
      ["navigation-stack", "NavigationStack", "NavigationStack"],
      ["navigation-bar", "NavigationBar", "NavigationBar"],
      ["tab-bar", "TabBar", "TabBar"],
      ["menu", "Menu", "Menu"],
    ],
  ],
  [
    ["Lists", "Listas"],
    [
      ["list", "List and Row", "List e Row"],
      ["lazy-list", "LazyList", "LazyList"],
      ["card", "Card", "Card"],
    ],
  ],
  [
    ["Controls", "Controles"],
    [
      ["button", "Button", "Button"],
      ["toggle", "Toggle", "Toggle"],
      ["picker", "Picker", "Picker"],
      ["stepper", "Stepper", "Stepper"],
      ["text-field", "TextField", "TextField"],
      ["search-field", "SearchField", "SearchField"],
      ["badge", "Badge", "Badge"],
    ],
  ],
  [
    ["Choosing", "Seletores"],
    [
      ["date-picker", "DatePicker", "DatePicker"],
      ["time-picker", "TimePicker", "TimePicker"],
      ["list-picker", "ListPicker", "ListPicker"],
      ["options-sheet", "OptionsSheet", "OptionsSheet"],
    ],
  ],
  [
    ["Presentation", "Apresentação"],
    [
      ["sheet", "Sheet", "Sheet"],
      ["confirmation-sheet", "ConfirmationSheet", "ConfirmationSheet"],
      ["alert", "Alert", "Alert"],
    ],
  ],
  [
    ["Feedback", "Retorno"],
    [
      ["toast", "Toast", "Toast"],
      ["redacted", "Skeleton and Redacted", "Skeleton e Redacted"],
      ["progress-view", "ProgressView", "ProgressView"],
      ["content-unavailable-view", "ContentUnavailableView", "ContentUnavailableView"],
      ["timeline", "Timeline", "Timeline"],
      ["progress-steps", "ProgressSteps", "ProgressSteps"],
    ],
  ],
  [
    ["Media", "Mídia"],
    [
      ["avatar", "Avatar", "Avatar"],
      ["async-image", "AsyncImage", "AsyncImage"],
    ],
  ],
  [
    ["PWA", "PWA"],
    [
      ["install-gate", "InstallGate", "InstallGate"],
      ["barcode-scanner", "BarcodeScanner", "BarcodeScanner"],
    ],
  ],
];

/** The docs in one language (a page missing in Portuguese falls back to English). */
export function docs(lang: Lang): Grupo[] {
  const pt = lang === "pt";
  return GRUPOS.map(([[en, ptTitulo], itens]) => ({
    titulo: pt ? ptTitulo : en,
    paginas: itens.map(([slug, tEn, tPt]) => ({
      slug,
      titulo: pt ? tPt : tEn,
      md: (pt ? PT[`./content/pt/${slug}.md`] : undefined) ?? EN[`./content/en/${slug}.md`] ?? `# ${tEn}`,
    })),
  }));
}
