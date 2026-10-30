/* The language of everything inside the frames: ?lang=pt (Brazilian Portuguese) or English. */

export const PT = new URLSearchParams(location.search).get("lang") === "pt";

/** Picks the text of the current language: L("Save", "Salvar"). */
export const L = (en: string, pt: string) => (PT ? pt : en);

export const LOCALE = PT ? "pt-BR" : "en-US";
