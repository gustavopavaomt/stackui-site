import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import { DocsPage } from "../site/docs-page";
import { Flags, LangProvider, useLang, useT } from "../site/i18n";
import { Marca } from "../site/marca";

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
  { nome: ["Blue", "Azul"], valor: "#0a84ff" },
  { nome: ["Green", "Verde"], valor: "#30d158" },
  { nome: ["Orange", "Laranja"], valor: "#ff9f0a" },
  { nome: ["Red", "Vermelho"], valor: "#ff453a" },
  { nome: ["Gray", "Cinza"], valor: "#8e8e93" },
] as const;

/** One full-screen section per subject, like a mission page: [English, Portuguese]. */
const MISSOES = [
  {
    id: "navigation",
    demo: "navigation",
    docs: "navigation",
    rotulo: ["Navigation", "Navegação"],
    titulo: ["Screens that slide", "Telas que deslizam"],
    texto: ["Push a screen in, slide it back out, right where you left off. Works with any router.", "Abra uma tela, volte deslizando, exatamente de onde parou. Funciona com qualquer roteador."],
  },
  {
    id: "sheets",
    demo: "sheets",
    docs: "presentation",
    rotulo: ["Sheets and alerts", "Folhas e alertas"],
    titulo: ["Drag to dismiss", "Arraste para fechar"],
    texto: ["Sheets that follow your finger, confirmations that show their own progress, alerts when it matters.", "Folhas que seguem o dedo, confirmações que mostram o próprio progresso e alertas quando importa."],
  },
  {
    id: "controls",
    demo: "controls",
    docs: "forms",
    rotulo: ["Controls", "Controles"],
    titulo: ["Forms that feel native", "Formulários de app nativo"],
    texto: ["Segmented pickers, fields with floating labels, steppers, switches and a button that says when it is done.", "Seletores segmentados, campos com rótulo flutuante, contadores, chaves e um botão que avisa quando terminou."],
  },
  {
    id: "toasts",
    demo: "toasts",
    docs: "feedback",
    rotulo: ["Feedback", "Retorno"],
    titulo: ["Sending… Sent.", "Enviando… Enviado."],
    texto: ["Toasts that wait in line and change in place while the work happens.", "Avisos que esperam a vez e mudam no lugar enquanto o trabalho acontece."],
  },
  {
    id: "pickers",
    demo: "pickers",
    docs: "list-picker",
    rotulo: ["Pickers", "Seletores"],
    titulo: ["Any date. Any list.", "Qualquer data. Qualquer lista."],
    texto: ["Calendars, time wheels and searchable lists, the same on every phone, in any language.", "Calendários, rodas de hora e listas com busca, iguais em qualquer celular, em qualquer idioma."],
  },
] as const;

/** A phone running one demo. Colors arrive in the URL first, then by message (the demo keeps its state). */
function Phone({ demo, titulo, tint = CORES[0].valor, tema = "dark" }: { demo: string; titulo: string; tint?: string; tema?: Tema }) {
  const { lang } = useLang();
  const [src] = useState(() => `${BASE}demo.html?d=${demo}&lang=${lang}&tint=${encodeURIComponent(tint)}&theme=${tema}`);
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
  const t = useT();
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
    <button type="button" className="cmd" onClick={copiar} aria-label={`${t("Copy", "Copiar")}: ${INSTALAR}`}>
      <code>{INSTALAR}</code>
      <span aria-live="polite">{copiado ? t("Copied", "Copiado") : t("Copy", "Copiar")}</span>
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

const CODIGO_PT = `import "@stackui/react/styles.css";
import { App, List, NavigationBar, Row, Section, Toggle } from "@stackui/react";

export function Ajustes() {
  const [avisos, setAvisos] = useState(true);
  return (
    <App>
      <NavigationBar title="Ajustes" />
      <List>
        <Section header="Geral">
          <Row title="Notificações"
            accessory={<Toggle isOn={avisos} onChange={setAvisos} />} />
          <Row title="Idioma" value="Português" href="/idioma" />
        </Section>
      </List>
    </App>
  );
}`;

function Landing() {
  const { lang } = useLang();
  const t = useT();
  const i = lang === "pt" ? 1 : 0;
  const [cor, setCor] = useState<(typeof CORES)[number]>(CORES[0]);
  const [tema, setTema] = useState<Tema>("dark");

  return (
    // Remount on a language switch: the phones reload in the new language.
    <div key={lang}>
      <header className="nav">
        <a href="#top" className="nav__brand">
          <Marca />
          STACKUI
        </a>
        <nav className="nav__links" aria-label={t("Site", "Site")}>
          <a href="#/docs/introduction">{t("Docs", "Docs")}</a>
          <a href="#/docs/text-and-stacks">{t("Components", "Componentes")}</a>
          <a href="#numbers">{t("Specs", "Specs")}</a>
          <a href={GITHUB}>GitHub</a>
        </nav>
        <a href="#/docs/introduction" className="nav__cta">
          {t("Get started", "Começar")}
        </a>
        <Flags />
      </header>

      <main id="top">
        <section className="stage stage--hero">
          <div className="stage__device">
            <Phone demo="app" titulo={t("Wallet, a finance app built with StackUI. It is live: tap it.", "Wallet, um app de finanças feito com StackUI. Está rodando: toque nele.")} />
          </div>
          <div className="stage__copy">
            <p className="stage__label">@stackui/react</p>
            <h1 className="stage__title">
              {t("Native feel.", "Cara de nativo.")}
              <br />
              {t("No app store.", "Sem loja de apps.")}
            </h1>
            <p className="stage__text">{t("Build dynamic and elegant PWA applications for iOS and Android with React.", "Crie aplicativos PWA dinâmicos e elegantes para iOS e Android com React.")}</p>
            <div className="stage__actions">
              <a href="#/docs/introduction" className="btn">
                {t("Get started", "Começar")}
              </a>
              <Copiar />
            </div>
            <p className="stage__credit">
              {t("Created by", "Criado por")} <a href={AUTOR}>Gustavo Pavão</a>
            </p>
          </div>
          <a href="#navigation" className="stage__scroll" aria-label={t("Scroll down", "Rolar para baixo")}>
            <span />
          </a>
        </section>

        {MISSOES.map((m, n) => (
          <section key={m.id} id={m.id} className={`stage${n % 2 ? " stage--flip" : ""}`}>
            <div className="stage__device">
              <Phone demo={m.demo} titulo={`${m.rotulo[i]}: ${t("a live screen of Wallet, built with StackUI", "uma tela da Wallet rodando, feita com StackUI")}`} />
            </div>
            <div className="stage__copy">
              <p className="stage__label">
                {String(n + 1).padStart(2, "0")} / {m.rotulo[i]}
              </p>
              <h2 className="stage__title">{m.titulo[i]}</h2>
              <p className="stage__text">{m.texto[i]}</p>
              <div className="stage__actions">
                <a href={`#/docs/${m.docs}`} className="btn">
                  {t("Learn more", "Saiba mais")}
                </a>
              </div>
            </div>
          </section>
        ))}

        <section className="stage stage--lists">
          <div className="stage__device">
            <Phone demo="lists" titulo={t("A list of 20,000 transactions", "Uma lista de 20 mil lançamentos")} />
          </div>
          <div className="stage__copy">
            <p className="stage__label">06 / {t("Performance", "Desempenho")}</p>
            <h2 className="stage__title">{t("20,000 rows", "20 mil linhas")}</h2>
            <p className="stage__text">
              {t(
                "Only what is on screen exists. Every cell is recycled, the way native lists do it. Scroll as fast as you like.",
                "Só existe o que está na tela. Cada célula é reaproveitada, como nas listas nativas. Role o quanto quiser.",
              )}
            </p>
            <div className="stage__actions">
              <a href="#/docs/lazy-list" className="btn">
                {t("Learn more", "Saiba mais")}
              </a>
            </div>
          </div>
        </section>

        <section id="numbers" className="numbers">
          <p className="stage__label">Specs</p>
          <dl className="numbers__row">
            <div>
              <dt>51</dt>
              <dd>{t("Components", "Componentes")}</dd>
            </div>
            <div>
              <dt>1</dt>
              <dd>{t("Dependency", "Dependência")}</dd>
            </div>
            <div>
              <dt>0</dt>
              <dd>{t("Install scripts", "Scripts de instalação")}</dd>
            </div>
            <div>
              <dt>20K</dt>
              <dd>{t("Rows, smooth", "Linhas, sem travar")}</dd>
            </div>
          </dl>
          <dl className="specs">
            <div>
              <dt>Runtime</dt>
              <dd>React 19</dd>
            </div>
            <div>
              <dt>{t("Platforms", "Plataformas")}</dt>
              <dd>{t("iOS, Android, desktop browsers", "iOS, Android, navegadores de computador")}</dd>
            </div>
            <div>
              <dt>{t("Styling", "Estilo")}</dt>
              <dd>{t("One stylesheet, CSS variables", "Um arquivo CSS, variáveis CSS")}</dd>
            </div>
            <div>
              <dt>{t("Routing", "Rotas")}</dt>
              <dd>{t("Any router, or none", "Qualquer roteador, ou nenhum")}</dd>
            </div>
            <div>
              <dt>{t("Accessibility", "Acessibilidade")}</dt>
              <dd>{t("Real dialogs, focus, reduced motion", "Diálogos de verdade, foco, menos movimento")}</dd>
            </div>
            <div>
              <dt>{t("License", "Licença")}</dt>
              <dd>MIT</dd>
            </div>
          </dl>
        </section>

        <section id="theming" className="stage stage--flip">
          <div className="stage__device">
            <Phone demo="controls" titulo={t("A transfer form in the chosen color", "Um formulário de transferência na cor escolhida")} tint={cor.valor} tema={tema} />
          </div>
          <div className="stage__copy">
            <p className="stage__label">07 / {t("Theming", "Temas")}</p>
            <h2 className="stage__title">{t("Your color", "Sua cor")}</h2>
            <p className="stage__text">{t("One CSS variable sets the accent across every component. Light and dark are built in.", "Uma variável CSS define a cor de destaque em todos os componentes. Claro e escuro já vêm prontos.")}</p>
            <div className="swatches" role="radiogroup" aria-label={t("Accent color", "Cor de destaque")}>
              {CORES.map((c) => (
                <button key={c.valor} type="button" role="radio" aria-checked={cor.valor === c.valor} aria-label={c.nome[i]} className="swatch" style={{ background: c.valor }} onClick={() => setCor(c)} />
              ))}
            </div>
            <div className="modes" role="radiogroup" aria-label={t("Appearance", "Aparência")}>
              {(["dark", "light"] as const).map((m) => (
                <button key={m} type="button" role="radio" aria-checked={tema === m} onClick={() => setTema(m)}>
                  {m === "dark" ? t("Dark", "Escuro") : t("Light", "Claro")}
                </button>
              ))}
            </div>
            <code className="stage__code">--st-tint: {cor.valor};</code>
          </div>
        </section>

        <section id="start" className="launch">
          <p className="stage__label">08 / {t("Start building", "Comece a construir")}</p>
          <h2 className="stage__title">{t("Ready for launch", "Pronto para lançar")}</h2>
          <pre className="launch__code">
            <code>{i ? CODIGO_PT : CODIGO}</code>
          </pre>
          <div className="stage__actions stage__actions--center">
            <a href="#/docs/introduction" className="btn">
              {t("Read the docs", "Ler a documentação")}
            </a>
            <a href={GITHUB} className="btn">
              {t("View on GitHub", "Ver no GitHub")}
            </a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <span>StackUI © 2026</span>
        <a href={AUTOR}>{t("Created by Gustavo Pavão", "Criado por Gustavo Pavão")}</a>
        <a href="#/docs/introduction">{t("Docs", "Docs")}</a>
        <a href={GITHUB}>GitHub</a>
        <a href={`${GITHUB}/blob/main/LICENSE`}>{t("MIT License", "Licença MIT")}</a>
      </footer>
    </div>
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
    <LangProvider>
      <Site />
    </LangProvider>
  </StrictMode>,
);
