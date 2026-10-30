import { Fragment, type ReactNode } from "react";

/*
 * A small Markdown reader for the docs pages: headings, paragraphs, lists, code fences, callouts and links, plus
 * three directives of our own:
 *   @example <name> <height>   followed by a code fence: the live example next to its code
 *   @props <Component>         the props reference of a component
 *   @components                the grid of every component
 */

export type Bloco =
  | { tipo: "h1" | "h2" | "h3"; texto: string; id: string }
  | { tipo: "p"; texto: string }
  | { tipo: "ul"; itens: string[] }
  | { tipo: "code"; lang: string; codigo: string }
  | { tipo: "callout"; rotulo: string; texto: string }
  | { tipo: "example"; nome: string; altura: number; codigo: string }
  | { tipo: "props"; componente: string }
  | { tipo: "components" };

export const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function ler(md: string): Bloco[] {
  const linhas = md.replace(/\r\n/g, "\n").split("\n");
  const blocos: Bloco[] = [];
  let i = 0;
  const cerca = () => {
    const lang = linhas[i].slice(3).trim();
    const corpo: string[] = [];
    i++;
    while (i < linhas.length && !linhas[i].startsWith("```")) corpo.push(linhas[i++]);
    i++;
    return { lang, codigo: corpo.join("\n") };
  };
  while (i < linhas.length) {
    const l = linhas[i];
    if (!l.trim()) {
      i++;
    } else if (l.startsWith("```")) {
      blocos.push({ tipo: "code", ...cerca() });
    } else if (l.startsWith("@example ")) {
      const [, nome, altura] = l.split(/\s+/);
      i++;
      while (i < linhas.length && !linhas[i].startsWith("```")) i++;
      blocos.push({ tipo: "example", nome, altura: Number(altura) || 360, codigo: cerca().codigo });
    } else if (l.startsWith("@props ")) {
      blocos.push({ tipo: "props", componente: l.slice(7).trim() });
      i++;
    } else if (l.trim() === "@components") {
      blocos.push({ tipo: "components" });
      i++;
    } else if (/^#{1,3} /.test(l)) {
      const nivel = l.indexOf(" ");
      const texto = l.slice(nivel + 1).trim();
      blocos.push({ tipo: (["h1", "h2", "h3"] as const)[nivel - 1], texto, id: slug(texto) });
      i++;
    } else if (l.startsWith("> ")) {
      const corpo: string[] = [];
      while (i < linhas.length && linhas[i].startsWith(">")) corpo.push(linhas[i++].replace(/^>\s?/, ""));
      const texto = corpo.join(" ");
      const m = /^\*\*(\w+):\*\*\s*/.exec(texto);
      blocos.push({ tipo: "callout", rotulo: m ? m[1] : "Note", texto: m ? texto.slice(m[0].length) : texto });
    } else if (/^- /.test(l)) {
      const itens: string[] = [];
      while (i < linhas.length && /^- /.test(linhas[i])) {
        let item = linhas[i++].slice(2);
        while (i < linhas.length && /^ {2}\S/.test(linhas[i])) item += ` ${linhas[i++].trim()}`;
        itens.push(item);
      }
      blocos.push({ tipo: "ul", itens });
    } else {
      const corpo: string[] = [];
      while (i < linhas.length && linhas[i].trim() && !/^(#{1,3} |```|> |- |@)/.test(linhas[i])) corpo.push(linhas[i++].trim());
      blocos.push({ tipo: "p", texto: corpo.join(" ") });
    }
  }
  return blocos;
}

/** Inline: `code`, **bold**, [text](link). Links to /docs/... stay inside the site. */
export function Inline({ texto }: { texto: string }) {
  const partes: ReactNode[] = [];
  const re = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let ultimo = 0;
  for (const m of texto.matchAll(re)) {
    partes.push(texto.slice(ultimo, m.index));
    if (m[1]) partes.push(<code key={m.index}>{m[1]}</code>);
    else if (m[2]) partes.push(<strong key={m.index}>{m[2]}</strong>);
    else {
      const href = m[4].startsWith("/") ? `#${m[4]}` : m[4];
      partes.push(
        <a key={m.index} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
          <Inline texto={m[3]} />
        </a>,
      );
    }
    ultimo = m.index! + m[0].length;
  }
  partes.push(texto.slice(ultimo));
  return <>{partes.map((p, i) => (typeof p === "string" ? <Fragment key={`t${i}`}>{p}</Fragment> : p))}</>;
}

/** A light syntax colorer for TSX, CSS and shell (strings, keywords, components, attributes, comments). */
export function Realce({ codigo }: { codigo: string }) {
  const partes: ReactNode[] = [];
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("[^"\n]*"|'[^'\n]*'|`[^`]*`)|\b(import|from|export|function|const|let|return|true|false|type|if|else|new)\b|(<\/?[A-Z][A-Za-z.]*)|(\b[a-zA-Z-]+(?==[{"]))|(--st-[a-z-]+)/g;
  let ultimo = 0;
  for (const m of codigo.matchAll(re)) {
    partes.push(codigo.slice(ultimo, m.index));
    const classe = m[1] ? "tk-comment" : m[2] ? "tk-string" : m[3] ? "tk-keyword" : m[4] ? "tk-tag" : m[5] ? "tk-attr" : "tk-var";
    partes.push(
      <span key={m.index} className={classe}>
        {m[0]}
      </span>,
    );
    ultimo = m.index! + m[0].length;
  }
  partes.push(codigo.slice(ultimo));
  return <>{partes}</>;
}
