import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/* The site speaks English and Brazilian Portuguese. The first visit follows the browser; a flag click is remembered. */

export type Lang = "en" | "pt";

const CHAVE = "stackui-lang";

function inicial(): Lang {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo === "en" || salvo === "pt") return salvo;
  } catch {
    /* private mode: fall back to the browser */
  }
  const idiomas = navigator.languages?.length ? navigator.languages : [navigator.language];
  return idiomas.some((l) => l?.toLowerCase().startsWith("pt")) ? "pt" : "en";
}

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => undefined });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(inicial);
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(CHAVE, l);
    } catch {
      /* not remembered, still switched */
    }
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

/** Picks the text of the current language: t("Hello", "Olá"). */
export function useT() {
  const { lang } = useLang();
  return (en: string, pt: string) => (lang === "pt" ? pt : en);
}

function Brasil() {
  return (
    <svg viewBox="0 0 28 20" width={24} height={17} aria-hidden>
      <rect width="28" height="20" rx="2" fill="#009c3b" />
      <path d="M14 3l10 7-10 7L4 10z" fill="#ffdf00" />
      <circle cx="14" cy="10" r="4.2" fill="#002776" />
      <path d="M9.9 9.2c2.7-.6 5.6-.2 8.1 1" stroke="#fff" strokeWidth=".9" fill="none" />
    </svg>
  );
}

function Eua() {
  return (
    <svg viewBox="0 0 28 20" width={24} height={17} aria-hidden>
      <rect width="28" height="20" rx="2" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="28" height={20 / 13} fill="#b22234" />
      ))}
      <rect width="12" height={(20 / 13) * 7} fill="#3c3b6e" />
    </svg>
  );
}

/** The two flags: Portuguese (Brazil) and English (United States). */
export function Flags() {
  const { lang, setLang } = useLang();
  return (
    <div className="flags" role="radiogroup" aria-label="Language / Idioma">
      <button type="button" role="radio" aria-checked={lang === "pt"} aria-label="Português (Brasil)" title="Português (Brasil)" onClick={() => setLang("pt")}>
        <Brasil />
      </button>
      <button type="button" role="radio" aria-checked={lang === "en"} aria-label="English (US)" title="English (US)" onClick={() => setLang("en")}>
        <Eua />
      </button>
    </div>
  );
}
