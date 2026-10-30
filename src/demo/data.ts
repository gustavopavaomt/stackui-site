const NOMES = ["Mercadinho do Zé", "Pão Quente", "Casa Verde", "Mercado Central", "Super Bom", "Empório Sul", "Padaria Real", "Atacadão Norte", "Bella Pizza", "Café Aurora", "Horta Viva", "Doce Lar"];
export const CIDADES = ["São Paulo", "Santos", "Campinas", "Sorocaba", "Jundiaí", "Bauru", "Marília", "Ribeirão Preto", "Franca", "Piracicaba", "Londrina", "Curitiba"];

export type Pedido = { id: string; cliente: string; cidade: string; total: number; status: "open" | "sent" | "invoiced" };

/** 20,000 orders: enough to show the lazy list never slows down. */
export const PEDIDOS: Pedido[] = Array.from({ length: 20000 }, (_, i) => ({
  id: String(10001 + i),
  cliente: NOMES[i % NOMES.length],
  cidade: CIDADES[(i * 7) % CIDADES.length],
  total: ((i * 7919) % 90000) / 100 + 25,
  status: i % 5 === 0 ? "open" : i % 3 ? "sent" : "invoiced",
}));

export const STATUS = { open: "Open", sent: "Sent", invoiced: "Invoiced" } as const;

export const moeda = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
