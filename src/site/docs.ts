/* The docs: the sidebar, in order, and each page's Markdown (src/site/content/<slug>.md). */

const arquivos = import.meta.glob("./content/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export type Pagina = { slug: string; titulo: string; md: string };
export type Grupo = { titulo: string; paginas: Pagina[] };

const GRUPOS: [string, [string, string][]][] = [
  [
    "The Basics",
    [
      ["introduction", "Introduction"],
      ["installation", "Installation"],
      ["layout", "Layout"],
      ["navigation", "Navigation"],
      ["lists", "Lists"],
      ["forms", "Forms and input"],
      ["presentation", "Sheets and alerts"],
      ["feedback", "Feedback"],
      ["theming", "Theming"],
      ["pwa", "Installable apps"],
      ["accessibility", "Accessibility"],
    ],
  ],
  ["Layout", [["text-and-stacks", "Text and stacks"]]],
  [
    "Navigation",
    [
      ["navigation-stack", "NavigationStack"],
      ["navigation-bar", "NavigationBar"],
      ["tab-bar", "TabBar"],
      ["menu", "Menu"],
    ],
  ],
  [
    "Lists",
    [
      ["list", "List and Row"],
      ["lazy-list", "LazyList"],
      ["card", "Card"],
    ],
  ],
  [
    "Controls",
    [
      ["button", "Button"],
      ["toggle", "Toggle"],
      ["picker", "Picker"],
      ["stepper", "Stepper"],
      ["text-field", "TextField"],
      ["search-field", "SearchField"],
      ["badge", "Badge"],
    ],
  ],
  [
    "Choosing",
    [
      ["date-picker", "DatePicker"],
      ["time-picker", "TimePicker"],
      ["list-picker", "ListPicker"],
      ["options-sheet", "OptionsSheet"],
    ],
  ],
  [
    "Presentation",
    [
      ["sheet", "Sheet"],
      ["confirmation-sheet", "ConfirmationSheet"],
      ["alert", "Alert"],
    ],
  ],
  [
    "Feedback",
    [
      ["toast", "Toast"],
      ["redacted", "Skeleton and Redacted"],
      ["progress-view", "ProgressView"],
      ["content-unavailable-view", "ContentUnavailableView"],
      ["timeline", "Timeline"],
      ["progress-steps", "ProgressSteps"],
    ],
  ],
  [
    "Media",
    [
      ["avatar", "Avatar"],
      ["async-image", "AsyncImage"],
    ],
  ],
  [
    "PWA",
    [
      ["install-gate", "InstallGate"],
      ["barcode-scanner", "BarcodeScanner"],
    ],
  ],
];

export const DOCS: Grupo[] = GRUPOS.map(([titulo, paginas]) => ({
  titulo,
  paginas: paginas.map(([slug, t]) => ({ slug, titulo: t, md: arquivos[`./content/${slug}.md`] ?? `# ${t}\n\nComing soon.` })),
}));

export const TODAS = DOCS.flatMap((g) => g.paginas);
