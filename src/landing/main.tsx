import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import { DocsPage } from "../site/docs-page";

import "./landing.css";

/*
 * The StackUI site. Its own layout and CSS: the library only runs inside the phones (demo.html, one iframe per
 * phone), exactly as it would in an app. Full-screen black sections, one subject each, text at the bottom left.
 */

const GITHUB = "https://github.com/gustavopavaomt/stackui";
const AUTOR = "https://github.com/gustavopavaomt";
const INSTALAR = "npm install @stackui/react";
const BASE = import.meta.env.BASE_URL;
/** The width of an iPhone screen in CSS pixels: the demos are laid out at this width, then scaled. */
const LARGURA_APARELHO = 390;

type Tema = "light" | "dark";

const CORES = [
  { nome: "Blue", valor: "#0a84ff" },
  { nome: "Green", valor: "#30d158" },
  { nome: "Orange", valor: "#ff9f0a" },
  { nome: "Red", valor: "#ff453a" },
  { nome: "White", valor: "#8e8e93" },
];

/** One full-screen section per subject, like a mission page. */
const MISSOES = [
  { id: "navigation", demo: "navigation", rotulo: "Navigation", titulo: "Screens that slide", texto: "Push a screen in, slide it back out, right where you left off. Works with any router.", docs: "navigation" },
  { id: "sheets", demo: "sheets", rotulo: "Sheets and alerts", titulo: "Drag to dismiss", texto: "Sheets that follow your finger, confirmations that show their own progress, alerts when it matters.", docs: "presentation" },
  { id: "controls", demo: "controls", rotulo: "Controls", titulo: "Forms that feel native", texto: "Segmented pickers, fields with floating labels, steppers, switches and a button that says when it is done.", docs: "forms" },
  { id: "toasts", demo: "toasts", rotulo: "Feedback", titulo: "Sending… Sent.", texto: "Toasts that wait in line and change in place while the work happens.", docs: "feedback" },
  { id: "pickers", demo: "pickers", rotulo: "Pickers", titulo: "Any date. Any list.", texto: "Calendars, time wheels and searchable lists, the same on every phone, in any language.", docs: "list-picker" },
];

/** A phone running one demo. Colors arrive in the URL first, then by message (the demo keeps its state). */
function Phone({ demo, titulo, tint = CORES[0].valor, tema = "dark" }: { demo: string; titulo: string; tint?: string; tema?: Tema }) {
  const [src] = useState(() => `${BASE}demo.html?d=${demo}&tint=${encodeURIComponent(tint)}&theme=${tema}`);
  const quadro = useRef<HTMLIFrameElement>(null);
  const tela = useRef<HTMLDivElement>(null);
  const [caixa, setCaixa] = useState({ escala: 1, altura: 0 });

  useEffect(() => {
    quadro.current?.contentWindow?.postMessage({ type: "stackui-theme", tint, theme: tema }, location.origin);
  }, [tint, tema]);

  // Laid out at a real phone width and scaled down to the frame, like a true miniature.
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
    <div className={`phone${tema === "dark" ? " phone--dark" : ""}`}>
      <div className="phone__glass">
        {/* The status bar lives in the frame: inside the iframe there is no notch to make room for. */}
        <div className="phone__status" aria-hidden>
          <span>9:41</span>
          <span className="phone__island" />
          <svg viewBox="0 0 44 12" width={44} height={12}>
            <path d="M1 9h2v2H1zM5 7h2v4H5zM9 5h2v6H9zM13 3h2v8h-2z" fill="currentColor" />
            <rect x="22" y="1.5" width="18" height="9" rx="2.5" fill="none" stroke="currentColor" opacity=".45" />
            <rect x="24" y="3.5" width="12" height="5" rx="1" fill="currentColor" />
          </svg>
        </div>
        <div ref={tela} className="phone__viewport">
          <iframe
            ref={quadro}
            src={src}
            title={titulo}
            loading="lazy"
            className="phone__screen"
            style={{ width: LARGURA_APARELHO, height: caixa.altura / caixa.escala, transform: `scale(${caixa.escala})` }}
          />
        </div>
      </div>
    </div>
  );
}

function Copiar() {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(INSTALAR);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  };
  return (
    <button type="button" className="cmd" onClick={copiar} aria-label={`Copy: ${INSTALAR}`}>
      <code>{INSTALAR}</code>
      <span aria-live="polite">{copiado ? "Copied" : "Copy"}</span>
    </button>
  );
}

function Marca() {
  return (
    <svg viewBox="0 0 64 64" width={22} height={22} aria-hidden>
      <rect x="6" y="10" width="52" height="11" rx="5.5" fill="currentColor" />
      <rect x="6" y="26.5" width="52" height="11" rx="5.5" fill="currentColor" opacity=".75" />
      <rect x="6" y="43" width="32" height="11" rx="5.5" fill="currentColor" opacity=".5" />
    </svg>
  );
}

const CODIGO = `import "@stackui/react/styles.css";
import { App, List, NavigationBar, Row, Section, Toggle } from "@stackui/react";

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

function Landing() {
  const [cor, setCor] = useState(CORES[0]);
  const [tema, setTema] = useState<Tema>("dark");

  return (
    <>
      <header className="nav">
        <a href="#top" className="nav__brand">
          <Marca />
          STACKUI
        </a>
        <nav className="nav__links" aria-label="Site">
          <a href="#/docs/introduction">Docs</a>
          <a href="#/docs/text-and-stacks">Components</a>
          <a href="#numbers">Specs</a>
          <a href={GITHUB}>GitHub</a>
        </nav>
        <a href="#/docs/introduction" className="nav__cta">
          Get started
        </a>
      </header>

      <main id="top">
        <section className="stage stage--hero">
          <div className="stage__device">
            <Phone demo="app" titulo="Wallet, a finance app built with StackUI. It is live: tap it." />
          </div>
          <div className="stage__copy">
            <p className="stage__label">@stackui/react</p>
            <h1 className="stage__title">
              Native feel.
              <br />
              No app store.
            </h1>
            <p className="stage__text">Build dynamic and elegant PWA applications for iOS and Android with React.</p>
            <div className="stage__actions">
              <a href="#/docs/introduction" className="btn">
                Get started
              </a>
              <Copiar />
            </div>
            <p className="stage__credit">
              Created by <a href={AUTOR}>Gustavo Pavão</a>
            </p>
          </div>
          <a href="#navigation" className="stage__scroll" aria-label="Scroll down">
            <span />
          </a>
        </section>

        {MISSOES.map((m, i) => (
          <section key={m.id} id={m.id} className={`stage${i % 2 ? " stage--flip" : ""}`}>
            <div className="stage__device">
              <Phone demo={m.demo} titulo={`${m.rotulo}: a live screen of Wallet, built with StackUI`} />
            </div>
            <div className="stage__copy">
              <p className="stage__label">
                {String(i + 1).padStart(2, "0")} / {m.rotulo}
              </p>
              <h2 className="stage__title">{m.titulo}</h2>
              <p className="stage__text">{m.texto}</p>
              <div className="stage__actions">
                <a href={`#/docs/${m.docs}`} className="btn">
                  Learn more
                </a>
              </div>
            </div>
          </section>
        ))}

        <section className="stage stage--lists">
          <div className="stage__device">
            <Phone demo="lists" titulo="A list of 20,000 transactions" />
          </div>
          <div className="stage__copy">
            <p className="stage__label">06 / Performance</p>
            <h2 className="stage__title">20,000 rows</h2>
            <p className="stage__text">Only what is on screen exists. Every cell is recycled, the way native lists do it. Scroll as fast as you like.</p>
            <div className="stage__actions">
              <a href="#/docs/lazy-list" className="btn">
                Learn more
              </a>
            </div>
          </div>
        </section>

        <section id="numbers" className="numbers">
          <p className="stage__label">Specs</p>
          <dl className="numbers__row">
            <div>
              <dt>51</dt>
              <dd>Components</dd>
            </div>
            <div>
              <dt>1</dt>
              <dd>Dependency</dd>
            </div>
            <div>
              <dt>0</dt>
              <dd>Install scripts</dd>
            </div>
            <div>
              <dt>20K</dt>
              <dd>Rows, smooth</dd>
            </div>
          </dl>
          <dl className="specs">
            <div>
              <dt>Runtime</dt>
              <dd>React 19</dd>
            </div>
            <div>
              <dt>Platforms</dt>
              <dd>iOS, Android, desktop browsers</dd>
            </div>
            <div>
              <dt>Styling</dt>
              <dd>One stylesheet, CSS variables</dd>
            </div>
            <div>
              <dt>Routing</dt>
              <dd>Any router, or none</dd>
            </div>
            <div>
              <dt>Accessibility</dt>
              <dd>Real dialogs, focus, reduced motion</dd>
            </div>
            <div>
              <dt>License</dt>
              <dd>MIT</dd>
            </div>
          </dl>
        </section>

        <section id="theming" className="stage stage--flip">
          <div className="stage__device">
            <Phone demo="controls" titulo={`A transfer form in ${cor.nome}, ${tema} appearance`} tint={cor.valor} tema={tema} />
          </div>
          <div className="stage__copy">
            <p className="stage__label">07 / Theming</p>
            <h2 className="stage__title">Your color</h2>
            <p className="stage__text">One CSS variable sets the accent across every component. Light and dark are built in.</p>
            <div className="swatches" role="radiogroup" aria-label="Accent color">
              {CORES.map((c) => (
                <button key={c.valor} type="button" role="radio" aria-checked={cor.valor === c.valor} aria-label={c.nome} className="swatch" style={{ background: c.valor }} onClick={() => setCor(c)} />
              ))}
            </div>
            <div className="modes" role="radiogroup" aria-label="Appearance">
              {(["dark", "light"] as const).map((t) => (
                <button key={t} type="button" role="radio" aria-checked={tema === t} onClick={() => setTema(t)}>
                  {t}
                </button>
              ))}
            </div>
            <code className="stage__code">--st-tint: {cor.valor};</code>
          </div>
        </section>

        <section id="start" className="launch">
          <p className="stage__label">08 / Start building</p>
          <h2 className="stage__title">Ready for launch</h2>
          <pre className="launch__code">
            <code>{CODIGO}</code>
          </pre>
          <div className="stage__actions stage__actions--center">
            <a href="#/docs/introduction" className="btn">
              Read the docs
            </a>
            <a href={GITHUB} className="btn">
              View on GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <span>StackUI © 2026</span>
        <a href={AUTOR}>Created by Gustavo Pavão</a>
        <a href="#/docs/introduction">Docs</a>
        <a href={GITHUB}>GitHub</a>
        <a href={`${GITHUB}/blob/main/LICENSE`}>MIT License</a>
      </footer>
    </>
  );
}

/** Two pages: the site and the docs (#/docs/<page>). Hash routes work on GitHub Pages without a server. */
function Site() {
  const ler = () => (location.hash.startsWith("#/docs") ? location.hash.slice(7) || "introduction" : null);
  const [doc, setDoc] = useState(ler);
  useEffect(() => {
    const mudou = () => {
      const novo = ler();
      setDoc(novo);
      if (novo === null) document.title = "StackUI · PWA apps for iOS and Android with React";
    };
    window.addEventListener("hashchange", mudou);
    return () => window.removeEventListener("hashchange", mudou);
  }, []);
  return doc !== null ? <DocsPage slug={doc} /> : <Landing />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Site />
  </StrictMode>,
);
