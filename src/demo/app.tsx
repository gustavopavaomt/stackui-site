import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  Alert,
  Button,
  Card,
  DatePicker,
  HStack,
  LazyList,
  List,
  ListPicker,
  Menu,
  NavigationBar,
  NavigationStack,
  OptionsSheet,
  Picker,
  PickerRow,
  Row,
  SearchField,
  Section,
  Sheet,
  TabBar,
  Text,
  TextEditor,
  TextField,
  Toggle,
  ToolbarButton,
  VStack,
  normalizeSearch,
  useToast,
  type ButtonState,
} from "stackui";

import { CATEGORIAS, dataCurta, dataLonga, gerarLancamentos, hojeIso, moeda, type Categoria, type Lancamento } from "./data";
import { L, LOCALE, PT } from "./lang";
import { CARTAO, CASA, ENGRENAGEM, FILTRO, ICONES_CATEGORIA, LAPIS, LISTA, LIXO, MAIS, MOEDA, RETICENCIAS, ROSTO, SINO } from "./icons";

/** A tiny hash router: the library works with any router. */
export function useHash(inicial: string) {
  const ler = () => location.hash.slice(1) || inicial;
  const [caminho, setCaminho] = useState(ler);
  useEffect(() => {
    const mudou = () => setCaminho(ler());
    window.addEventListener("hashchange", mudou);
    return () => window.removeEventListener("hashchange", mudou);
  });
  return caminho;
}

/* ---- The store: create, read, update and delete transactions (in memory) ---- */

type Loja = {
  lancamentos: Lancamento[];
  salvar: (l: Lancamento) => void;
  apagar: (id: string) => void;
  /** Opens the form: empty for a new one, filled to edit. */
  editar: (l: Lancamento | "expense" | "income") => void;
};
const Ctx = createContext<Loja | null>(null);
const useLoja = () => useContext(Ctx)!;

let proximoId = 100000;

const LISTA_PT = { searchPlaceholder: "Buscar", emptyText: "Nada com esse nome", countText: (n: number, t: number) => (n === t ? `${t} itens` : `${n} de ${t}`) };

function ProvedorLoja({ children }: { children: ReactNode }) {
  const [lancamentos, setLancamentos] = useState(gerarLancamentos);
  const [formulario, setFormulario] = useState<Lancamento | "expense" | "income" | null>(null);
  const loja = useMemo<Loja>(
    () => ({
      lancamentos,
      salvar: (l) => setLancamentos((ls) => (ls.some((x) => x.id === l.id) ? ls.map((x) => (x.id === l.id ? l : x)) : [l, ...ls])),
      apagar: (id) => setLancamentos((ls) => ls.filter((x) => x.id !== id)),
      editar: setFormulario,
    }),
    [lancamentos],
  );
  return (
    <Ctx.Provider value={loja}>
      {children}
      <Formulario alvo={formulario} onFechar={() => setFormulario(null)} />
    </Ctx.Provider>
  );
}

const CATEGORIAS_GASTO: Categoria[] = ["groceries", "dining", "transport", "shopping", "bills", "health", "travel", "fun"];
const CATEGORIAS_ENTRADA: Categoria[] = ["salary", "transfer"];

/** The form sheet (create and update). Choosing a category is an inner screen of the same sheet. */
function Formulario({ alvo, onFechar }: { alvo: Lancamento | "expense" | "income" | null; onFechar: () => void }) {
  const { salvar } = useLoja();
  const { show } = useToast();
  const existente = typeof alvo === "object" ? alvo : null;
  const [tipo, setTipo] = useState<"expense" | "income">("expense");
  const [valor, setValor] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState<Categoria>("groceries");
  const [data, setData] = useState(hojeIso());
  const [nota, setNota] = useState("");
  const [tela, setTela] = useState<"form" | "category">("form");
  const [estado, setEstado] = useState<ButtonState>("idle");
  const [tentou, setTentou] = useState(false);

  // Every time it opens, start from the transaction (or empty).
  const [abertoPara, setAbertoPara] = useState(alvo);
  if (abertoPara !== alvo) {
    setAbertoPara(alvo);
    if (alvo) {
      const t = existente ? (existente.valor < 0 ? "expense" : "income") : (alvo as "expense" | "income");
      setTipo(t);
      setValor(existente ? Math.abs(existente.valor).toFixed(2) : "");
      setTitulo(existente?.titulo ?? "");
      setCategoria(existente?.categoria ?? (t === "expense" ? "groceries" : "salary"));
      setData(existente?.data ?? hojeIso());
      setNota(existente?.nota ?? "");
      setTela("form");
      setEstado("idle");
      setTentou(false);
    }
  }

  const numero = Number(valor.replace(",", "."));
  const erroValor = tentou && !(numero > 0) ? L("Type an amount", "Digite um valor") : undefined;
  const erroTitulo = tentou && !titulo.trim() ? L("Type a description", "Digite uma descrição") : undefined;

  const gravar = () => {
    setTentou(true);
    if (!(numero > 0) || !titulo.trim()) return;
    setEstado("loading");
    window.setTimeout(() => {
      salvar({ id: existente?.id ?? String(proximoId++), titulo: titulo.trim(), categoria, valor: tipo === "expense" ? -numero : numero, data, nota: nota.trim() || undefined });
      setEstado("done");
    }, 600);
    window.setTimeout(() => {
      onFechar();
      show(existente ? L("Changes saved", "Alterações salvas") : tipo === "expense" ? L("Expense added", "Despesa lançada") : L("Income added", "Receita lançada"));
    }, 1300);
  };

  const opcoesCategoria = (tipo === "expense" ? CATEGORIAS_GASTO : CATEGORIAS_ENTRADA).map((c) => ({ value: c, label: CATEGORIAS[c].nome, icon: ICONES_CATEGORIA[c] }));
  const titulos = { expense: L("New expense", "Nova despesa"), income: L("New income", "Nova receita") };

  return (
    <Sheet
      isPresented={!!alvo}
      onDismiss={onFechar}
      title={tela === "category" ? L("Category", "Categoria") : existente ? L("Edit transaction", "Editar lançamento") : titulos[tipo]}
      closeLabel={L("Close", "Fechar")}
      backLabel={L("Back", "Voltar")}
      onBack={tela === "category" ? () => setTela("form") : undefined}
      interactiveDismissDisabled={estado !== "idle"}
    >
      {tela === "category" ? (
        <ListPicker
          label={L("Category", "Categoria")}
          options={opcoesCategoria}
          {...(PT ? LISTA_PT : {})}
          selection={categoria}
          onChange={(c) => {
            setCategoria(c);
            setTela("form");
          }}
        />
      ) : (
        <List>
          <Picker
            selection={tipo}
            onChange={(t) => {
              setTipo(t);
              setCategoria(t === "expense" ? "groceries" : "salary");
            }}
            label={L("Type", "Tipo")}
            options={[
              { value: "expense", label: L("Expense", "Despesa") },
              { value: "income", label: L("Income", "Receita") },
            ]}
          />
          <Section>
            <TextField label={L("Amount", "Valor")} inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} error={erroValor} accessory={<Text color="secondary">{PT ? "BRL" : "USD"}</Text>} />
            <TextField label={L("Description", "Descrição")} value={titulo} onChange={(e) => setTitulo(e.target.value)} error={erroTitulo} />
            <PickerRow label={L("Category", "Categoria")} value={CATEGORIAS[categoria].nome} onClick={() => setTela("category")} />
            <Row title={L("Date", "Data")} accessory={<DatePicker value={data} onChange={setData} max={hojeIso()} locale={LOCALE} {...(PT ? { title: "Data", placeholder: "Escolher", shortcuts: [{ label: "Hoje", value: hojeIso() }] } : {})} />} />
            <TextEditor label={L("Note", "Observação")} rows={2} value={nota} onChange={(e) => setNota(e.target.value)} />
          </Section>
          <Button size="large" state={estado} onClick={gravar} loadingLabel={L("Saving…", "Salvando…")} doneLabel={L("Saved", "Salvo")}>
            {L("Save", "Salvar")}
          </Button>
        </List>
      )}
    </Sheet>
  );
}

/* ---- Screens ---- */

function LinhaLancamento({ l }: { l: Lancamento }) {
  return (
    <Row
      icon={ICONES_CATEGORIA[l.categoria]}
      iconColor={CATEGORIAS[l.categoria].cor}
      title={l.titulo}
      subtitle={`${CATEGORIAS[l.categoria].nome} · ${dataCurta(l.data)}`}
      value={<span style={l.valor > 0 ? { color: "var(--st-success)" } : undefined}>{moeda(l.valor, true)}</span>}
      href={`#/activity/${l.id}`}
      lineLimit={1}
    />
  );
}

const menuNovo = (editar: Loja["editar"]) => <Menu label={L("Add", "Adicionar")} icon={MAIS} prominent items={[{ label: L("New expense", "Nova despesa"), icon: MOEDA, onPress: () => editar("expense") }, { label: L("New income", "Nova receita"), icon: CARTAO, onPress: () => editar("income") }]} />;

function Inicio() {
  const { lancamentos, editar } = useLoja();
  const mes = hojeIso().slice(0, 7);
  const { saldo, entrou, saiu } = useMemo(() => {
    let entrou = 0;
    let saiu = 0;
    for (const l of lancamentos) {
      if (!l.data.startsWith(mes)) continue;
      if (l.valor > 0) entrou += l.valor;
      else saiu -= l.valor;
    }
    return { saldo: 12480.5 + entrou - saiu, entrou, saiu };
  }, [lancamentos, mes]);
  return (
    <>
      <NavigationBar title="Wallet" trailing={menuNovo(editar)} />
      <List>
        <Card>
          <Text font="subheadline" color="secondary">
            {L("Total balance", "Saldo total")}
          </Text>
          <Text font="largeTitle" as="p" style={{ marginTop: 2 }}>
            {moeda(saldo)}
          </Text>
          <HStack alignment="leading" style={{ marginTop: 16, paddingTop: 14, borderTop: "0.5px solid var(--st-separator)" }}>
            <VStack spacing={2} alignment="leading" style={{ flex: 1 }}>
              <Text font="footnote" color="secondary">
                {L("Income this month", "Entrou no mês")}
              </Text>
              <Text font="headline" style={{ color: "var(--st-success)" }}>
                {moeda(entrou, true)}
              </Text>
            </VStack>
            <VStack spacing={2} alignment="leading" style={{ flex: 1 }}>
              <Text font="footnote" color="secondary">
                {L("Spent this month", "Saiu no mês")}
              </Text>
              <Text font="headline">{moeda(-saiu)}</Text>
            </VStack>
          </HStack>
        </Card>
        <Section header={L("Recent", "Recentes")} headerAccessory={<a href="#/activity" style={{ color: "var(--st-tint)", fontSize: 15, textDecoration: "none" }}>{L("See all", "Ver tudo")}</a>}>
          {lancamentos.slice(0, 6).map((l) => (
            <LinhaLancamento key={l.id} l={l} />
          ))}
        </Section>
      </List>
    </>
  );
}

function Atividade() {
  const { lancamentos, editar } = useLoja();
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<"all" | "expense" | "income">("all");
  const [filtrando, setFiltrando] = useState(false);
  const visiveis = useMemo(() => {
    const t = normalizeSearch(busca);
    return lancamentos.filter((l) => (filtro === "all" || (filtro === "income") === l.valor > 0) && (!t || normalizeSearch(`${l.titulo} ${CATEGORIAS[l.categoria].nome}`).includes(t)));
  }, [lancamentos, busca, filtro]);
  return (
    <>
      <NavigationBar
        title={L("Activity", "Atividade")}
        trailing={
          <>
            <ToolbarButton label={L("Filter", "Filtrar")} icon={FILTRO} dot={filtro !== "all"} onClick={() => setFiltrando(true)} />
            {menuNovo(editar)}
          </>
        }
      />
      <SearchField sticky value={busca} onChange={setBusca} label={L("Search transactions", "Buscar lançamentos")} placeholder={L("Search", "Buscar")} clearLabel={L("Clear search", "Limpar busca")} />
      <List>
        <Section header={`${visiveis.length.toLocaleString(LOCALE)} ${L("transactions", "lançamentos")}`} plain>
          <LazyList items={visiveis} id={(l) => l.id} estimatedRowHeight={64} render={(l) => <LinhaLancamento l={l} />} />
        </Section>
      </List>
      <OptionsSheet
        isPresented={filtrando}
        onDismiss={() => setFiltrando(false)}
        title={L("Show", "Mostrar")}
        selection={filtro}
        onChange={setFiltro}
        options={[
          { value: "all", label: L("All transactions", "Todos os lançamentos") },
          { value: "expense", label: L("Expenses", "Despesas") },
          { value: "income", label: L("Income", "Receitas") },
        ]}
      />
    </>
  );
}

function Detalhe({ id }: { id: string }) {
  const { lancamentos, apagar, editar } = useLoja();
  const { show } = useToast();
  const [apagando, setApagando] = useState(false);
  const l = lancamentos.find((x) => x.id === id);
  if (!l)
    return (
      <>
        <NavigationBar title={L("Transaction", "Lançamento")} backHref="#/activity" backLabel={L("Back", "Voltar")} />
      </>
    );
  const confirmarApagar = () => {
    location.hash = "#/activity";
    window.setTimeout(() => apagar(l.id), 350);
    show(L("Transaction deleted", "Lançamento apagado"));
  };
  return (
    <>
      <NavigationBar
        title={l.titulo}
        displayMode="inline"
        backHref="#/activity"
        backLabel={L("Back", "Voltar")}
        trailing={<Menu label={L("More", "Mais")} icon={RETICENCIAS} items={[{ label: L("Edit", "Editar"), icon: LAPIS, onPress: () => editar(l) }, { label: L("Delete", "Apagar"), icon: LIXO, destructive: true, onPress: () => setApagando(true) }]} />}
      />
      <List>
        <VStack spacing={4} style={{ padding: "8px 0 4px", textAlign: "center", alignItems: "center" }}>
          <Text font="largeTitle" as="p" style={l.valor > 0 ? { color: "var(--st-success)" } : undefined}>
            {moeda(l.valor, true)}
          </Text>
          <Text color="secondary">{l.titulo}</Text>
        </VStack>
        <Section>
          <Row icon={ICONES_CATEGORIA[l.categoria]} iconColor={CATEGORIAS[l.categoria].cor} title={L("Category", "Categoria")} value={CATEGORIAS[l.categoria].nome} />
          <Row title={L("Date", "Data")} value={dataLonga(l.data)} />
          <Row title={L("Account", "Conta")} value={L("Everyday ·· 4821", "Corrente ·· 4821")} />
          {l.nota && <Row title={L("Note", "Observação")} subtitle={l.nota} />}
        </Section>
        <Section>
          <Row title={L("Edit", "Editar")} centered onClick={() => editar(l)} />
          <Row title={L("Delete transaction", "Apagar lançamento")} centered destructive onClick={() => setApagando(true)} />
        </Section>
      </List>
      <Alert isPresented={apagando} onDismiss={() => setApagando(false)} title={L("Delete this transaction?", "Apagar este lançamento?")} message={L("It is removed from your history and your balance.", "Ele sai do histórico e do saldo.")} actions={[{ label: L("Cancel", "Cancelar"), role: "cancel" }, { label: L("Delete", "Apagar"), role: "destructive", onPress: confirmarApagar }]} />
    </>
  );
}

export function Ajustes({ voltar }: { voltar?: string }) {
  const [faceId, setFaceId] = useState(true);
  const [avisos, setAvisos] = useState(true);
  return (
    <>
      <NavigationBar title={L("Settings", "Ajustes")} />
      <List>
        <Section header={L("Security", "Segurança")}>
          <Row icon={ROSTO} iconColor="var(--st-green)" title="Face ID" accessory={<Toggle isOn={faceId} onChange={setFaceId} label="Face ID" />} />
          <Row icon={SINO} iconColor="var(--st-red)" title={L("Notifications", "Notificações")} accessory={<Toggle isOn={avisos} onChange={setAvisos} label={L("Notifications", "Notificações")} />} />
        </Section>
        <Section header={L("Accounts", "Contas")} footer={L("Balances refresh every time you open the app.", "Os saldos atualizam toda vez que você abre o app.")}>
          <Row icon={CARTAO} iconColor="var(--st-blue)" title={L("Everyday", "Corrente")} subtitle={L("Checking ·· 4821", "Conta corrente ·· 4821")} value={L("$12,480", "R$ 12.480")} href={`#${voltar ?? "/settings"}/everyday`} />
          <Row icon={MOEDA} iconColor="var(--st-indigo)" title={L("Savings", "Poupança")} subtitle={L("High yield ·· 0937", "Rendimento ·· 0937")} value={L("$31,200", "R$ 31.200")} href={`#${voltar ?? "/settings"}/savings`} />
        </Section>
      </List>
    </>
  );
}

export function Conta({ nome, voltar }: { nome: string; voltar: string }) {
  return (
    <>
      <NavigationBar title={nome === "savings" ? L("Savings", "Poupança") : L("Everyday", "Corrente")} backHref={`#${voltar}`} backLabel={L("Back", "Voltar")} />
      <List>
        <Section header={L("Details", "Detalhes")}>
          <Row title={L("Account number", "Número da conta")} value={nome === "savings" ? "·· 0937" : "·· 4821"} />
          <Row title={L("Interest", "Rendimento")} value={nome === "savings" ? L("4.1% APY", "100% do CDI") : L("0.1% APY", "0,1% a.a.")} />
          <Row title={L("Statements", "Extratos")} href={`#${voltar}/${nome}`} />
        </Section>
        <Section header={L("Cards", "Cartões")}>
          <Row icon={CARTAO} iconColor="var(--st-gray)" title={L("Debit card", "Cartão de débito")} subtitle={L("Expires 08/29", "Vence em 08/29")} />
        </Section>
      </List>
    </>
  );
}

const ABAS = [
  { id: "home", label: L("Home", "Início"), icon: CASA, href: "#/home" },
  { id: "activity", label: L("Activity", "Atividade"), icon: LISTA, href: "#/activity" },
  { id: "settings", label: L("Settings", "Ajustes"), icon: ENGRENAGEM, href: "#/settings" },
];

function tela(caminho: string) {
  const [, aba, detalhe] = caminho.split("/");
  if (aba === "activity") return detalhe ? <Detalhe id={detalhe} /> : <Atividade />;
  if (aba === "settings") return detalhe ? <Conta nome={detalhe} voltar="/settings" /> : <Ajustes />;
  return <Inicio />;
}

/** The whole app: tabs, pushed screens, a create/edit form, delete with an alert, toasts and 20,000 rows. */
export function DemoApp() {
  const caminho = useHash("/home");
  const aba = caminho.split("/")[1] || "home";
  return (
    <ProvedorLoja>
      <NavigationStack location={caminho} render={(l) => <div style={{ paddingBottom: 112 }}>{tela(l)}</div>} />
      <TabBar items={ABAS} label={L("Main", "Principal")} selection={aba} hidden={caminho.split("/").filter(Boolean).length > 1} />
    </ProvedorLoja>
  );
}

/** Just the activity: 20,000 transactions, search, filter, the detail and the form. */
export function DemoLists() {
  const caminho = useHash("/activity");
  return (
    <ProvedorLoja>
      <NavigationStack location={caminho} render={(l) => <div style={{ paddingBottom: 32 }}>{l.split("/")[2] ? <Detalhe id={l.split("/")[2]} /> : <Atividade />}</div>} />
    </ProvedorLoja>
  );
}

export function DemoNavigation() {
  const caminho = useHash("/settings");
  return <NavigationStack location={caminho} render={(l) => <div style={{ paddingBottom: 32 }}>{l.split("/")[2] ? <Conta nome={l.split("/")[2]} voltar="/settings" /> : <Ajustes />}</div>} />;
}
