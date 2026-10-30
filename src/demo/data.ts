/* A personal finance app's data: invented merchants, nothing real. */
import { L, LOCALE, PT } from "./lang";

export type Categoria = "groceries" | "dining" | "transport" | "shopping" | "bills" | "health" | "travel" | "fun" | "salary" | "transfer";

export type Lancamento = {
  id: string;
  titulo: string;
  categoria: Categoria;
  /** Negative = expense, positive = income. */
  valor: number;
  /** ISO date, YYYY-MM-DD. */
  data: string;
  nota?: string;
};

export const CATEGORIAS: Record<Categoria, { nome: string; cor: string }> = {
  groceries: { nome: L("Groceries", "Mercado"), cor: "var(--st-green)" },
  dining: { nome: L("Dining", "Restaurantes"), cor: "var(--st-orange)" },
  transport: { nome: L("Transport", "Transporte"), cor: "var(--st-blue)" },
  shopping: { nome: L("Shopping", "Compras"), cor: "var(--st-indigo)" },
  bills: { nome: L("Bills", "Contas"), cor: "var(--st-yellow)" },
  health: { nome: L("Health", "Saúde"), cor: "var(--st-red)" },
  travel: { nome: L("Travel", "Viagem"), cor: "var(--st-teal)" },
  fun: { nome: L("Entertainment", "Lazer"), cor: "var(--st-indigo)" },
  salary: { nome: L("Salary", "Salário"), cor: "var(--st-green)" },
  transfer: { nome: L("Transfer", "Transferência"), cor: "var(--st-gray)" },
};

const GASTOS: [string, string, Categoria, number][] = [
  ["Green Grocer", "Hortifruti Verde", "groceries", 64],
  ["Coffee Lab", "Café do Largo", "dining", 6],
  ["Metro Pass", "Bilhete Único", "transport", 32],
  ["Sunset Diner", "Lanchonete Sol", "dining", 41],
  ["City Power", "Companhia de Luz", "bills", 88],
  ["Book Nook", "Livraria Sebo", "shopping", 23],
  ["Pharmacy Plus", "Farmácia Mais", "health", 18],
  ["Cinema 8", "Cine 8", "fun", 26],
  ["Fuel Stop", "Posto Estrela", "transport", 52],
  ["Harbor Hotel", "Hotel do Porto", "travel", 210],
  ["Fresh Market", "Mercado Fresco", "groceries", 97],
  ["Gym Club", "Academia Forma", "health", 45],
];

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** 20,000 transactions over the last years, newest first: enough to show the lazy list never slows down. */
export function gerarLancamentos(): Lancamento[] {
  const hoje = new Date();
  return Array.from({ length: 20000 }, (_, i) => {
    const d = new Date(hoje);
    d.setDate(hoje.getDate() - Math.floor(i / 3));
    if (i % 60 === 7) return { id: String(i + 1), titulo: L("Northwind Payroll", "Salário Northwind"), categoria: "salary", valor: 4200, data: iso(d) };
    if (i % 23 === 5) return { id: String(i + 1), titulo: L("Transfer from Ana", "Pix da Ana"), categoria: "transfer", valor: 150, data: iso(d) };
    const [en, pt, categoria, base] = GASTOS[(i * 7) % GASTOS.length];
    const variacao = ((i * 7919) % 100) / 100;
    return { id: String(i + 1), titulo: PT ? pt : en, categoria, valor: -Math.round(base * (0.6 + variacao) * 100) / 100, data: iso(d) };
  });
}

export const hojeIso = () => iso(new Date());

const formato = new Intl.NumberFormat(LOCALE, { style: "currency", currency: PT ? "BRL" : "USD" });

export const moeda = (n: number, sinal = false) => {
  const s = formato.format(Math.abs(n));
  return n < 0 ? `−${s}` : sinal ? `+${s}` : s;
};

export const dataCurta = (isoData: string) => {
  const [a, m, d] = isoData.split("-").map(Number);
  if (isoData === hojeIso()) return L("Today", "Hoje");
  return new Date(a, m - 1, d).toLocaleDateString(LOCALE, { month: "short", day: "numeric" });
};

export const dataLonga = (isoData: string) => {
  const [a, m, d] = isoData.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString(LOCALE, { month: "long", day: "numeric", year: "numeric" });
};
