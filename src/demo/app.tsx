import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  Alert,
  Badge,
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
  Spacer,
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
} from "@stackui/react";

import { CATEGORIAS, dataCurta, dataLonga, gerarLancamentos, hojeIso, moeda, type Categoria, type Lancamento } from "./data";
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
  const erroValor = tentou && !(numero > 0) ? "Type an amount" : undefined;
  const erroTitulo = tentou && !titulo.trim() ? "Type a description" : undefined;

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
      show(existente ? "Changes saved" : tipo === "expense" ? "Expense added" : "Income added");
    }, 1300);
  };

  const opcoesCategoria = (tipo === "expense" ? CATEGORIAS_GASTO : CATEGORIAS_ENTRADA).map((c) => ({ value: c, label: CATEGORIAS[c].nome, icon: ICONES_CATEGORIA[c] }));
  const titulos = { expense: "New expense", income: "New income" };

  return (
    <Sheet
      isPresented={!!alvo}
      onDismiss={onFechar}
      title={tela === "category" ? "Category" : existente ? "Edit transaction" : titulos[tipo]}
      onBack={tela === "category" ? () => setTela("form") : undefined}
      interactiveDismissDisabled={estado !== "idle"}
    >
      {tela === "category" ? (
        <ListPicker
          label="Category"
          options={opcoesCategoria}
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
            label="Type"
            options={[
              { value: "expense", label: "Expense" },
              { value: "income", label: "Income" },
            ]}
          />
          <Section>
            <TextField label="Amount" inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} error={erroValor} accessory={<Text color="secondary">USD</Text>} />
            <TextField label="Description" value={titulo} onChange={(e) => setTitulo(e.target.value)} error={erroTitulo} />
            <PickerRow label="Category" value={CATEGORIAS[categoria].nome} onClick={() => setTela("category")} />
            <Row title="Date" accessory={<DatePicker value={data} onChange={setData} max={hojeIso()} locale="en-US" />} />
            <TextEditor label="Note" rows={2} value={nota} onChange={(e) => setNota(e.target.value)} />
          </Section>
          <Button size="large" state={estado} onClick={gravar} loadingLabel="Saving…" doneLabel="Saved">
            Save
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

const menuNovo = (editar: Loja["editar"]) => <Menu label="Add" icon={MAIS} prominent items={[{ label: "New expense", icon: MOEDA, onPress: () => editar("expense") }, { label: "New income", icon: CARTAO, onPress: () => editar("income") }]} />;

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
          <VStack spacing={4} alignment="leading">
            <Text font="subheadline" color="secondary">
              Balance
            </Text>
            <Text font="largeTitle" as="p">
              {moeda(saldo)}
            </Text>
            <HStack spacing={8} style={{ marginTop: 8 }}>
              <Badge tone="success">In {moeda(entrou)}</Badge>
              <Badge tone="danger">Out {moeda(saiu)}</Badge>
              <Spacer />
            </HStack>
          </VStack>
        </Card>
        <Section header="Recent" headerAccessory={<a href="#/activity" style={{ color: "var(--st-tint)", fontSize: 15, textDecoration: "none" }}>See all</a>}>
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
        title="Activity"
        trailing={
          <>
            <ToolbarButton label="Filter" icon={FILTRO} dot={filtro !== "all"} onClick={() => setFiltrando(true)} />
            {menuNovo(editar)}
          </>
        }
      />
      <SearchField sticky value={busca} onChange={setBusca} label="Search transactions" />
      <List>
        <Section header={`${visiveis.length.toLocaleString("en-US")} transactions`} plain>
          <LazyList items={visiveis} id={(l) => l.id} estimatedRowHeight={64} render={(l) => <LinhaLancamento l={l} />} />
        </Section>
      </List>
      <OptionsSheet
        isPresented={filtrando}
        onDismiss={() => setFiltrando(false)}
        title="Show"
        selection={filtro}
        onChange={setFiltro}
        options={[
          { value: "all", label: "All transactions" },
          { value: "expense", label: "Expenses" },
          { value: "income", label: "Income" },
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
        <NavigationBar title="Transaction" backHref="#/activity" />
      </>
    );
  const confirmarApagar = () => {
    location.hash = "#/activity";
    window.setTimeout(() => apagar(l.id), 350);
    show("Transaction deleted");
  };
  return (
    <>
      <NavigationBar
        title={l.titulo}
        displayMode="inline"
        backHref="#/activity"
        trailing={<Menu label="More" icon={RETICENCIAS} items={[{ label: "Edit", icon: LAPIS, onPress: () => editar(l) }, { label: "Delete", icon: LIXO, destructive: true, onPress: () => setApagando(true) }]} />}
      />
      <List>
        <VStack spacing={4} style={{ padding: "8px 0 4px", textAlign: "center", alignItems: "center" }}>
          <Text font="largeTitle" as="p" style={l.valor > 0 ? { color: "var(--st-success)" } : undefined}>
            {moeda(l.valor, true)}
          </Text>
          <Text color="secondary">{l.titulo}</Text>
        </VStack>
        <Section>
          <Row icon={ICONES_CATEGORIA[l.categoria]} iconColor={CATEGORIAS[l.categoria].cor} title="Category" value={CATEGORIAS[l.categoria].nome} />
          <Row title="Date" value={dataLonga(l.data)} />
          <Row title="Account" value="Everyday ·· 4821" />
          {l.nota && <Row title="Note" subtitle={l.nota} />}
        </Section>
        <Section>
          <Row title="Edit" centered onClick={() => editar(l)} />
          <Row title="Delete transaction" centered destructive onClick={() => setApagando(true)} />
        </Section>
      </List>
      <Alert isPresented={apagando} onDismiss={() => setApagando(false)} title="Delete this transaction?" message="It is removed from your history and your balance." actions={[{ label: "Cancel", role: "cancel" }, { label: "Delete", role: "destructive", onPress: confirmarApagar }]} />
    </>
  );
}

export function Ajustes({ voltar }: { voltar?: string }) {
  const [faceId, setFaceId] = useState(true);
  const [avisos, setAvisos] = useState(true);
  return (
    <>
      <NavigationBar title="Settings" />
      <List>
        <Section header="Security">
          <Row icon={ROSTO} iconColor="var(--st-green)" title="Face ID" accessory={<Toggle isOn={faceId} onChange={setFaceId} label="Face ID" />} />
          <Row icon={SINO} iconColor="var(--st-red)" title="Notifications" accessory={<Toggle isOn={avisos} onChange={setAvisos} label="Notifications" />} />
        </Section>
        <Section header="Accounts" footer="Balances refresh every time you open the app.">
          <Row icon={CARTAO} iconColor="var(--st-blue)" title="Everyday" subtitle="Checking ·· 4821" value="$12,480" href={`#${voltar ?? "/settings"}/everyday`} />
          <Row icon={MOEDA} iconColor="var(--st-indigo)" title="Savings" subtitle="High yield ·· 0937" value="$31,200" href={`#${voltar ?? "/settings"}/savings`} />
        </Section>
      </List>
    </>
  );
}

export function Conta({ nome, voltar }: { nome: string; voltar: string }) {
  return (
    <>
      <NavigationBar title={nome === "savings" ? "Savings" : "Everyday"} backHref={`#${voltar}`} />
      <List>
        <Section header="Details">
          <Row title="Account number" value={nome === "savings" ? "·· 0937" : "·· 4821"} />
          <Row title="Interest" value={nome === "savings" ? "4.1% APY" : "0.1% APY"} />
          <Row title="Statements" href={`#${voltar}/${nome}`} />
        </Section>
        <Section header="Cards">
          <Row icon={CARTAO} iconColor="var(--st-gray)" title="Debit card" subtitle="Expires 08/29" />
        </Section>
      </List>
    </>
  );
}

const ABAS = [
  { id: "home", label: "Home", icon: CASA, href: "#/home" },
  { id: "activity", label: "Activity", icon: LISTA, href: "#/activity" },
  { id: "settings", label: "Settings", icon: ENGRENAGEM, href: "#/settings" },
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
      <TabBar items={ABAS} selection={aba} hidden={caminho.split("/").filter(Boolean).length > 1} />
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
