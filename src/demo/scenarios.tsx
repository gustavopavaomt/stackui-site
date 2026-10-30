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
} from "@stackui/react";

import { CARTAO, COMPARTILHAR, COPIAR, DOCUMENTO, ESCUDO } from "./icons";

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
          {congelado ? "Frozen" : "Debit"}
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
      show("New card on its way");
    }, 1900);
  };
  return (
    <>
      <NavigationBar title="Card" />
      <List>
        <CartaoVisual congelado={congelado} />
        <Section>
          <Row icon={CARTAO} iconColor="var(--st-blue)" title="Card details" onClick={() => setAberta("details")} chevron />
          <Row icon={ESCUDO} iconColor="var(--st-indigo)" title="Freeze card" accessory={<Toggle isOn={congelado} onChange={setCongelado} label="Freeze card" />} />
          <Row icon={DOCUMENTO} iconColor="var(--st-orange)" title="Replace card" onClick={() => setAberta("replace")} chevron />
        </Section>
        <Section>
          <Row title="Report lost or stolen" centered destructive onClick={() => setAberta("lost")} />
        </Section>
      </List>

      <Sheet isPresented={aberta === "details"} onDismiss={fechar} title="Card details" description="Only you can see these numbers.">
        <List>
          <Section>
            <Row title="Number" value="4532 0151 2298 4821" />
            <Row title="Expires" value="08/29" />
            <Row title="CVC" value="•••" />
          </Section>
          <Section>
            <Row
              icon={COPIAR}
              iconColor="var(--st-gray)"
              title="Copy number"
              onClick={() => {
                fechar();
                show("Number copied");
              }}
            />
            <Row icon={COMPARTILHAR} iconColor="var(--st-blue)" title="Add to Wallet app" onClick={fechar} />
          </Section>
        </List>
      </Sheet>
      <ConfirmationSheet
        isPresented={aberta === "replace"}
        onDismiss={fechar}
        onConfirm={pedir}
        state={estado}
        title="Replace card"
        description="Your current card keeps working until the new one arrives."
        items={[
          { label: "Deliver to", value: "12 Ocean Ave" },
          { label: "Arrives", value: "In 3–5 days" },
          { label: "Fee", value: "Free" },
        ]}
        confirmLabel="Order new card"
        loadingLabel="Ordering…"
        doneLabel="Ordered"
      />
      <Alert
        isPresented={aberta === "lost"}
        onDismiss={fechar}
        title="Block this card?"
        message="It stops working right away. We will send you a new one."
        actions={[
          { label: "Cancel", role: "cancel" },
          {
            label: "Block",
            role: "destructive",
            onPress: () => {
              setCongelado(true);
              show("Card blocked", "error");
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
      <NavigationBar title="New transfer" />
      <List>
        <Section header="To">
          <Row leading={<Avatar name="Ana Souza" />} title="Ana Souza" subtitle="Everyday ·· 3310" chevron onClick={() => undefined} />
        </Section>
        <Picker
          label="Frequency"
          selection={frequencia}
          onChange={setFrequencia}
          options={[
            { value: "once", label: "Once" },
            { value: "monthly", label: "Monthly" },
          ]}
        />
        <Section footer={frequencia === "monthly" ? `${meses} payments of $${(numero || 0).toFixed(2)}, starting today.` : "Arrives in seconds."}>
          <TextField label="Amount" inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} error={valor && !(numero > 0) ? "Type an amount" : undefined} accessory={<Text color="secondary">USD</Text>} />
          {frequencia === "monthly" && <Row title="Months" accessory={<Stepper label="Months" value={meses} onChange={setMeses} min={2} max={24} />} />}
          <Row title="Notify Ana" accessory={<Toggle isOn={avisar} onChange={setAvisar} label="Notify Ana" />} />
        </Section>
        <Button state={estado} onClick={enviar} loadingLabel="Sending…" doneLabel="Sent" disabled={!(numero > 0)}>
          {frequencia === "once" ? `Send $${(numero || 0).toFixed(2)}` : "Schedule transfers"}
        </Button>
      </List>
    </>
  );
}

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
    const t = show("Sending 3 requests…", "progress");
    window.setTimeout(() => {
      t.update("3 requests sent", "success", { label: "Undo", onPress: () => setPedido(false) });
      setPedido(true);
    }, 1600);
  };
  return (
    <>
      <NavigationBar title="Split bill" />
      <List>
        <Card>
          <VStack spacing={2} alignment="leading">
            <Text font="subheadline" color="secondary">
              Sunset Diner · Today
            </Text>
            <Text font="title" as="p">
              $130.00
            </Text>
            <Text font="footnote" color="secondary">
              Split 4 ways, you paid
            </Text>
          </VStack>
        </Card>
        <Section header="Requests">
          {CONTA.map((p) => (
            <Row key={p.nome} leading={<Avatar name={p.nome} />} title={p.nome} subtitle={pedido ? "Requested just now" : "Not requested yet"} value={`$${p.parte.toFixed(2)}`} />
          ))}
        </Section>
        <VStack spacing={4}>
          <Button onClick={pedir} disabled={pedido}>
            {pedido ? "Requests sent" : "Request $97.50"}
          </Button>
          <Button variant="plain" onClick={() => show("You are offline. We will send it later.", "info")}>
            Remind later
          </Button>
        </VStack>
      </List>
    </>
  );
}

const CONTAS = ["City Power", "Water & Sewer", "Fiber Internet", "Mobile plan", "Rent", "Car insurance", "Gym Club", "Streaming"];

/** Pickers: scheduling a bill payment. */
export function DemoPickers() {
  const { show } = useToast();
  const [conta, setConta] = useState("City Power");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("09:00");
  const [escolhendo, setEscolhendo] = useState(false);
  return (
    <>
      <NavigationBar title="Pay a bill" />
      <List>
        <Section header="Bill">
          <PickerRow label="Payee" value={conta} onClick={() => setEscolhendo(true)} />
          <Row title="Amount due" value="$119.68" />
        </Section>
        <Section header="When" footer="Payments made before 6 pm arrive the same day.">
          <Row title="Date" accessory={<DatePicker value={data} onChange={setData} title="Payment date" locale="en-US" />} />
          <Row title="Time" accessory={<TimePicker value={hora} onChange={setHora} title="Payment time" />} />
        </Section>
        <Button disabled={!data} onClick={() => show(`Scheduled for ${data.slice(5).replace("-", "/")} at ${hora}`)}>
          Schedule payment
        </Button>
      </List>
      <Sheet isPresented={escolhendo} onDismiss={() => setEscolhendo(false)} title="Payee">
        <ListPicker
          label="Payee"
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
