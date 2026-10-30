import { useState } from "react";

import {
  Alert,
  Avatar,
  Button,
  Card,
  ConfirmationSheet,
  DatePicker,
  HStack,
  List,
  ListPicker,
  NavigationBar,
  Picker,
  PickerRow,
  Row,
  Section,
  Sheet,
  Spacer,
  Stepper,
  Text,
  TextField,
  TimePicker,
  Toggle,
  VStack,
  useToast,
  type ButtonState,
} from "stackui-kit";

import { CARTAO, COMPARTILHAR, COPIAR, DOCUMENTO, ESCUDO } from "./icons";
import { L, LOCALE, PT } from "./lang";

const FECHAR = L("Close", "Fechar");

/*
 * Screens of the Wallet example app, each one showing off a part of the library in a real context:
 * the card (sheets and alerts), a new transfer (controls), splitting a bill (toasts), scheduling a payment (pickers).
 */

/** The card, drawn with the accent color. */
function CartaoVisual({ congelado }: { congelado: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "1.586",
        padding: 20,
        borderRadius: 18,
        color: "#fff",
        background: congelado ? "linear-gradient(135deg, #8e8e93, #636366)" : "linear-gradient(135deg, var(--st-tint), color-mix(in oklab, var(--st-tint) 55%, #000))",
        boxShadow: "0 12px 30px -12px rgb(0 0 0 / 0.45)",
        transition: "background 0.4s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HStack>
        <Text font="headline" style={{ color: "#fff" }}>
          Wallet
        </Text>
        <Spacer />
        <Text font="footnote" style={{ color: "rgb(255 255 255 / 0.85)" }}>
          {congelado ? L("Frozen", "Bloqueado") : L("Debit", "Débito")}
        </Text>
      </HStack>
      <Spacer />
      <Text font="title3" style={{ color: "#fff", letterSpacing: "0.12em", fontVariantNumeric: "tabular-nums" }}>
        •••• 4821
      </Text>
      <Text font="footnote" style={{ color: "rgb(255 255 255 / 0.85)", marginTop: 4 }}>
        Ana Souza · 08/29
      </Text>
    </div>
  );
}

/** Sheets and alerts: the card screen. */
export function DemoSheets() {
  const [aberta, setAberta] = useState<"" | "details" | "replace" | "lost">("");
  const [congelado, setCongelado] = useState(false);
  const [estado, setEstado] = useState<ButtonState>("idle");
  const { show } = useToast();
  const fechar = () => setAberta("");
  const pedir = () => {
    setEstado("loading");
    window.setTimeout(() => setEstado("done"), 1000);
    window.setTimeout(() => {
      fechar();
      setEstado("idle");
      show(L("New card on its way", "Novo cartão a caminho"));
    }, 1900);
  };
  return (
    <>
      <NavigationBar title={L("Card", "Cartão")} />
      <List>
        <CartaoVisual congelado={congelado} />
        <Section>
          <Row icon={CARTAO} iconColor="var(--st-blue)" title={L("Card details", "Dados do cartão")} onClick={() => setAberta("details")} chevron />
          <Row icon={ESCUDO} iconColor="var(--st-indigo)" title={L("Freeze card", "Bloquear cartão")} accessory={<Toggle isOn={congelado} onChange={setCongelado} label={L("Freeze card", "Bloquear cartão")} />} />
          <Row icon={DOCUMENTO} iconColor="var(--st-orange)" title={L("Replace card", "Pedir novo cartão")} onClick={() => setAberta("replace")} chevron />
        </Section>
        <Section>
          <Row title={L("Report lost or stolen", "Avisar perda ou roubo")} centered destructive onClick={() => setAberta("lost")} />
        </Section>
      </List>

      <Sheet isPresented={aberta === "details"} onDismiss={fechar} title={L("Card details", "Dados do cartão")} description={L("Only you can see these numbers.", "Só você vê estes números.")} closeLabel={FECHAR}>
        <List>
          <Section>
            <Row title={L("Number", "Número")} value="4532 0151 2298 4821" />
            <Row title={L("Expires", "Validade")} value="08/29" />
            <Row title="CVC" value="•••" />
          </Section>
          <Section>
            <Row
              icon={COPIAR}
              iconColor="var(--st-gray)"
              title={L("Copy number", "Copiar número")}
              onClick={() => {
                fechar();
                show(L("Number copied", "Número copiado"));
              }}
            />
            <Row icon={COMPARTILHAR} iconColor="var(--st-blue)" title={L("Add to Wallet app", "Adicionar à carteira do celular")} onClick={fechar} />
          </Section>
        </List>
      </Sheet>
      <ConfirmationSheet
        isPresented={aberta === "replace"}
        onDismiss={fechar}
        onConfirm={pedir}
        state={estado}
        title={L("Replace card", "Pedir novo cartão")}
        description={L("Your current card keeps working until the new one arrives.", "O cartão atual funciona até o novo chegar.")}
        items={[
          { label: L("Deliver to", "Entregar em"), value: L("12 Ocean Ave", "Rua do Mar, 12") },
          { label: L("Arrives", "Chega"), value: L("In 3–5 days", "Em 3 a 5 dias") },
          { label: L("Fee", "Tarifa"), value: L("Free", "Grátis") },
        ]}
        confirmLabel={L("Order new card", "Pedir novo cartão")}
        loadingLabel={L("Ordering…", "Pedindo…")}
        doneLabel={L("Ordered", "Pedido")}
        cancelLabel={L("Go back and review", "Voltar e revisar")}
      />
      <Alert
        isPresented={aberta === "lost"}
        onDismiss={fechar}
        title={L("Block this card?", "Bloquear este cartão?")}
        message={L("It stops working right away. We will send you a new one.", "Ele para de funcionar na hora. Enviamos um novo.")}
        actions={[
          { label: L("Cancel", "Cancelar"), role: "cancel" },
          {
            label: L("Block", "Bloquear"),
            role: "destructive",
            onPress: () => {
              setCongelado(true);
              show(L("Card blocked", "Cartão bloqueado"), "error");
            },
          },
        ]}
      />
    </>
  );
}

/** Controls: a new transfer form. */
export function DemoControls() {
  const [frequencia, setFrequencia] = useState<"once" | "monthly">("once");
  const [valor, setValor] = useState("250");
  const [meses, setMeses] = useState(6);
  const [avisar, setAvisar] = useState(true);
  const [estado, setEstado] = useState<ButtonState>("idle");
  const numero = Number(valor.replace(",", "."));
  const enviar = () => {
    if (!(numero > 0)) return;
    setEstado("loading");
    window.setTimeout(() => setEstado("done"), 1000);
    window.setTimeout(() => setEstado("idle"), 2600);
  };
  return (
    <>
      <NavigationBar title={L("New transfer", "Nova transferência")} />
      <List>
        <Section header={L("To", "Para")}>
          <Row leading={<Avatar name="Ana Souza" />} title="Ana Souza" subtitle={L("Everyday ·· 3310", "Corrente ·· 3310")} chevron onClick={() => undefined} />
        </Section>
        <Picker
          label={L("Frequency", "Frequência")}
          selection={frequencia}
          onChange={setFrequencia}
          options={[
            { value: "once", label: L("Once", "Uma vez") },
            { value: "monthly", label: L("Monthly", "Todo mês") },
          ]}
        />
        <Section footer={frequencia === "monthly" ? L(`${meses} payments of ${dinheiro(numero)}, starting today.`, `${meses} pagamentos de ${dinheiro(numero)}, a partir de hoje.`) : L("Arrives in seconds.", "Chega em segundos.")}>
          <TextField label={L("Amount", "Valor")} inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} error={valor && !(numero > 0) ? L("Type an amount", "Digite um valor") : undefined} accessory={<Text color="secondary">{PT ? "BRL" : "USD"}</Text>} />
          {frequencia === "monthly" && <Row title={L("Months", "Meses")} accessory={<Stepper label={L("Months", "Meses")} value={meses} onChange={setMeses} min={2} max={24} decrementLabel={L("Decrease", "Diminuir")} incrementLabel={L("Increase", "Aumentar")} />} />}
          <Row title={L("Notify Ana", "Avisar a Ana")} accessory={<Toggle isOn={avisar} onChange={setAvisar} label={L("Notify Ana", "Avisar a Ana")} />} />
        </Section>
        <Button state={estado} onClick={enviar} loadingLabel={L("Sending…", "Enviando…")} doneLabel={L("Sent", "Enviado")} disabled={!(numero > 0)}>
          {frequencia === "once" ? L(`Send ${dinheiro(numero)}`, `Enviar ${dinheiro(numero)}`) : L("Schedule transfers", "Agendar transferências")}
        </Button>
      </List>
    </>
  );
}

const dinheiro = (n: number) => new Intl.NumberFormat(LOCALE, { style: "currency", currency: PT ? "BRL" : "USD" }).format(n || 0);
const DATA_PT = { placeholder: "Escolher", previousMonthLabel: "Mês anterior", nextMonthLabel: "Próximo mês", shortcuts: [] };
const HORA_PT = { nowLabel: "Agora", clearLabel: "Limpar", doneLabel: "Pronto", hourLabel: "Hora", minuteLabel: "Minuto" };

const CONTA = [
  { nome: "Ana Souza", parte: 32.5 },
  { nome: "Leo Park", parte: 32.5 },
  { nome: "Maya Chen", parte: 32.5 },
];

/** Toasts: splitting a dinner bill. */
export function DemoToasts() {
  const { show } = useToast();
  const [pedido, setPedido] = useState(false);
  const pedir = () => {
    const t = show(L("Sending 3 requests…", "Enviando 3 cobranças…"), "progress");
    window.setTimeout(() => {
      t.update(L("3 requests sent", "3 cobranças enviadas"), "success", { label: L("Undo", "Desfazer"), onPress: () => setPedido(false) });
      setPedido(true);
    }, 1600);
  };
  return (
    <>
      <NavigationBar title={L("Split bill", "Dividir a conta")} />
      <List>
        <Card>
          <VStack spacing={2} alignment="leading">
            <Text font="subheadline" color="secondary">
              {L("Sunset Diner · Today", "Lanchonete Sol · Hoje")}
            </Text>
            <Text font="title" as="p">
              {dinheiro(130)}
            </Text>
            <Text font="footnote" color="secondary">
              {L("Split 4 ways, you paid", "Dividida por 4, você pagou")}
            </Text>
          </VStack>
        </Card>
        <Section header={L("Requests", "Cobranças")}>
          {CONTA.map((p) => (
            <Row key={p.nome} leading={<Avatar name={p.nome} />} title={p.nome} subtitle={pedido ? L("Requested just now", "Cobrado agora") : L("Not requested yet", "Ainda não cobrado")} value={dinheiro(p.parte)} />
          ))}
        </Section>
        <VStack spacing={4}>
          <Button onClick={pedir} disabled={pedido}>
            {pedido ? L("Requests sent", "Cobranças enviadas") : L(`Request ${dinheiro(97.5)}`, `Cobrar ${dinheiro(97.5)}`)}
          </Button>
          <Button variant="plain" onClick={() => show(L("You are offline. We will send it later.", "Você está sem internet. Enviamos depois."), "info")}>
            {L("Remind later", "Lembrar depois")}
          </Button>
        </VStack>
      </List>
    </>
  );
}

const CONTAS = PT
  ? ["Companhia de Luz", "Água e Esgoto", "Internet Fibra", "Plano do celular", "Aluguel", "Seguro do carro", "Academia Forma", "Streaming"]
  : ["City Power", "Water & Sewer", "Fiber Internet", "Mobile plan", "Rent", "Car insurance", "Gym Club", "Streaming"];

/** Pickers: scheduling a bill payment. */
export function DemoPickers() {
  const { show } = useToast();
  const [conta, setConta] = useState(CONTAS[0]);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("09:00");
  const [escolhendo, setEscolhendo] = useState(false);
  return (
    <>
      <NavigationBar title={L("Pay a bill", "Pagar uma conta")} />
      <List>
        <Section header={L("Bill", "Conta")}>
          <PickerRow label={L("Payee", "Favorecido")} value={conta} placeholder={L("Choose", "Escolher")} onClick={() => setEscolhendo(true)} />
          <Row title={L("Amount due", "Valor")} value={dinheiro(119.68)} />
        </Section>
        <Section header={L("When", "Quando")} footer={L("Payments made before 6 pm arrive the same day.", "Pagamentos feitos até as 18h caem no mesmo dia.")}>
          <Row title={L("Date", "Data")} accessory={<DatePicker value={data} onChange={setData} title={L("Payment date", "Data do pagamento")} locale={LOCALE} {...(PT ? DATA_PT : {})} />} />
          <Row title={L("Time", "Hora")} accessory={<TimePicker value={hora} onChange={setHora} title={L("Payment time", "Hora do pagamento")} {...(PT ? HORA_PT : {})} />} />
        </Section>
        <Button disabled={!data} onClick={() => show(L(`Scheduled for ${data.slice(5).replace("-", "/")} at ${hora}`, `Agendado para ${data.slice(8)}/${data.slice(5, 7)} às ${hora}`))}>
          {L("Schedule payment", "Agendar pagamento")}
        </Button>
      </List>
      <Sheet isPresented={escolhendo} onDismiss={() => setEscolhendo(false)} title={L("Payee", "Favorecido")} closeLabel={FECHAR}>
        <ListPicker
          label={L("Payee", "Favorecido")}
          {...(PT ? { searchPlaceholder: "Buscar", emptyText: "Nada com esse nome", countText: (n: number, t: number) => (n === t ? `${t} itens` : `${n} de ${t}`) } : {})}
          options={CONTAS.map((c) => ({ value: c, label: c }))}
          selection={conta}
          onChange={(c) => {
            setConta(c);
            setEscolhendo(false);
          }}
        />
      </Sheet>
    </>
  );
}
