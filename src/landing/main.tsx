import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

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
  { nome: "Blue", valor: "#007aff" },
  { nome: "Forest", valor: "#0e8a4a" },
  { nome: "Sunset", valor: "#f26b1d" },
  { nome: "Indigo", valor: "#5856d6" },
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
    <div className="install">
      <code className="install__command">{INSTALAR}</code>
      <button type="button" className="link" onClick={copiar} aria-live="polite">
        {copiado ? "Copied" : "Copy"}
      </button>
    </div>
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
  const [tema, setTema] = useState<Tema>("light");

  return (
    <>
      <nav className="localnav" aria-label="StackUI">
        <div className="localnav__inner">
          <a href="#top" className="localnav__title">
            StackUI
          </a>
          <div className="localnav__menu">
            <a href="#closer-look">Overview</a>
            <a href="#make-it-yours">Design</a>
            <a href="#start">Developers</a>
            <a href="#start" className="pill pill--small">
              Install
            </a>
          </div>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <h1 className="hero__product">StackUI</h1>
          <p className="hero__headline">
            Native feel.
            <br />
            No app store.
          </p>
          <p className="hero__lead">Build dynamic and elegant PWA applications for iOS and Android with React.</p>
          <div className="hero__ctas">
            <a href="#start" className="pill">
              Get started
            </a>
            <a href={GITHUB} className="link link--chevron">
              View on GitHub
            </a>
          </div>
          <div className="hero__device">
            <Phone demo="app" titulo="Wallet, a finance app built with StackUI. It is live: tap it." tamanho="large" />
          </div>
          <p className="hero__note">A live app, not a video. Go ahead, tap it.</p>
        </section>

        <section id="closer-look" className="section section--gray">
          <h2 className="section__headline rise">Take a closer look.</h2>
          <Visor />
        </section>

        <section className="section section--black">
          <h2 className="section__headline rise">
            20,000 rows.
            <br />
            Smooth as ten.
          </h2>
          <p className="section__lead rise">LazyList draws only what is on screen and recycles every cell, the way native lists do. Scroll as fast as you like.</p>
          <div className="section__device">
            <Phone demo="lists" titulo="A list of 20,000 transactions" tema="dark" tamanho="large" />
          </div>
        </section>

        <section id="make-it-yours" className="section">
          <h2 className="section__headline rise">Make it yours.</h2>
          <p className="section__lead rise">One CSS variable sets the accent across every component. Light and dark come built in.</p>
          <div className="section__device">
            <Phone demo="controls" titulo={`Controls in ${cor.nome}, ${tema} appearance`} tint={cor.valor} tema={tema} tamanho="large" />
          </div>
          <div className="finish">
            <p className="finish__name" aria-live="polite">
              {cor.nome}
            </p>
            <div className="finish__swatches" role="radiogroup" aria-label="Accent color">
              {CORES.map((c) => (
                <button key={c.valor} type="button" role="radio" aria-checked={cor.valor === c.valor} aria-label={c.nome} className="finish__swatch" style={{ "--swatch": c.valor } as React.CSSProperties} onClick={() => setCor(c)} />
              ))}
            </div>
            <div className="finish__appearance" role="radiogroup" aria-label="Appearance">
              {(["light", "dark"] as const).map((t) => (
                <button key={t} type="button" role="radio" aria-checked={tema === t} className="finish__mode" onClick={() => setTema(t)}>
                  {t === "light" ? "Light" : "Dark"}
                </button>
              ))}
            </div>
            <pre className="finish__code">
              <code>--st-tint: {cor.valor};</code>
            </pre>
          </div>
        </section>

        <section className="section section--gray">
          <h2 className="section__headline rise">Small by design.</h2>
          <dl className="numbers">
            <div>
              <dt>51</dt>
              <dd>components, from stacks to sheets</dd>
            </div>
            <div>
              <dt>1</dt>
              <dd>dependency. React.</dd>
            </div>
            <div>
              <dt>0</dt>
              <dd>install scripts, ever</dd>
            </div>
            <div>
              <dt>MIT</dt>
              <dd>open source license</dd>
            </div>
          </dl>
          <ul className="facts">
            <li>
              <h3>Accessible</h3>
              <p>Real buttons, links, dialogs and radio groups. Focus goes where it should. Reduced motion is respected.</p>
            </li>
            <li>
              <h3>Any router</h3>
              <p>Links take an href or your router’s own link component. Navigation needs only the current location.</p>
            </li>
            <li>
              <h3>Installable</h3>
              <p>InstallGate shows how to install on each phone and browser, and opens your app only from its icon.</p>
            </li>
            <li>
              <h3>Barcode ready</h3>
              <p>A camera scanner that works offline, shipped as its own entry so apps that never scan never download it.</p>
            </li>
          </ul>
        </section>

        <section id="start" className="section">
          <h2 className="section__headline rise">Start building.</h2>
          <p className="section__lead rise">Install the package, import the styles once, and write your first screen.</p>
          <Instalar />
          <pre className="code">
            <code>{CODIGO}</code>
          </pre>
          <div className="hero__ctas">
            <a href={`${GITHUB}#readme`} className="link link--chevron">
              Read the documentation
            </a>
            <a href={GITHUB} className="link link--chevron">
              View the source
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <p className="footer__credit">
            Designed and built by{" "}
            <a href={AUTOR} className="footer__author">
              Gustavo Pavão
            </a>
            .
          </p>
          <p>StackUI is free and open source under the MIT license. iOS is a trademark of Apple Inc. Android is a trademark of Google LLC.</p>
          <div className="footer__bottom">
            <p>Copyright © 2026 Gustavo Pavão.</p>
            <p>
              <a href={GITHUB}>GitHub</a>
              <span aria-hidden> | </span>
              <a href={`${GITHUB}/blob/main/SECURITY.md`}>Security</a>
              <span aria-hidden> | </span>
              <a href={`${GITHUB}/blob/main/LICENSE`}>License</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
);
