import { useEffect, useState, type ReactNode } from "react";

import {
  Alert,
  AsyncImage,
  Avatar,
  Badge,
  Button,
  Card,
  ConfirmationSheet,
  ContentUnavailableView,
  DatePicker,
  HStack,
  InstallGate,
  LazyList,
  List,
  ListPicker,
  Menu,
  NavigationBar,
  NavigationStack,
  OptionsSheet,
  Picker,
  PickerRow,
  ProgressSteps,
  ProgressView,
  Redacted,
  Row,
  SearchField,
  Section,
  Sheet,
  SkeletonList,
  Spacer,
  Stepper,
  TabBar,
  Text,
  TextField,
  Timeline,
  TimePicker,
  Toggle,
  ToolbarButton,
  VStack,
  normalizeSearch,
  useToast,
  type ButtonState,
} from "@stackui/react";
import { BarcodeScanner } from "@stackui/react/barcode";

import { CASA, COMPARTILHAR, COPIAR, ENGRENAGEM, LAPIS, LISTA, LIXO, MAIS, RETICENCIAS, ROSTO, SINO, CARTAO } from "./icons";
import { L, LOCALE, PT } from "./lang";

/*
 * The live examples of the docs: one per component, loaded as demo.html?c=<name>&lang=<en|pt>. Each one is the code
 * shown next to it on the docs page, made runnable. In Portuguese they also pass the library its translated texts.
 */

function useHash(inicial: string) {
  const ler = () => location.hash.slice(1) || inicial;
  const [caminho, setCaminho] = useState(ler);
  useEffect(() => {
    const mudou = () => setCaminho(ler());
    window.addEventListener("hashchange", mudou);
    return () => window.removeEventListener("hashchange", mudou);
  });
  return caminho;
}

const Pad = ({ children }: { children: ReactNode }) => (
  <VStack spacing={12} style={{ padding: 16 }}>
    {children}
  </VStack>
);

const VOLTAR = L("Back", "Voltar");

function FirstScreen() {
  const [alerts, setAlerts] = useState(true);
  return (
    <>
      <NavigationBar title={L("Settings", "Ajustes")} />
      <List>
        <Section header={L("General", "Geral")} footer={L("You can change this at any time.", "Você pode mudar isso quando quiser.")}>
          <Row title={L("Notifications", "Notificações")} accessory={<Toggle isOn={alerts} onChange={setAlerts} label={L("Notifications", "Notificações")} />} />
          <Row title={L("Language", "Idioma")} value={L("English", "Português")} href="#" />
        </Section>
      </List>
    </>
  );
}

function TextStacks() {
  return (
    <Pad>
      <VStack spacing={4} alignment="leading">
        <Text font="largeTitle">{L("Good morning", "Bom dia")}</Text>
        <Text color="secondary">{L("Here is your day.", "Este é o seu dia.")}</Text>
      </VStack>
      <HStack spacing={8}>
        <Text font="headline">{L("Balance", "Saldo")}</Text>
        <Spacer />
        <Text color="tint">{L("$1,280.00", "R$ 1.280,00")}</Text>
      </HStack>
    </Pad>
  );
}

function Pessoa({ nome }: { nome: string }) {
  return (
    <>
      <NavigationBar title={nome} backHref="#/people" backLabel={VOLTAR} />
      <List>
        <Section>
          <Row title="Email" value={`${nome.toLowerCase()}@mail.com`} />
          <Row title={L("Phone", "Telefone")} value="+1 555 0100" />
        </Section>
      </List>
    </>
  );
}

function Pessoas() {
  return (
    <>
      <NavigationBar title={L("People", "Pessoas")} />
      <List>
        <Section>
          <Row title="Ana" href="#/people/Ana" />
          <Row title="Leo" href="#/people/Leo" />
        </Section>
      </List>
    </>
  );
}

function NavigationStackDemo() {
  const location = useHash("/people");
  return <NavigationStack location={location} render={(path) => (path.split("/")[2] ? <Pessoa nome={path.split("/")[2]} /> : <Pessoas />)} />;
}

function NavigationBarDemo() {
  return (
    <>
      <NavigationBar title={L("Inbox", "Entrada")} trailing={<ToolbarButton label={L("New message", "Nova mensagem")} icon={MAIS} prominent />} />
      <List>
        <Section header={L("Scroll to see the title move into the bar", "Role para ver o título entrar na barra")}>
          {Array.from({ length: 20 }, (_, i) => (
            <Row key={i} title={`${L("Message", "Mensagem")} ${i + 1}`} subtitle={L("Tap to read", "Toque para ler")} />
          ))}
        </Section>
      </List>
    </>
  );
}

function TabBarDemo() {
  const [tab, setTab] = useState("home");
  const nomes: Record<string, string> = { home: L("Home", "Início"), activity: L("Activity", "Atividade"), settings: L("Settings", "Ajustes") };
  return (
    <>
      <Pad>
        <Text font="title2">{nomes[tab]}</Text>
        <Text color="secondary">{L("Pick a tab: the pill slides to it.", "Escolha uma aba: a pílula desliza até ela.")}</Text>
      </Pad>
      <TabBar
        selection={tab}
        onSelect={setTab}
        label={L("Main", "Principal")}
        items={[
          { id: "home", label: nomes.home, icon: CASA },
          { id: "activity", label: nomes.activity, icon: LISTA, badge: 3 },
          { id: "settings", label: nomes.settings, icon: ENGRENAGEM },
        ]}
      />
    </>
  );
}

function MenuDemo() {
  const { show } = useToast();
  return (
    <>
      <NavigationBar
        title={L("Note", "Nota")}
        trailing={
          <Menu
            label={L("More", "Mais")}
            icon={RETICENCIAS}
            items={[
              { label: L("Edit", "Editar"), icon: LAPIS, onPress: () => show(L("Edit", "Editar")) },
              { label: L("Duplicate", "Duplicar"), icon: COPIAR, onPress: () => show(L("Duplicated", "Duplicada")) },
              { label: L("Delete", "Apagar"), icon: LIXO, destructive: true, onPress: () => show(L("Deleted", "Apagada"), "error") },
            ]}
          />
        }
      />
      <Pad>
        <Text color="secondary">{L("Tap ··· in the top right corner.", "Toque em ··· no canto de cima.")}</Text>
      </Pad>
    </>
  );
}

function ListDemo() {
  const [faceId, setFaceId] = useState(true);
  return (
    <List>
      <Section header={L("Account", "Conta")} footer={L("Your data stays on this device.", "Seus dados ficam neste aparelho.")}>
        <Row icon={ROSTO} iconColor="var(--st-green)" title="Face ID" accessory={<Toggle isOn={faceId} onChange={setFaceId} label="Face ID" />} />
        <Row icon={SINO} iconColor="var(--st-red)" title={L("Notifications", "Notificações")} value={L("On", "Ligadas")} href="#" />
        <Row icon={CARTAO} iconColor="var(--st-blue)" title={L("Cards", "Cartões")} subtitle={L("2 cards", "2 cartões")} href="#" />
      </Section>
      <Section>
        <Row title={L("Sign out", "Sair")} centered onClick={() => undefined} />
      </Section>
    </List>
  );
}

const NOMES = ["Ana", "Leo", "Maya", "Noah", "Iris", "Theo", "Lia", "Omar"];
const PESSOAS = Array.from({ length: 20000 }, (_, i) => ({ id: String(i), name: `${NOMES[i % 8]} ${String.fromCharCode(65 + (i % 26))}.`, city: ["Lisboa", "Austin", "Osaka", "Lagos"][i % 4] }));

function LazyListDemo() {
  return (
    <List>
      <Section header={L("20,000 people", "20 mil pessoas")} plain>
        <LazyList items={PESSOAS} id={(p) => p.id} estimatedRowHeight={61} render={(p) => <Row leading={<Avatar name={p.name} />} title={p.name} subtitle={p.city} lineLimit={1} />} />
      </Section>
    </List>
  );
}

function CardDemo() {
  return (
    <Pad>
      <Card href="#">
        <Text font="headline">{L("Monthly goal", "Meta do mês")}</Text>
        <Text color="secondary">{L("72% reached, 8 days left", "72% alcançada, faltam 8 dias")}</Text>
      </Card>
    </Pad>
  );
}

function ButtonDemo() {
  const [state, setState] = useState<ButtonState>("idle");
  const save = () => {
    setState("loading");
    setTimeout(() => setState("done"), 1000);
    setTimeout(() => setState("idle"), 2500);
  };
  return (
    <Pad>
      <Button state={state} onClick={save} loadingLabel={L("Saving…", "Salvando…")} doneLabel={L("Saved", "Salvo")}>
        {L("Save", "Salvar")}
      </Button>
      <Button variant="bordered">{L("Bordered", "Com fundo")}</Button>
      <Button variant="plain">{L("Plain", "Simples")}</Button>
      <Button variant="destructive">{L("Delete", "Apagar")}</Button>
    </Pad>
  );
}

function ToggleDemo() {
  const [isOn, setIsOn] = useState(true);
  return (
    <List>
      <Section>
        <Row title="Wi-Fi" accessory={<Toggle isOn={isOn} onChange={setIsOn} label="Wi-Fi" />} />
      </Section>
    </List>
  );
}

function PickerDemo() {
  const [period, setPeriod] = useState<"day" | "week" | "month">("week");
  const nomes = { day: L("Day", "Dia"), week: L("Week", "Semana"), month: L("Month", "Mês") };
  return (
    <Pad>
      <Picker
        label={L("Period", "Período")}
        selection={period}
        onChange={setPeriod}
        options={[
          { value: "day", label: nomes.day },
          { value: "week", label: nomes.week },
          { value: "month", label: nomes.month },
        ]}
      />
      <Text color="secondary">{L(`Showing this ${period}.`, `Mostrando: ${nomes[period].toLowerCase()}.`)}</Text>
    </Pad>
  );
}

function StepperDemo() {
  const [guests, setGuests] = useState(2);
  return (
    <List>
      <Section>
        <Row title={L("Guests", "Convidados")} accessory={<Stepper label={L("Guests", "Convidados")} value={guests} onChange={setGuests} min={1} max={8} decrementLabel={L("Decrease", "Diminuir")} incrementLabel={L("Increase", "Aumentar")} />} />
      </Section>
    </List>
  );
}

function TextFieldDemo() {
  const [email, setEmail] = useState("");
  const invalid = email.length > 0 && !email.includes("@");
  return (
    <List>
      <Section>
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={invalid ? L("Type a valid email", "Digite um email válido") : undefined} />
        <TextField label={L("Password", "Senha")} type="password" />
      </Section>
    </List>
  );
}

const FRUTAS = PT
  ? ["Abacaxi", "Acerola", "Banana", "Caju", "Goiaba", "Jabuticaba", "Laranja", "Limão", "Manga", "Maracujá", "Melancia", "Uva"]
  : ["Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Grape", "Lemon", "Mango", "Orange", "Peach", "Pear", "Plum"];

function SearchFieldDemo() {
  const [query, setQuery] = useState("");
  const shown = FRUTAS.filter((f) => normalizeSearch(f).includes(normalizeSearch(query)));
  return (
    <>
      <SearchField value={query} onChange={setQuery} label={L("Search fruits", "Buscar frutas")} placeholder={L("Search", "Buscar")} clearLabel={L("Clear search", "Limpar busca")} sticky />
      <List>
        <Section>
          {shown.map((f) => (
            <Row key={f} title={f} />
          ))}
        </Section>
      </List>
    </>
  );
}

function BadgeDemo() {
  return (
    <Pad>
      <HStack spacing={8} style={{ flexWrap: "wrap" }}>
        <Badge>{L("Draft", "Rascunho")}</Badge>
        <Badge tone="tint">{L("New", "Novo")}</Badge>
        <Badge tone="success">{L("Paid", "Pago")}</Badge>
        <Badge tone="warning">{L("Pending", "Pendente")}</Badge>
        <Badge tone="danger">{L("Declined", "Recusado")}</Badge>
      </HStack>
    </Pad>
  );
}

/** Today and yesterday, in ISO. */
const isoHoje = (d = 0) => {
  const x = new Date();
  x.setDate(x.getDate() - d);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
};
const DATA_PT = { title: "Data", placeholder: "Escolher", previousMonthLabel: "Mês anterior", nextMonthLabel: "Próximo mês", shortcuts: [{ label: "Hoje", value: isoHoje() }, { label: "Ontem", value: isoHoje(1) }] };
const HORA_PT = { title: "Hora", nowLabel: "Agora", clearLabel: "Limpar", doneLabel: "Pronto", hourLabel: "Hora", minuteLabel: "Minuto" };

function DatePickerDemo() {
  const [date, setDate] = useState("");
  return (
    <List>
      <Section>
        <Row title={L("Due date", "Vencimento")} accessory={<DatePicker value={date} onChange={setDate} locale={LOCALE} {...(PT ? DATA_PT : {})} />} />
      </Section>
    </List>
  );
}

function TimePickerDemo() {
  const [time, setTime] = useState("");
  return (
    <List>
      <Section>
        <Row title={L("Reminder", "Lembrete")} accessory={<TimePicker value={time} onChange={setTime} {...(PT ? HORA_PT : {})} />} />
      </Section>
    </List>
  );
}

const PAISES = PT
  ? ["Alemanha", "Argentina", "Austrália", "Brasil", "Canadá", "Chile", "Espanha", "Estados Unidos", "França", "Índia", "Itália", "Japão", "México", "Portugal", "Reino Unido"]
  : ["Argentina", "Australia", "Brazil", "Canada", "Chile", "France", "Germany", "India", "Italy", "Japan", "Mexico", "Portugal", "Spain", "United Kingdom", "United States"];
const LISTA_PT = { searchPlaceholder: "Buscar", emptyText: "Nada com esse nome", countText: (n: number, total: number) => (n === total ? `${total} itens` : `${n} de ${total}`) };

function ListPickerDemo() {
  const [country, setCountry] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <>
      <List>
        <Section>
          <PickerRow label={L("Country", "País")} value={country} placeholder={L("Choose", "Escolher")} onClick={() => setOpen(true)} />
        </Section>
      </List>
      <Sheet isPresented={open} onDismiss={() => setOpen(false)} title={L("Country", "País")} closeLabel={L("Close", "Fechar")}>
        <ListPicker
          label={L("Country", "País")}
          options={PAISES.map((c) => ({ value: c, label: c }))}
          selection={country}
          onChange={(c) => {
            setCountry(c);
            setOpen(false);
          }}
          {...(PT ? LISTA_PT : {})}
        />
      </Sheet>
    </>
  );
}

function OptionsSheetDemo() {
  const [sort, setSort] = useState<"date" | "name" | "size">("date");
  const [open, setOpen] = useState(false);
  const nomes = { date: L("Date", "Data"), name: L("Name", "Nome"), size: L("Size", "Tamanho") };
  return (
    <>
      <List>
        <Section>
          <Row title={L("Sort by", "Ordenar por")} value={nomes[sort]} onClick={() => setOpen(true)} chevron />
        </Section>
      </List>
      <OptionsSheet
        isPresented={open}
        onDismiss={() => setOpen(false)}
        title={L("Sort by", "Ordenar por")}
        selection={sort}
        onChange={setSort}
        options={[
          { value: "date", label: nomes.date, description: L("Newest first", "Mais recentes primeiro") },
          { value: "name", label: nomes.name },
          { value: "size", label: nomes.size, description: L("Largest first", "Maiores primeiro") },
        ]}
      />
    </>
  );
}

function SheetDemo() {
  const [isPresented, setIsPresented] = useState(false);
  return (
    <>
      <Pad>
        <Button onClick={() => setIsPresented(true)}>{L("Share", "Compartilhar")}</Button>
      </Pad>
      <Sheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        title={L("Share", "Compartilhar")}
        icon={COMPARTILHAR}
        description={L("Drag the handle down to close.", "Arraste a alça para baixo para fechar.")}
        closeLabel={L("Close", "Fechar")}
      >
        <List>
          <Section>
            <Row title={L("Copy link", "Copiar link")} onClick={() => setIsPresented(false)} />
            <Row title={L("Send by email", "Enviar por email")} onClick={() => setIsPresented(false)} />
          </Section>
        </List>
      </Sheet>
    </>
  );
}

function ConfirmationSheetDemo() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ButtonState>("idle");
  const send = () => {
    setState("loading");
    setTimeout(() => setState("done"), 1000);
    setTimeout(() => {
      setOpen(false);
      setState("idle");
    }, 1800);
  };
  return (
    <>
      <Pad>
        <Button onClick={() => setOpen(true)}>{L("Send $250", "Enviar R$ 250")}</Button>
      </Pad>
      <ConfirmationSheet
        isPresented={open}
        onDismiss={() => setOpen(false)}
        onConfirm={send}
        state={state}
        title={L("Send money", "Enviar dinheiro")}
        items={[
          { label: L("To", "Para"), value: "Ana Souza" },
          { label: L("Amount", "Valor"), value: L("$250.00", "R$ 250,00") },
        ]}
        confirmLabel={L("Send", "Enviar")}
        loadingLabel={L("Sending…", "Enviando…")}
        doneLabel={L("Sent", "Enviado")}
        cancelLabel={L("Go back and review", "Voltar e revisar")}
      />
    </>
  );
}

function AlertDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pad>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          {L("Delete photo", "Apagar foto")}
        </Button>
      </Pad>
      <Alert
        isPresented={open}
        onDismiss={() => setOpen(false)}
        title={L("Delete this photo?", "Apagar esta foto?")}
        message={L("It will be removed from all your devices.", "Ela sai de todos os seus aparelhos.")}
        actions={[{ label: L("Cancel", "Cancelar"), role: "cancel" }, { label: L("Delete", "Apagar"), role: "destructive", onPress: () => undefined }]}
      />
    </>
  );
}

function ToastDemo() {
  const { show } = useToast();
  const upload = () => {
    const toast = show(L("Uploading…", "Enviando…"), "progress");
    setTimeout(() => toast.update(L("Uploaded", "Enviado"), "success"), 1500);
  };
  return (
    <Pad>
      <Button onClick={() => show(L("Saved", "Salvo"))}>{L("Show toast", "Mostrar aviso")}</Button>
      <Button variant="bordered" onClick={upload}>
        {L("Show progress", "Mostrar progresso")}
      </Button>
      <Button variant="plain" onClick={() => show(L("No connection", "Sem conexão"), "error", { label: L("Retry", "Tentar de novo"), onPress: () => undefined })}>
        {L("Show error", "Mostrar erro")}
      </Button>
    </Pad>
  );
}

function RedactedDemo() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, [loading]);
  return (
    <List>
      <Section
        header={L("Contacts", "Contatos")}
        headerAccessory={
          <button type="button" onClick={() => setLoading(true)} style={{ border: 0, background: "none", color: "var(--st-tint)", font: "inherit", fontSize: 15, cursor: "pointer" }}>
            {L("Reload", "Recarregar")}
          </button>
        }
      >
        <Redacted isLoading={loading} placeholder={<SkeletonList rows={3} leading="circle" label={L("Loading…", "Carregando…")} />}>
          {["Ana", "Leo", "Maya"].map((n) => (
            <Row key={n} leading={<Avatar name={n} />} title={n} subtitle={L("Mobile", "Celular")} />
          ))}
        </Redacted>
      </Section>
    </List>
  );
}

function ProgressViewDemo() {
  return (
    <Pad>
      <HStack spacing={12}>
        <ProgressView label={L("Loading", "Carregando")} />
        <Text color="secondary">{L("Loading…", "Carregando…")}</Text>
      </HStack>
    </Pad>
  );
}

function ContentUnavailableDemo() {
  return (
    <ContentUnavailableView
      title={L("No messages", "Nenhuma mensagem")}
      description={L("Messages you receive show up here.", "As mensagens que você receber aparecem aqui.")}
      icon={LISTA}
      actions={<Button>{L("Compose", "Escrever")}</Button>}
    />
  );
}

function TimelineDemo() {
  return (
    <List>
      <Section header={L("Delivery", "Entrega")}>
        <Timeline
          steps={[
            { title: L("Ordered", "Pedido feito"), detail: L("Today, 9:12", "Hoje, 9:12"), state: "done" },
            { title: L("Shipped", "Enviado"), detail: L("Today, 14:30", "Hoje, 14:30"), state: "done" },
            { title: L("Out for delivery", "Saiu para entrega"), detail: L("Arrives by 6 pm", "Chega até 18h"), state: "current" },
            { title: L("Delivered", "Entregue"), state: "upcoming" },
          ]}
        />
      </Section>
    </List>
  );
}

function ProgressStepsDemo() {
  return (
    <Pad>
      <ProgressSteps
        steps={[
          { text: L("Tap the Share button", "Toque em Compartilhar"), icon: COMPARTILHAR },
          { text: L("Choose Add to Home Screen", "Escolha Adicionar à Tela de Início"), icon: MAIS },
          { text: L("Open the app from the icon", "Abra o app pelo ícone") },
        ]}
      />
    </Pad>
  );
}

function AvatarDemo() {
  return (
    <Pad>
      <HStack spacing={12}>
        <Avatar name="Ana Souza" />
        <Avatar name="Leo Park" size={56} />
        <Avatar name="Maya" src="https://picsum.photos/seed/maya/120" size={64} />
      </HStack>
    </Pad>
  );
}

function AsyncImageDemo() {
  return (
    <Pad>
      <AsyncImage src="https://picsum.photos/seed/stackui/800/450" alt={L("A landscape", "Uma paisagem")} aspectRatio="16 / 9" width="100%" radius={16} fit="cover" showProgress />
    </Pad>
  );
}

const INSTALAR_PT = {
  title: "Instale o app",
  description: "Ele abre pela tela de início, em tela cheia, como qualquer app.",
  install: "Instalar",
  installing: "Instalando…",
  iosSteps: ["Toque em Compartilhar", "Escolha Adicionar à Tela de Início", "Abra o app pelo novo ícone"],
  androidSteps: ["Abra o menu do navegador (⋮)", "Escolha Instalar app", "Abra o app pelo novo ícone"],
  inAppTitle: "Abra no seu navegador",
  inAppDescription: "Esta janela não instala apps. Copie o link e cole no Safari ou no Chrome.",
  copyLink: "Copiar link",
  copied: "Link copiado",
  desktopDescription: "Abra este endereço no celular para instalar lá.",
};

function InstallGateDemo() {
  return (
    <InstallGate appName="Wallet" texts={PT ? INSTALAR_PT : undefined}>
      <p>{L("Your app", "Seu app")}</p>
    </InstallGate>
  );
}

const LEITOR_PT = {
  aim: "Aponte para o código de barras.",
  slow: "Não está lendo? Chegue mais perto, com mais luz, ou digite o código.",
  deniedTitle: "Permita a câmera",
  deniedDescription: "Para ler o código, o app precisa da câmera. Toque em Tentar de novo e permita.",
  failedTitle: "A câmera não abriu",
  failedDescription: "Feche outros apps que possam estar usando a câmera e tente de novo.",
  unsupportedDescription: "Este navegador não deixa o app usar a câmera.",
  retry: "Tentar de novo",
};

function BarcodeDemo() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  return (
    <>
      <List>
        <Section footer={L("Allow the camera when the browser asks.", "Permita a câmera quando o navegador pedir.")}>
          <Row title={L("Scan a barcode", "Ler código de barras")} onClick={() => setOpen(true)} chevron />
          {code && <Row title={L("Code", "Código")} value={code} />}
        </Section>
      </List>
      <Sheet isPresented={open} onDismiss={() => setOpen(false)} title={L("Scan", "Ler código")} closeLabel={L("Close", "Fechar")}>
        {open && (
          <BarcodeScanner
            texts={PT ? LEITOR_PT : undefined}
            onScan={(c: string) => {
              setCode(c);
              setOpen(false);
            }}
          />
        )}
      </Sheet>
    </>
  );
}

function ThemingDemo() {
  const [on, setOn] = useState(true);
  return (
    <Pad>
      <Toggle isOn={on} onChange={setOn} label={L("Sample", "Exemplo")} />
      <Button>{L("Accent color", "Cor de destaque")}</Button>
      <Text color="tint">{L("Links and highlights use it too.", "Links e destaques também usam.")}</Text>
    </Pad>
  );
}

export const PREVIEWS: Record<string, () => ReactNode> = {
  "first-screen": FirstScreen,
  "text-and-stacks": TextStacks,
  "navigation-stack": NavigationStackDemo,
  "navigation-bar": NavigationBarDemo,
  "tab-bar": TabBarDemo,
  menu: MenuDemo,
  list: ListDemo,
  "lazy-list": LazyListDemo,
  card: CardDemo,
  button: ButtonDemo,
  toggle: ToggleDemo,
  picker: PickerDemo,
  stepper: StepperDemo,
  "text-field": TextFieldDemo,
  "search-field": SearchFieldDemo,
  badge: BadgeDemo,
  "date-picker": DatePickerDemo,
  "time-picker": TimePickerDemo,
  "list-picker": ListPickerDemo,
  "options-sheet": OptionsSheetDemo,
  sheet: SheetDemo,
  "confirmation-sheet": ConfirmationSheetDemo,
  alert: AlertDemo,
  toast: ToastDemo,
  redacted: RedactedDemo,
  "progress-view": ProgressViewDemo,
  "content-unavailable-view": ContentUnavailableDemo,
  timeline: TimelineDemo,
  "progress-steps": ProgressStepsDemo,
  avatar: AvatarDemo,
  "async-image": AsyncImageDemo,
  "install-gate": InstallGateDemo,
  "barcode-scanner": BarcodeDemo,
  theming: ThemingDemo,
};
