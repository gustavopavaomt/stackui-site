/* A personal finance app's data: invented merchants, nothing real. */

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
  groceries: { nome: "Groceries", cor: "var(--st-green)" },
  dining: { nome: "Dining", cor: "var(--st-orange)" },
  transport: { nome: "Transport", cor: "var(--st-blue)" },
  shopping: { nome: "Shopping", cor: "var(--st-indigo)" },
  bills: { nome: "Bills", cor: "var(--st-yellow)" },
  health: { nome: "Health", cor: "var(--st-red)" },
  travel: { nome: "Travel", cor: "var(--st-teal)" },
  fun: { nome: "Entertainment", cor: "var(--st-indigo)" },
  salary: { nome: "Salary", cor: "var(--st-green)" },
  transfer: { nome: "Transfer", cor: "var(--st-gray)" },
};

const GASTOS: [string, Categoria, number][] = [
  ["Green Grocer", "groceries", 64],
  ["Coffee Lab", "dining", 6],
  ["Metro Pass", "transport", 32],
  ["Sunset Diner", "dining", 41],
  ["City Power", "bills", 88],
  ["Book Nook", "shopping", 23],
  ["Pharmacy Plus", "health", 18],
  ["Cinema 8", "fun", 26],
  ["Fuel Stop", "transport", 52],
  ["Harbor Hotel", "travel", 210],
  ["Fresh Market", "groceries", 97],
  ["Gym Club", "health", 45],
];

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** 20,000 transactions over the last years, newest first: enough to show the lazy list never slows down. */
export function gerarLancamentos(): Lancamento[] {
  const hoje = new Date();
  return Array.from({ length: 20000 }, (_, i) => {
    const d = new Date(hoje);
    d.setDate(hoje.getDate() - Math.floor(i / 9));
    if (i % 60 === 7) return { id: String(i + 1), titulo: "Northwind Payroll", categoria: "salary", valor: 4200, data: iso(d) };
    if (i % 23 === 5) return { id: String(i + 1), titulo: "Transfer from Ana", categoria: "transfer", valor: 150, data: iso(d) };
    const [titulo, categoria, base] = GASTOS[(i * 7) % GASTOS.length];
    const variacao = ((i * 7919) % 100) / 100;
    return { id: String(i + 1), titulo, categoria, valor: -Math.round((base * (0.6 + variacao)) * 100) / 100, data: iso(d) };
  });
}

export const hojeIso = () => iso(new Date());

export const moeda = (n: number, sinal = false) => {
  const s = Math.abs(n).toLocaleString("en-US", { style: "currency", currency: "USD" });
  return n < 0 ? `−${s}` : sinal ? `+${s}` : s;
};

export const dataCurta = (isoData: string) => {
  const [a, m, d] = isoData.split("-").map(Number);
  const data = new Date(a, m - 1, d);
  if (isoData === hojeIso()) return "Today";
  return data.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const dataLonga = (isoData: string) => {
  const [a, m, d] = isoData.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};
