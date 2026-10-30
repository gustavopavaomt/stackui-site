import { useEffect, useMemo, useState } from "react";

import {
  Avatar,
  Badge,
  ConfirmationSheet,
  LazyList,
  List,
  Menu,
  NavigationBar,
  NavigationStack,
  OptionsSheet,
  Row,
  SearchField,
  Section,
  TabBar,
  Timeline,
  Toggle,
  ToolbarButton,
  normalizeSearch,
  useToast,
  type ButtonState,
} from "@stackui/react";

import { CIDADES, moeda, PEDIDOS, STATUS } from "./data";
import { COPIAR, ENGRENAGEM, ESCUDO, FILTRO, LIXO, LUA, MAIS, PASTA, PESSOAS, RETICENCIAS, SINO, WIFI } from "./icons";

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

function Pedidos() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<"all" | "open" | "sent" | "invoiced">("all");
  const [filtrando, setFiltrando] = useState(false);
  const { show } = useToast();
  const visiveis = useMemo(() => {
    const t = normalizeSearch(busca);
    return PEDIDOS.filter((p) => (filtro === "all" || p.status === filtro) && (!t || normalizeSearch(`${p.cliente} ${p.id} ${p.cidade}`).includes(t)));
  }, [busca, filtro]);
  return (
    <>
      <NavigationBar
        title="Orders"
        trailing={
          <>
            <ToolbarButton label="Filter" icon={FILTRO} dot={filtro !== "all"} onClick={() => setFiltrando(true)} />
            <Menu label="Add" icon={MAIS} prominent items={[{ label: "New order", icon: MAIS, onPress: () => show("New order started") }, { label: "New quote", icon: COPIAR, onPress: () => show("New quote started") }]} />
          </>
        }
      />
      <SearchField sticky value={busca} onChange={setBusca} label="Search orders" />
      <List>
        <Section header={`${visiveis.length.toLocaleString("en-US")} orders`} plain>
          <LazyList
            items={visiveis}
            id={(p) => p.id}
            estimatedRowHeight={64}
            render={(p) => <Row leading={<Avatar name={p.cliente} />} title={p.cliente} subtitle={`#${p.id} · ${STATUS[p.status]}`} value={moeda(p.total)} href={`#/orders/${p.id}`} lineLimit={1} />}
          />
        </Section>
      </List>
      <OptionsSheet
        isPresented={filtrando}
        onDismiss={() => setFiltrando(false)}
        title="Show"
        selection={filtro}
        onChange={setFiltro}
        options={[
          { value: "all", label: "All orders" },
          { value: "open", label: "Open", description: "Still on this phone" },
          { value: "sent", label: "Sent", description: "With the company" },
          { value: "invoiced", label: "Invoiced" },
        ]}
      />
    </>
  );
}

function Pedido({ id }: { id: string }) {
  const p = PEDIDOS.find((x) => x.id === id) ?? PEDIDOS[0];
  const { show } = useToast();
  const [confirmando, setConfirmando] = useState(false);
  const [estado, setEstado] = useState<ButtonState>("idle");
  const enviar = () => {
    setEstado("loading");
    window.setTimeout(() => setEstado("done"), 1100);
    window.setTimeout(() => {
      setConfirmando(false);
      setEstado("idle");
      const t = show("Sending order…", "progress");
      window.setTimeout(() => t.update("Received by the company", "success"), 1600);
    }, 2000);
  };
  return (
    <>
      <NavigationBar
        title={`Order ${p.id}`}
        backHref="#/orders"
        trailing={<Menu label="More" icon={RETICENCIAS} items={[{ label: "Duplicate", icon: COPIAR, onPress: () => show("Order duplicated") }, { label: "Delete", icon: LIXO, destructive: true, onPress: () => show("Order deleted", "error") }]} />}
      />
      <List>
        <Section>
          <Row leading={<Avatar name={p.cliente} />} title={p.cliente} subtitle={p.cidade} />
          <Row title="Status" accessory={<Badge tone={p.status === "open" ? "warning" : "success"}>{STATUS[p.status]}</Badge>} />
          <Row title="Total" value={moeda(p.total)} />
        </Section>
        <Section header="Progress">
          <Timeline
            steps={[
              { title: "Saved on the phone", detail: "Today, 9:12", state: "done" },
              { title: "Sent", detail: p.status === "open" ? "Goes up when there is signal" : "Today, 9:13", state: p.status === "open" ? "current" : "done" },
              { title: "Received by the company", state: p.status === "open" ? "upcoming" : p.status === "sent" ? "current" : "done" },
              { title: "Invoiced", state: p.status === "invoiced" ? "done" : "upcoming" },
            ]}
          />
        </Section>
        <Section>
          <Row title="Send order" centered onClick={() => setConfirmando(true)} />
        </Section>
      </List>
      <ConfirmationSheet
        isPresented={confirmando}
        onDismiss={() => setConfirmando(false)}
        onConfirm={enviar}
        state={estado}
        title="Send order"
        description="Check the order before it goes to the company."
        items={[
          { label: "Client", value: p.cliente },
          { label: "City", value: p.cidade },
          { label: "Total", value: moeda(p.total) },
        ]}
        confirmLabel="Send"
        loadingLabel="Sending…"
        doneLabel="Sent"
      />
    </>
  );
}

function Clientes() {
  const [busca, setBusca] = useState("");
  const nomes = useMemo(() => [...new Set(PEDIDOS.slice(0, 12).map((p) => p.cliente))], []);
  const visiveis = nomes.filter((n) => normalizeSearch(n).includes(normalizeSearch(busca)));
  return (
    <>
      <NavigationBar title="Clients" />
      <SearchField sticky value={busca} onChange={setBusca} label="Search clients" />
      <List>
        <Section header="Portfolio">
          {visiveis.map((n, i) => (
            <Row key={n} leading={<Avatar name={n} />} title={n} subtitle={CIDADES[(i * 5) % CIDADES.length]} href="#/clients" lineLimit={1} />
          ))}
        </Section>
      </List>
    </>
  );
}

function Ajustes() {
  const [avisos, setAvisos] = useState(true);
  const [foco, setFoco] = useState(false);
  return (
    <>
      <NavigationBar title="Settings" />
      <List>
        <Section header="Connections">
          <Row icon={WIFI} iconColor="var(--st-blue)" title="Wi-Fi" value="Office" href="#/settings/wifi" />
          <Row icon={SINO} iconColor="var(--st-red)" title="Notifications" accessory={<Toggle isOn={avisos} onChange={setAvisos} label="Notifications" />} />
          <Row icon={LUA} iconColor="var(--st-indigo)" title="Focus" accessory={<Toggle isOn={foco} onChange={setFoco} label="Focus" />} />
        </Section>
        <Section header="Privacy" footer="Your data stays on this device until you choose to share it.">
          <Row icon={ESCUDO} iconColor="var(--st-gray)" title="Privacy & Security" subtitle="Location, camera and microphone" href="#/settings/privacy" />
        </Section>
      </List>
    </>
  );
}

function Detalhe({ titulo, voltar }: { titulo: string; voltar: string }) {
  return (
    <>
      <NavigationBar title={titulo} backHref={`#${voltar}`} />
      <List>
        {[1, 2, 3].map((s) => (
          <Section key={s} header={`Group ${s}`}>
            {[1, 2, 3, 4].map((i) => (
              <Row key={i} title={`Option ${i}`} value={i % 2 ? "On" : "Off"} />
            ))}
          </Section>
        ))}
      </List>
    </>
  );
}

const ABAS = [
  { id: "orders", label: "Orders", icon: PASTA, href: "#/orders", badge: 3 },
  { id: "clients", label: "Clients", icon: PESSOAS, href: "#/clients" },
  { id: "settings", label: "Settings", icon: ENGRENAGEM, href: "#/settings" },
];

function tela(caminho: string) {
  const [, aba, detalhe] = caminho.split("/");
  if (aba === "orders") return detalhe ? <Pedido id={detalhe} /> : <Pedidos />;
  if (aba === "clients") return <Clientes />;
  if (detalhe) return <Detalhe titulo={detalhe === "wifi" ? "Wi-Fi" : "Privacy & Security"} voltar="/settings" />;
  return <Ajustes />;
}

/** The whole app: tabs, a pushed screen, sheets, a menu, toasts and a 20,000-row list. */
export function DemoApp() {
  const caminho = useHash("/orders");
  const aba = caminho.split("/")[1] || "orders";
  return (
    <>
      <NavigationStack location={caminho} render={(l) => <div style={{ paddingBottom: 112 }}>{tela(l)}</div>} />
      <TabBar items={ABAS} selection={aba} hidden={caminho.split("/").filter(Boolean).length > 1} />
    </>
  );
}

export function DemoNavigation() {
  const caminho = useHash("/settings");
  return <NavigationStack location={caminho} render={(l) => <div style={{ paddingBottom: 32 }}>{l.split("/")[2] ? <Detalhe titulo={l.split("/")[2] === "wifi" ? "Wi-Fi" : "Privacy & Security"} voltar="/settings" /> : <Ajustes />}</div>} />;
}

/** Just the orders: 20,000 rows, search, filter and the order screen. */
export function DemoLists() {
  const caminho = useHash("/orders");
  return <NavigationStack location={caminho} render={(l) => <div style={{ paddingBottom: 32 }}>{l.split("/")[2] ? <Pedido id={l.split("/")[2]} /> : <Pedidos />}</div>} />;
}
