import { StrictMode, useEffect, useRef, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

import "./landing.css";

/*
 * The StackUI landing. Its own layout and CSS: the library only runs inside the phones (demo.html, one iframe
 * per demo), exactly as it would in an app.
 */

const GITHUB = "https://github.com/gustavopavaomt/stackui";
const AUTOR = "https://github.com/gustavopavaomt";
const INSTALAR = "npm install @stackui/react";
const BASE = import.meta.env.BASE_URL;
/** The width of an iPhone screen in CSS pixels: the demos are laid out at this width, then scaled. */
const LARGURA_APARELHO = 390;

type Tema = "light" | "dark";
const CORES = [
  { nome: "Blue", valor: "#007aff" },
  { nome: "Green", valor: "#0e8a4a" },
  { nome: "Orange", valor: "#f26b1d" },
  { nome: "Indigo", valor: "#5856d6" },
  { nome: "Pink", valor: "#e5376f" },
];

const temaDoSistema = (): Tema => (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");

/** Sends the chosen accent and theme to every demo phone on the page. */
function enviarTema(tint: string, tema: Tema) {
  document.querySelectorAll<HTMLIFrameElement>("iframe[data-demo]").forEach((f) => f.contentWindow?.postMessage({ type: "stackui-theme", tint, theme: tema }, location.origin));
}

function Phone({ demo, titulo, grande = false, tint, tema }: { demo: string; titulo: string; grande?: boolean; tint: string; tema: Tema }) {
  // The first paint already has the colors; later changes go by message (no reload, the demo keeps its state).
  const [src] = useState(() => `${BASE}demo.html?d=${demo}&tint=${encodeURIComponent(tint)}&theme=${tema}`);
  // The app is laid out at a real phone width and scaled down to the frame, like a true miniature.
  const tela = useRef<HTMLDivElement>(null);
  const [caixa, setCaixa] = useState({ escala: 1, altura: 0 });
  useEffect(() => {
    const el = tela.current;
    if (!el) return;
    const medir = () => setCaixa({ escala: el.clientWidth / LARGURA_APARELHO, altura: el.clientHeight });
    medir();
    const o = new ResizeObserver(medir);
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return (
    <div className={`lp-phone${grande ? " lp-phone--large" : ""}${tema === "dark" ? " lp-phone--dark" : ""}`}>
      <div className="lp-phone__glass">
        {/* The status bar is drawn here: inside the iframe there is no notch to make room for. */}
        <div className="lp-phone__status" aria-hidden>
          <span>9:41</span>
          <span className="lp-phone__island" />
          <svg viewBox="0 0 44 12" width={44} height={12}>
            <path d="M1 9h2v2H1zM5 7h2v4H5zM9 5h2v6H9zM13 3h2v8h-2z" fill="currentColor" />
            <rect x="22" y="1.5" width="18" height="9" rx="2.5" fill="none" stroke="currentColor" opacity=".5" />
            <rect x="24" y="3.5" width="12" height="5" rx="1" fill="currentColor" />
            <path d="M41.5 4.5v3" stroke="currentColor" opacity=".5" />
          </svg>
        </div>
        <div ref={tela} className="lp-phone__viewport">
          <iframe
            data-demo
            src={src}
            title={titulo}
            loading={grande ? "eager" : "lazy"}
            className="lp-phone__screen"
            style={{ width: LARGURA_APARELHO, height: caixa.altura / caixa.escala, transform: `scale(${caixa.escala})` }}
          />
        </div>
      </div>
    </div>
  );
}

function CopiarInstalar() {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(INSTALAR);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1800);
    } catch {
      setCopiado(false);
    }
  };
  return (
    <button type="button" className="lp-install" onClick={copiar} aria-label={`Copy: ${INSTALAR}`}>
      <span className="lp-install__prompt" aria-hidden>
        $
      </span>
      <code>{INSTALAR}</code>
      <span className="lp-install__state" aria-live="polite">
        {copiado ? "Copied" : "Copy"}
      </span>
    </button>
  );
}

/** Reveals a block when it scrolls into view (once). */
function Surge({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return setVisto(true);
    const o = new IntersectionObserver(([e]) => e.isIntersecting && (setVisto(true), o.disconnect()), { rootMargin: "0px 0px -10% 0px" });
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${className} lp-reveal${visto ? " lp-reveal--in" : ""}`}>
      {children}
    </div>
  );
}

const DEMOS = [
  { demo: "navigation", titulo: "Navigation", texto: "Screens slide in and out like a native app. Going back returns to where you were, scroll included. Works with any router." },
  { demo: "sheets", titulo: "Sheets and alerts", texto: "Bottom sheets you drag to close, confirmations that show their own progress, option lists and alerts." },
  { demo: "controls", titulo: "Controls", texto: "Segmented pickers, switches, steppers, fields with floating labels and buttons that go idle → saving → saved." },
  { demo: "toasts", titulo: "Toasts", texto: "Short messages that queue, never overlap, and change in place: “Sending…” becomes “Sent”." },
  { demo: "pickers", titulo: "Pickers", texto: "Dates, times and long searchable lists, the same on iPhone and Android, in any language." },
  { demo: "lists", titulo: "Lists", texto: "20,000 orders with search and filters, and it still scrolls like butter: only what is on screen exists." },
];

const RECURSOS = [
  { titulo: "20,000 rows, smooth", texto: "LazyList draws only what is on screen and recycles its cells, like native lists do." },
  { titulo: "Installable", texto: "InstallGate shows how to install on each phone and browser, and opens the app only from its icon." },
  { titulo: "Barcode scanner", texto: "Reads product codes with the camera, offline, from its own entry: apps that never scan never download it." },
  { titulo: "Light and dark", texto: "Every color is a CSS variable. Follows the system, or force one. Change the accent with one line." },
  { titulo: "Accessible", texto: "Real buttons, links, dialogs and radio groups, focus that goes where it should, reduced motion respected." },
  { titulo: "One dependency", texto: "React. No CSS framework, no install scripts, published from CI with provenance." },
];

const CODIGO = `import "@stackui/react/styles.css";
import { App, List, NavigationBar, Row, Section, Toggle } from "@stackui/react";
import { useState } from "react";

export function Settings() {
  const [alerts, setAlerts] = useState(true);
  return (
    <App>
      <NavigationBar title="Settings" />
      <List>
        <Section header="General">
          <Row title="Notifications"
            accessory={<Toggle isOn={alerts} onChange={setAlerts} />} />
          <Row title="Language" value="English" href="/language" />
        </Section>
      </List>
    </App>
  );
}`;

/** A tiny highlighter for the sample (strings, keywords, tags, attributes). */
function Codigo({ texto }: { texto: string }) {
  const partes: ReactNode[] = [];
  const re = /("[^"]*")|\b(import|from|export|function|const|return|true)\b|(<\/?[A-Z][A-Za-z]*)|(\b[a-z][A-Za-z]*(?==))/g;
  let ultimo = 0;
  for (const m of texto.matchAll(re)) {
    partes.push(texto.slice(ultimo, m.index));
    const classe = m[1] ? "lp-code__string" : m[2] ? "lp-code__keyword" : m[3] ? "lp-code__tag" : "lp-code__attr";
    partes.push(
      <span key={m.index} className={classe}>
        {m[0]}
      </span>,
    );
    ultimo = m.index! + m[0].length;
  }
  partes.push(texto.slice(ultimo));
  return (
    <pre className="lp-code">
      <code>{partes}</code>
    </pre>
  );
}

function Landing() {
  const [tint, setTint] = useState(CORES[0].valor);
  const [tema, setTema] = useState<Tema>(temaDoSistema);
  useEffect(() => enviarTema(tint, tema), [tint, tema]);

  return (
    <>
      <header className="lp-header">
        <a href="#top" className="lp-brand" aria-label="StackUI, home">
          <img src={`${BASE}favicon.svg`} alt="" width={28} height={28} />
          StackUI
        </a>
        <nav className="lp-nav" aria-label="Sections">
          <a href="#components">Components</a>
          <a href="#theming">Theming</a>
          <a href="#start">Get started</a>
          <a href={GITHUB} className="lp-nav__github">
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="lp-hero">
          <div className="lp-hero__text">
            <p className="lp-eyebrow">React components for Progressive Web Apps</p>
            <h1 className="lp-hero__title">
              Build dynamic and elegant PWA applications for <span className="lp-gradient">iOS and Android</span> with React.
            </h1>
            <p className="lp-hero__lead">Screens that slide, sheets you drag, lists that never stutter. Ship an app that feels native on the phone, with no app store in the way.</p>
            <div className="lp-hero__actions">
              <CopiarInstalar />
              <a className="lp-button" href={GITHUB}>
                View on GitHub
              </a>
            </div>
            <p className="lp-byline">
              Created by{" "}
              <a href={AUTOR} className="lp-byline__name">
                Gustavo Pavão
              </a>
            </p>
          </div>
          <div className="lp-hero__phone">
            <Phone demo="app" titulo="A live StackUI app: orders, clients and settings" grande tint={tint} tema={tema} />
            <p className="lp-caption">A live app, not a video. Tap around.</p>
          </div>
        </section>

        <ul className="lp-stats" aria-label="In numbers">
          <li>
            <strong>45+</strong> components
          </li>
          <li>
            <strong>1</strong> dependency: React
          </li>
          <li>
            <strong>20k</strong> rows, smooth
          </li>
          <li>
            <strong>0</strong> install scripts
          </li>
        </ul>

        <section id="components" className="lp-section">
          <Surge className="lp-section__head">
            <h2>Everything a phone app needs</h2>
            <p>Each phone below runs the real components. Open sheets, flip switches, send toasts.</p>
          </Surge>
          <div className="lp-demos">
            {DEMOS.map((d) => (
              <Surge key={d.demo} className="lp-demo">
                <div className="lp-demo__text">
                  <h3>{d.titulo}</h3>
                  <p>{d.texto}</p>
                </div>
                <Phone demo={d.demo} titulo={`${d.titulo} demo`} tint={tint} tema={tema} />
              </Surge>
            ))}
          </div>
          <div className="lp-features">
            {RECURSOS.map((r) => (
              <Surge key={r.titulo} className="lp-feature">
                <h3>{r.titulo}</h3>
                <p>{r.texto}</p>
              </Surge>
            ))}
          </div>
        </section>

        <section id="theming" className="lp-section lp-theming">
          <Surge className="lp-theming__text">
            <h2>Your brand, one line</h2>
            <p>Every color is a CSS variable. Most apps change only the accent; light and dark follow the system.</p>
            <pre className="lp-code lp-code--small">
              <code>
                <span className="lp-code__keyword">:root</span> {"{ "}
                <span className="lp-code__attr">--st-tint</span>: <span className="lp-code__string">{tint}</span>
                {"; }"}
              </code>
            </pre>
            <fieldset className="lp-swatches">
              <legend>Accent</legend>
              {CORES.map((c) => (
                <button key={c.valor} type="button" aria-pressed={tint === c.valor} aria-label={c.nome} className="lp-swatch" style={{ background: c.valor }} onClick={() => setTint(c.valor)} />
              ))}
            </fieldset>
            <fieldset className="lp-segment">
              <legend>Appearance</legend>
              {(["light", "dark"] as const).map((t) => (
                <button key={t} type="button" aria-pressed={tema === t} onClick={() => setTema(t)}>
                  {t === "light" ? "Light" : "Dark"}
                </button>
              ))}
            </fieldset>
            <p className="lp-note">These change every phone on the page.</p>
          </Surge>
          <Phone demo="controls" titulo="Controls demo following the chosen colors" tint={tint} tema={tema} />
        </section>

        <section id="start" className="lp-section">
          <Surge className="lp-section__head">
            <h2>A screen in a few lines</h2>
            <p>Layout with stacks, a navigation bar and a list. No CSS to write, no build plugin, no setup.</p>
          </Surge>
          <Surge className="lp-start">
            <Codigo texto={CODIGO} />
            <ol className="lp-steps">
              <li>
                <strong>Install</strong>
                <code>{INSTALAR}</code>
              </li>
              <li>
                <strong>Import the styles once</strong>
                <code>import "@stackui/react/styles.css"</code>
              </li>
              <li>
                <strong>Build your screens</strong>
                <span>
                  The full reference is in the <a href={`${GITHUB}#readme`}>README</a>.
                </span>
              </li>
            </ol>
          </Surge>
        </section>
      </main>

      <footer className="lp-footer">
        <p>
          StackUI is open source under the MIT license. Created by{" "}
          <a href={AUTOR} className="lp-byline__name">
            Gustavo Pavão
          </a>
          .
        </p>
        <p>
          <a href={GITHUB}>GitHub</a> · <a href={`${GITHUB}/blob/main/SECURITY.md`}>Security</a>
        </p>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
);
