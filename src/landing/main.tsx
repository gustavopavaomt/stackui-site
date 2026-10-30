import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import { DocsPage } from "../site/docs-page";

import "./landing.css";

/*
 * The StackUI product page. Its own layout and CSS: the library only runs inside the phones (demo.html, one
 * iframe per phone), exactly as it would in an app.
 */

const GITHUB = "https://github.com/gustavopavaomt/stackui";
const AUTOR = "https://github.com/gustavopavaomt";
const INSTALAR = "npm install @stackui/react";
const BASE = import.meta.env.BASE_URL;
/** The width of an iPhone screen in CSS pixels: the demos are laid out at this width, then scaled. */
const LARGURA_APARELHO = 390;

type Tema = "light" | "dark";

const CORES = [
  { nome: "Violet", valor: "#5a48f5" },
  { nome: "Blue", valor: "#007aff" },
  { nome: "Forest", valor: "#0e8a4a" },
  { nome: "Sunset", valor: "#f26b1d" },
  { nome: "Rose", valor: "#e5376f" },
  { nome: "Graphite", valor: "#3a3a3c" },
];

const VISTAS = [
  { demo: "navigation", nome: "Navigation", texto: "Settings that push to an account and slide back, right where you left off." },
  { demo: "sheets", nome: "Sheets", texto: "Card details in a sheet you drag to close, a confirmation before ordering, an alert before blocking." },
  { demo: "controls", nome: "Controls", texto: "A transfer form: a segmented picker, an amount field, a stepper and a button that shows its progress." },
  { demo: "toasts", nome: "Toasts", texto: "Split a bill. The requests go out with a toast that turns from “Sending…” into “Sent”." },
  { demo: "pickers", nome: "Pickers", texto: "Pay a bill: the payee from a searchable list, then the date and the time." },
];

/** A phone running one demo. Colors arrive in the URL first, then by message (the demo keeps its state). */
function Phone({ demo, titulo, tint = CORES[0].valor, tema = "light", tamanho = "regular", carregar = true }: { demo: string; titulo: string; tint?: string; tema?: Tema; tamanho?: "regular" | "large"; carregar?: boolean }) {
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
    <div className={`phone phone--${tamanho}${tema === "dark" ? " phone--dark" : ""}`}>
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
          {carregar && (
            <iframe
              ref={quadro}
              src={src}
              title={titulo}
              loading="lazy"
              className="phone__screen"
              style={{ width: LARGURA_APARELHO, height: caixa.altura / caixa.escala, transform: `scale(${caixa.escala})` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/** "Take a closer look": one phone, a segmented control below. Each view loads once and keeps its state. */
function Visor() {
  const [atual, setAtual] = useState(0);
  const [abertas, setAbertas] = useState<Set<number>>(() => new Set([0]));
  const escolher = (i: number) => {
    setAtual(i);
    setAbertas((s) => new Set(s).add(i));
  };
  return (
    <div className="viewer">
      <div className="viewer__stage">
        {VISTAS.map((v, i) => (
          <div key={v.demo} className={`viewer__slide${i === atual ? " viewer__slide--on" : ""}`} aria-hidden={i !== atual} inert={i !== atual || undefined}>
            <Phone demo={v.demo} titulo={`${v.nome} demo`} tamanho="large" carregar={abertas.has(i)} />
          </div>
        ))}
      </div>
      <p className="viewer__caption" aria-live="polite">
        {VISTAS[atual].texto}
      </p>
      <div className="viewer__tabs" role="tablist" aria-label="Components">
        {VISTAS.map((v, i) => (
          <button key={v.demo} type="button" role="tab" aria-selected={i === atual} className="viewer__tab" onClick={() => escolher(i)}>
            {v.nome}
          </button>
        ))}
      </div>
    </div>
  );
}

function Instalar() {
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
    <button type="button" className="install" onClick={copiar} aria-label={`Copy: ${INSTALAR}`}>
      <span className="install__prompt" aria-hidden>
        $
      </span>
      <code>{INSTALAR}</code>
      <span className="install__state" aria-live="polite">
        {copiado ? "Copied" : "Copy"}
      </span>
    </button>
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

/** The StackUI mark: three stacked bars, the last one shorter. */
function Marca({ tamanho = 26 }: { tamanho?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={tamanho} height={tamanho} aria-hidden className="mark">
      <rect width="64" height="64" rx="15" fill="var(--brand)" />
      <rect x="14" y="14" width="36" height="9" rx="4.5" fill="#fff" />
      <rect x="14" y="27.5" width="36" height="9" rx="4.5" fill="#fff" opacity=".8" />
      <rect x="14" y="41" width="22" height="9" rx="4.5" fill="#fff" opacity=".6" />
    </svg>
  );
}

const Rotulo = ({ children }: { children: string }) => <p className="kicker rise">{children}</p>;

function Landing() {
  const [cor, setCor] = useState(CORES[0]);
  const [tema, setTema] = useState<Tema>("light");

  return (
    <>
      <nav className="topbar" aria-label="StackUI">
        <div className="topbar__inner">
          <a href="#top" className="topbar__brand">
            <Marca />
            StackUI
          </a>
          <div className="topbar__menu">
            <a href="#/docs/introduction">Docs</a>
            <a href="#/docs/text-and-stacks">Components</a>
            <a href={GITHUB}>GitHub</a>
            <a href="#/docs/introduction" className="btn btn--small">
              Get started
            </a>
          </div>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <p className="kicker">@stackui/react · open source</p>
          <h1 className="hero__headline">
            Native feel.
            <br />
            <span className="hero__accent">No app store.</span>
          </h1>
          <p className="hero__lead">Build dynamic and elegant PWA applications for iOS and Android with React.</p>
          <div className="hero__ctas">
            <a href="#/docs/introduction" className="btn">
              Get started
            </a>
            <Instalar />
          </div>
          <p className="hero__credit">
            Created by{" "}
            <a href={AUTOR} className="hero__author">
              Gustavo Pavão
            </a>
          </p>
          <div className="hero__device">
            <Phone demo="app" titulo="Wallet, a finance app built with StackUI. It is live: tap it." tint={CORES[0].valor} tamanho="large" />
            <p className="hero__note">
              <span className="live-dot" aria-hidden /> Live app. Tap it.
            </p>
          </div>
        </section>

        <section id="screens" className="section section--tint">
          <Rotulo>01 · In motion</Rotulo>
          <h2 className="section__headline rise">Five screens. One library.</h2>
          <p className="section__lead rise">Each one is a real screen of Wallet, our example app, built only with StackUI.</p>
          <Visor />
        </section>

        <section className="section section--night">
          <Rotulo>02 · Performance</Rotulo>
          <h2 className="section__headline rise">
            20,000 rows.
            <br />
            Smooth as ten.
          </h2>
          <p className="section__lead rise">LazyList draws only what is on screen and recycles every cell, the way native lists do. Scroll as fast as you like.</p>
          <div className="section__device">
            <Phone demo="lists" titulo="A list of 20,000 transactions" tint="#8b7dff" tema="dark" tamanho="large" />
          </div>
        </section>

        <section id="theming" className="section">
          <div className="playground">
            <div className="playground__text">
              <Rotulo>03 · Theming</Rotulo>
              <h2 className="section__headline section__headline--left rise">Your brand, everywhere.</h2>
              <p className="section__lead section__lead--left rise">One CSS variable sets the accent across every component. Light and dark come built in. Try it.</p>
              <div className="playground__panel">
                <p className="playground__label">Accent</p>
                <div className="chips" role="radiogroup" aria-label="Accent color">
                  {CORES.map((c) => (
                    <button key={c.valor} type="button" role="radio" aria-checked={cor.valor === c.valor} className="chip" onClick={() => setCor(c)}>
                      <span className="chip__dot" style={{ background: c.valor }} aria-hidden />
                      {c.nome}
                    </button>
                  ))}
                </div>
                <p className="playground__label">Appearance</p>
                <div className="segment" role="radiogroup" aria-label="Appearance">
                  {(["light", "dark"] as const).map((t) => (
                    <button key={t} type="button" role="radio" aria-checked={tema === t} onClick={() => setTema(t)}>
                      {t === "light" ? "Light" : "Dark"}
                    </button>
                  ))}
                </div>
                <pre className="playground__code">
                  <code>
                    <span className="c-sel">:root</span>
                    {" {\n  "}
                    <span className="c-prop">--st-tint</span>: <span className="c-val">{cor.valor}</span>
                    {";\n}"}
                    {tema === "dark" && (
                      <>
                        {"\n\n"}
                        <span className="c-com">{"<!-- or follow the system -->"}</span>
                        {"\n"}
                        <span className="c-sel">{'<html data-theme="dark">'}</span>
                      </>
                    )}
                  </code>
                </pre>
              </div>
            </div>
            <Phone demo="controls" titulo={`A transfer form in ${cor.nome}, ${tema} appearance`} tint={cor.valor} tema={tema} tamanho="large" />
          </div>
        </section>

        <section className="section section--tint">
          <Rotulo>04 · Built right</Rotulo>
          <h2 className="section__headline rise">Small by design.</h2>
          <div className="bento">
            <div className="tile tile--number">
              <strong>51</strong>
              <span>components, from stacks to sheets</span>
            </div>
            <div className="tile tile--number">
              <strong>1</strong>
              <span>dependency: React</span>
            </div>
            <div className="tile tile--number">
              <strong>0</strong>
              <span>install scripts, ever</span>
            </div>
            <div className="tile tile--number">
              <strong>MIT</strong>
              <span>open source license</span>
            </div>
            <div className="tile">
              <h3>Accessible</h3>
              <p>Real buttons, links, dialogs and radio groups. Focus goes where it should. Reduced motion is respected.</p>
            </div>
            <div className="tile">
              <h3>Any router</h3>
              <p>Links take an href or your router’s own link component. Navigation needs only the current location.</p>
            </div>
            <div className="tile">
              <h3>Installable</h3>
              <p>InstallGate shows how to install on each phone and browser, and opens your app only from its icon.</p>
            </div>
            <div className="tile">
              <h3>Barcode ready</h3>
              <p>A camera scanner that works offline, in its own entry: apps that never scan never download it.</p>
            </div>
          </div>
        </section>

        <section id="start" className="section">
          <Rotulo>05 · Developers</Rotulo>
          <h2 className="section__headline rise">Start building.</h2>
          <p className="section__lead rise">Install the package, import the styles once, and write your first screen. The docs walk you through the rest.</p>
          <pre className="code">
            <code>{CODIGO}</code>
          </pre>
          <div className="hero__ctas">
            <a href="#/docs/introduction" className="btn">
              Read the docs
            </a>
            <a href={GITHUB} className="btn btn--ghost">
              View on GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <a href="#top" className="topbar__brand">
              <Marca />
              StackUI
            </a>
            <p>Build dynamic and elegant PWA applications for iOS and Android with React.</p>
            <p className="footer__credit">
              Created by{" "}
              <a href={AUTOR} className="hero__author">
                Gustavo Pavão
              </a>
            </p>
          </div>
          <div className="footer__cols">
            <div>
              <p className="footer__title">Learn</p>
              <a href="#/docs/introduction">Introduction</a>
              <a href="#/docs/installation">Installation</a>
              <a href="#/docs/navigation">Navigation</a>
              <a href="#/docs/theming">Theming</a>
            </div>
            <div>
              <p className="footer__title">Components</p>
              <a href="#/docs/sheet">Sheet</a>
              <a href="#/docs/toast">Toast</a>
              <a href="#/docs/lazy-list">LazyList</a>
              <a href="#/docs/install-gate">InstallGate</a>
            </div>
            <div>
              <p className="footer__title">Project</p>
              <a href={GITHUB}>GitHub</a>
              <a href={`${GITHUB}/blob/main/SECURITY.md`}>Security</a>
              <a href={`${GITHUB}/blob/main/LICENSE`}>MIT License</a>
            </div>
          </div>
        </div>
        <p className="footer__legal">© 2026 Gustavo Pavão. iOS is a trademark of Apple Inc. Android is a trademark of Google LLC.</p>
      </footer>
    </>
  );
}

/** Two pages: the product page and the docs (#/docs/<page>). Hash routes work on GitHub Pages without a server. */
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
