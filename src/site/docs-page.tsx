import { useEffect, useMemo, useState } from "react";

import { DOCS, TODAS } from "./docs";
import { Inline, ler, Realce, type Bloco } from "./markdown";
import { PROPS } from "./props";

import "./docs.css";

const GITHUB = "https://github.com/gustavopavaomt/stackui";
const FONTE = "https://github.com/gustavopavaomt/stackui-site/blob/main/src/site/content";
const BASE = import.meta.env.BASE_URL;

function Copiar({ texto }: { texto: string }) {
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
      {ok ? "Copied" : "Copy"}
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
  return (
    <figure className="doc-example">
      <div className="doc-example__preview">
        <span className="doc-example__label">Live example</span>
        <iframe src={`${BASE}demo.html?c=${nome}&theme=light`} title={`Live example: ${nome}`} loading="lazy" style={{ height: altura }} allow={nome === "barcode-scanner" ? "camera" : undefined} />
      </div>
      <Codigo codigo={codigo} lang="tsx" />
    </figure>
  );
}

function Props({ componente }: { componente: string }) {
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
              {p.required && <span className="doc-prop__required">Required</span>}
            </dt>
            <dd>
              <p>{p.description}</p>
              <p className="doc-prop__meta">
                <span>Type</span>
                <code>{p.type}</code>
              </p>
              {p.default && (
                <p className="doc-prop__meta">
                  <span>Default</span>
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

function Componentes() {
  return (
    <div className="doc-grid">
      {DOCS.slice(1).flatMap((g) =>
        g.paginas.map((p) => (
          <a key={p.slug} href={`#/docs/${p.slug}`} className="doc-grid__item">
            <span>{g.titulo}</span>
            {p.titulo}
          </a>
        )),
      )}
    </div>
  );
}

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
                {b.itens.map((t, j) => (
                  <li key={j}>
                    <Inline texto={t} />
                  </li>
                ))}
              </ul>
            );
          case "code":
            return <Codigo key={i} codigo={b.codigo} lang={b.lang} />;
          case "callout":
            return (
              <aside key={i} className={`doc-callout doc-callout--${b.rotulo.toLowerCase()}`}>
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
            return <Componentes key={i} />;
        }
      })}
    </>
  );
}

export function DocsPage({ slug }: { slug: string }) {
  const indice = Math.max(0, TODAS.findIndex((p) => p.slug === slug));
  const pagina = TODAS[indice];
  const blocos = useMemo(() => ler(pagina.md), [pagina]);
  const titulo = blocos.find((b) => b.tipo === "h1");
  const lead = blocos.findIndex((b) => b.tipo === "p");
  const secoes = blocos.filter((b): b is { tipo: "h2"; texto: string; id: string } => b.tipo === "h2");
  const anterior = TODAS[indice - 1];
  const proxima = TODAS[indice + 1];
  const [busca, setBusca] = useState("");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.title = `${pagina.titulo} · StackUI`;
    window.scrollTo(0, 0);
    setMenu(false);
  }, [pagina]);

  const grupos = DOCS.map((g) => ({ ...g, paginas: g.paginas.filter((p) => p.titulo.toLowerCase().includes(busca.trim().toLowerCase())) })).filter((g) => g.paginas.length);

  return (
    <div className="docs">
      <header className="docs-top">
        <div className="docs-top__inner">
          <a href="#top" className="docs-top__brand">
            StackUI
          </a>
          <nav className="docs-top__nav" aria-label="Site">
            <a href="#/docs/introduction" aria-current={DOCS[0].paginas.some((p) => p.slug === pagina.slug) ? "page" : undefined}>
              Guides
            </a>
            <a href="#/docs/text-and-stacks" aria-current={!DOCS[0].paginas.some((p) => p.slug === pagina.slug) ? "page" : undefined}>
              Components
            </a>
            <a href={GITHUB}>GitHub</a>
          </nav>
          <button type="button" className="docs-top__menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
            {menu ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div className="docs-body">
        <aside className={`docs-side${menu ? " docs-side--open" : ""}`} aria-label="Docs">
          <input className="docs-side__search" type="search" placeholder="Search the docs" value={busca} onChange={(e) => setBusca(e.target.value)} aria-label="Search the docs" />
          {grupos.map((g) => (
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
            <h1>{titulo && "texto" in titulo ? titulo.texto : pagina.titulo}</h1>
            {lead >= 0 && "texto" in blocos[lead] && (
              <p className="doc__lead">
                <Inline texto={(blocos[lead] as { texto: string }).texto} />
              </p>
            )}
            <Blocos blocos={blocos.filter((_, i) => i !== lead)} />
          </article>
          <div className="doc-foot">
            <a href={`${FONTE}/${pagina.slug}.md`}>Edit this page on GitHub</a>
          </div>
          <nav className="doc-pager" aria-label="Pages">
            {anterior ? (
              <a href={`#/docs/${anterior.slug}`} className="doc-pager__link">
                <span>Previous</span>
                {anterior.titulo}
              </a>
            ) : (
              <span />
            )}
            {proxima && (
              <a href={`#/docs/${proxima.slug}`} className="doc-pager__link doc-pager__link--next">
                <span>Next</span>
                {proxima.titulo}
              </a>
            )}
          </nav>
        </main>

        <nav className="docs-toc" aria-label="On this page">
          {secoes.length > 0 && (
            <>
              <p>On this page</p>
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
        <p>
          StackUI is free and open source under the MIT license. Designed and built by{" "}
          <a href="https://github.com/gustavopavaomt">Gustavo Pavão</a>.
        </p>
      </footer>
    </div>
  );
}
