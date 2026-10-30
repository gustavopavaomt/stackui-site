import { useEffect, useMemo, useState } from "react";

import { docs } from "./docs";
import { Flags, useLang, useT } from "./i18n";
import { Marca } from "./marca";
import { Inline, ler, Realce, type Bloco } from "./markdown";
import { PROPS } from "./props";
import { PROPS_PT } from "./props-pt";

import "./docs.css";

const GITHUB = "https://github.com/gustavopavaomt/stackui";
const FONTE = "https://github.com/gustavopavaomt/stackui-site/blob/main/src/site/content";
const BASE = import.meta.env.BASE_URL;

function Copiar({ texto }: { texto: string }) {
  const t = useT();
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className="doc-copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(texto);
          setOk(true);
          window.setTimeout(() => setOk(false), 1600);
        } catch {
          setOk(false);
        }
      }}
    >
      {ok ? t("Copied", "Copiado") : t("Copy", "Copiar")}
    </button>
  );
}

function Codigo({ codigo, lang }: { codigo: string; lang: string }) {
  return (
    <div className="doc-code">
      <div className="doc-code__bar">
        <span>{lang === "sh" ? "Terminal" : lang.toUpperCase() || "CODE"}</span>
        <Copiar texto={codigo} />
      </div>
      <pre>
        <code>
          <Realce codigo={codigo} />
        </code>
      </pre>
    </div>
  );
}

/** The live example next to its code. The example runs in its own frame, at a phone's width. */
function Exemplo({ nome, altura, codigo }: { nome: string; altura: number; codigo: string }) {
  const { lang } = useLang();
  const t = useT();
  return (
    <figure className="doc-example">
      <div className="doc-example__preview">
        <span className="doc-example__label">{t("Live example", "Exemplo ao vivo")}</span>
        <iframe
          key={lang}
          src={`${BASE}demo.html?c=${nome}&lang=${lang}&theme=dark`}
          title={`${t("Live example", "Exemplo ao vivo")}: ${nome}`}
          loading="lazy"
          style={{ height: altura }}
          allow={nome === "barcode-scanner" ? "camera" : undefined}
        />
      </div>
      <Codigo codigo={codigo} lang="tsx" />
    </figure>
  );
}

function Props({ componente }: { componente: string }) {
  const { lang } = useLang();
  const t = useT();
  const lista = PROPS[componente] ?? [];
  return (
    <section className="doc-props" aria-labelledby={`props-${componente}`}>
      <h3 id={`props-${componente}`} className="doc-props__title">
        <code>{componente}</code>
      </h3>
      <dl>
        {lista.map((p) => (
          <div key={p.name} className="doc-prop">
            <dt>
              <code className="doc-prop__name">{p.name}</code>
              {p.required && <span className="doc-prop__required">{t("Required", "Obrigatória")}</span>}
            </dt>
            <dd>
              <p>{(lang === "pt" && PROPS_PT[componente]?.[p.name]) || p.description}</p>
              <p className="doc-prop__meta">
                <span>{t("Type", "Tipo")}</span>
                <code>{p.type}</code>
              </p>
              {p.default && (
                <p className="doc-prop__meta">
                  <span>{t("Default", "Padrão")}</span>
                  <code>{p.default}</code>
                </p>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const CALLOUT: Record<string, string> = { tip: "tip", dica: "tip", note: "note", nota: "note", warning: "warning", atenção: "warning" };

function Blocos({ blocos }: { blocos: Bloco[] }) {
  return (
    <>
      {blocos.map((b, i) => {
        switch (b.tipo) {
          case "h1":
            return null;
          case "h2":
            return (
              <h2 key={i} id={b.id}>
                <Inline texto={b.texto} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={b.id}>
                <Inline texto={b.texto} />
              </h3>
            );
          case "p":
            return (
              <p key={i}>
                <Inline texto={b.texto} />
              </p>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.itens.map((txt, j) => (
                  <li key={j}>
                    <Inline texto={txt} />
                  </li>
                ))}
              </ul>
            );
          case "code":
            return <Codigo key={i} codigo={b.codigo} lang={b.lang} />;
          case "callout":
            return (
              <aside key={i} className={`doc-callout doc-callout--${CALLOUT[b.rotulo.toLowerCase()] ?? "note"}`}>
                <strong>{b.rotulo}</strong>
                <p>
                  <Inline texto={b.texto} />
                </p>
              </aside>
            );
          case "example":
            return <Exemplo key={i} nome={b.nome} altura={b.altura} codigo={b.codigo} />;
          case "props":
            return <Props key={i} componente={b.componente} />;
          case "components":
            return null;
        }
      })}
    </>
  );
}

export function DocsPage({ slug }: { slug: string }) {
  const { lang } = useLang();
  const t = useT();
  const grupos = useMemo(() => docs(lang), [lang]);
  const todas = useMemo(() => grupos.flatMap((g) => g.paginas), [grupos]);
  const indice = Math.max(0, todas.findIndex((p) => p.slug === slug));
  const pagina = todas[indice];
  const blocos = useMemo(() => ler(pagina.md), [pagina]);
  const titulo = blocos.find((b) => b.tipo === "h1");
  const lead = blocos.findIndex((b) => b.tipo === "p");
  const secoes = blocos.filter((b): b is { tipo: "h2"; texto: string; id: string } => b.tipo === "h2");
  const anterior = todas[indice - 1];
  const proxima = todas[indice + 1];
  const basico = grupos[0].paginas.some((p) => p.slug === pagina.slug);
  const [busca, setBusca] = useState("");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.title = `${pagina.titulo} · StackUI`;
  }, [pagina]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenu(false);
  }, [slug]);

  const filtrados = grupos.map((g) => ({ ...g, paginas: g.paginas.filter((p) => p.titulo.toLowerCase().includes(busca.trim().toLowerCase())) })).filter((g) => g.paginas.length);

  return (
    <div className="docs">
      <header className="docs-top">
        <a href="#top" className="docs-top__brand">
          <Marca />
          STACKUI
        </a>
        <nav className="docs-top__nav" aria-label={t("Site", "Site")}>
          <a href="#/docs/introduction" aria-current={basico ? "page" : undefined}>
            {t("Guides", "Guias")}
          </a>
          <a href="#/docs/text-and-stacks" aria-current={!basico ? "page" : undefined}>
            {t("Components", "Componentes")}
          </a>
          <a href={GITHUB}>GitHub</a>
        </nav>
        <button type="button" className="docs-top__menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          {menu ? t("Close", "Fechar") : "Menu"}
        </button>
        <Flags />
      </header>

      <div className="docs-body">
        <aside className={`docs-side${menu ? " docs-side--open" : ""}`} aria-label={t("Docs", "Docs")}>
          <input
            className="docs-side__search"
            type="search"
            placeholder={t("Search the docs", "Buscar na documentação")}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label={t("Search the docs", "Buscar na documentação")}
          />
          {filtrados.map((g) => (
            <div key={g.titulo} className="docs-side__group">
              <p className="docs-side__title">{g.titulo}</p>
              <ul>
                {g.paginas.map((p) => (
                  <li key={p.slug}>
                    <a href={`#/docs/${p.slug}`} aria-current={p.slug === pagina.slug ? "page" : undefined}>
                      {p.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <main className="docs-main">
          <article className="doc">
            <p className="doc__kicker">{basico ? t("The Basics", "O básico") : t("Components", "Componentes")}</p>
            <h1>{titulo && "texto" in titulo ? titulo.texto : pagina.titulo}</h1>
            {lead >= 0 && "texto" in blocos[lead] && (
              <p className="doc__lead">
                <Inline texto={(blocos[lead] as { texto: string }).texto} />
              </p>
            )}
            <Blocos blocos={blocos.filter((_, i) => i !== lead)} />
          </article>
          <div className="doc-foot">
            <a href={`${FONTE}/${lang}/${pagina.slug}.md`}>{t("Edit this page on GitHub", "Editar esta página no GitHub")}</a>
          </div>
          <nav className="doc-pager" aria-label={t("Pages", "Páginas")}>
            {anterior ? (
              <a href={`#/docs/${anterior.slug}`} className="doc-pager__link">
                <span>{t("Previous", "Anterior")}</span>
                {anterior.titulo}
              </a>
            ) : (
              <span />
            )}
            {proxima && (
              <a href={`#/docs/${proxima.slug}`} className="doc-pager__link doc-pager__link--next">
                <span>{t("Next", "Próxima")}</span>
                {proxima.titulo}
              </a>
            )}
          </nav>
        </main>

        <nav className="docs-toc" aria-label={t("On this page", "Nesta página")}>
          {secoes.length > 0 && (
            <>
              <p>{t("On this page", "Nesta página")}</p>
              <ul>
                {secoes.map((s) => (
                  <li key={s.id}>
                    <button type="button" onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}>
                      {s.texto.replace(/`/g, "")}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>
      </div>

      <footer className="docs-footer">
        <span>StackUI © 2026</span>
        <a href="https://github.com/gustavopavaomt">{t("Created by Gustavo Pavão", "Criado por Gustavo Pavão")}</a>
        <a href={GITHUB}>GitHub</a>
        <a href={`${GITHUB}/blob/main/LICENSE`}>{t("MIT License", "Licença MIT")}</a>
      </footer>
    </div>
  );
}
