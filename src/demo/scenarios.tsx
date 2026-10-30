import { useState } from "react";

import {
  Alert,
  Badge,
  Button,
  ConfirmationSheet,
  DatePicker,
  HStack,
  List,
  ListPicker,
  NavigationBar,
  OptionsSheet,
  Picker,
  PickerRow,
  Row,
  Section,
  Sheet,
  Stepper,
  TextField,
  TimePicker,
  Toggle,
  VStack,
  useToast,
  type ButtonState,
} from "@stackui/react";

import { CATEGORIAS, type Categoria } from "./data";
import { COMPARTILHAR, COPIAR, DOCUMENTO, ICONES_CATEGORIA } from "./icons";

export function DemoSheets() {
  const [aberta, setAberta] = useState<"" | "share" | "confirm" | "options" | "alert">("");
  const [estado, setEstado] = useState<ButtonState>("idle");
  const [ordem, setOrdem] = useState<"date" | "amount" | "name">("date");
  const { show } = useToast();
  const fechar = () => setAberta("");
  const transferir = () => {
    setEstado("loading");
    window.setTimeout(() => setEstado("done"), 1000);
    window.setTimeout(() => {
      fechar();
      setEstado("idle");
      show("$250.00 sent to Ana");
    }, 1900);
  };
  return (
    <>
      <NavigationBar title="Sheets" />
      <List>
        <Section header="Drag the handle down to close" footer="Esc, a tap outside and the Android back gesture close them too.">
          <Row title="Share statement" onClick={() => setAberta("share")} chevron />
          <Row title="Send $250 to Ana" onClick={() => setAberta("confirm")} chevron />
          <Row title="Sort by" value={{ date: "Date", amount: "Amount", name: "Name" }[ordem]} onClick={() => setAberta("options")} chevron />
          <Row title="Remove card" destructive onClick={() => setAberta("alert")} />
        </Section>
      </List>
      <Sheet isPresented={aberta === "share"} onDismiss={fechar} title="Share" icon={COMPARTILHAR} description="October statement, PDF, 2 pages.">
        <List>
          <Section>
            <Row icon={COPIAR} iconColor="var(--st-gray)" title="Copy link" onClick={fechar} />
            <Row icon={DOCUMENTO} iconColor="var(--st-blue)" title="Save to Files" onClick={fechar} />
          </Section>
        </List>
      </Sheet>
      <ConfirmationSheet
        isPresented={aberta === "confirm"}
        onDismiss={fechar}
        onConfirm={transferir}
        state={estado}
        title="Send money"
        description="Check the details before sending."
        items={[
          { label: "To", value: "Ana Souza" },
          { label: "From", value: "Everyday ·· 4821" },
          { label: "Amount", value: "$250.00" },
        ]}
        confirmLabel="Send"
        loadingLabel="Sending…"
        doneLabel="Sent"
      />
      <OptionsSheet
        isPresented={aberta === "options"}
        onDismiss={fechar}
        title="Sort by"
        selection={ordem}
        onChange={setOrdem}
        options={[
          { value: "date", label: "Date", description: "Newest first" },
          { value: "amount", label: "Amount", description: "Largest first" },
          { value: "name", label: "Name" },
        ]}
      />
      <Alert isPresented={aberta === "alert"} onDismiss={fechar} title="Remove this card?" message="You can add it again at any time." actions={[{ label: "Cancel", role: "cancel" }, { label: "Remove", role: "destructive" }]} />
    </>
  );
}

export function DemoControls() {
  const [faceId, setFaceId] = useState(true);
  const [tipo, setTipo] = useState<"expense" | "income">("expense");
  const [parcelas, setParcelas] = useState(3);
  const [valor, setValor] = useState("");
  const [estado, setEstado] = useState<ButtonState>("idle");
  const salvar = () => {
    setEstado("loading");
    window.setTimeout(() => setEstado("done"), 900);
    window.setTimeout(() => setEstado("idle"), 2600);
  };
  return (
    <>
      <NavigationBar title="Controls" />
      <List>
        <Picker
          selection={tipo}
          onChange={setTipo}
          label="Type"
          options={[
            { value: "expense", label: "Expense" },
            { value: "income", label: "Income" },
          ]}
        />
        <Section>
          <TextField label="Amount" inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} error={valor && !(Number(valor.replace(",", ".")) > 0) ? "Type a number" : undefined} />
          <Row title="Installments" accessory={<Stepper value={parcelas} onChange={setParcelas} label="Installments" min={1} max={12} />} />
          <Row title="Face ID to confirm" accessory={<Toggle isOn={faceId} onChange={setFaceId} label="Face ID to confirm" />} />
        </Section>
        <Section header="Status">
          <HStack spacing={8} style={{ padding: 16, flexWrap: "wrap" }}>
            <Badge tone="success">Paid</Badge>
            <Badge tone="warning">Pending</Badge>
            <Badge tone="tint">Scheduled</Badge>
            <Badge tone="danger">Declined</Badge>
            <Badge>Draft</Badge>
          </HStack>
        </Section>
        <VStack spacing={8}>
          <Button size="large" state={estado} onClick={salvar} loadingLabel="Saving…" doneLabel="Saved">
            Save
          </Button>
          <Button size="large" variant="plain">
            Cancel
          </Button>
        </VStack>
      </List>
    </>
  );
}

export function DemoToasts() {
  const { show } = useToast();
  const transferir = () => {
    const t = show("Sending $120.00…", "progress");
    window.setTimeout(() => t.update("$120.00 sent to Leo", "success", { label: "Receipt", onPress: () => undefined }), 1800);
  };
  return (
    <>
      <NavigationBar title="Toasts" />
      <List>
        <Section footer="One at a time: a new toast waits for the current one to leave.">
          <VStack spacing={10} style={{ padding: 16 }}>
            <Button onClick={transferir}>Send money</Button>
            <Button variant="bordered" onClick={() => show("Budget saved")}>
              Success
            </Button>
            <Button variant="bordered" onClick={() => show("Offline: it syncs when you are back", "info")}>
              Info
            </Button>
            <Button variant="destructive" onClick={() => show("Card declined", "error", { label: "Why", onPress: () => undefined })}>
              Error with an action
            </Button>
          </VStack>
        </Section>
      </List>
    </>
  );
}

const TODAS: Categoria[] = ["groceries", "dining", "transport", "shopping", "bills", "health", "travel", "fun", "salary", "transfer"];

export function DemoPickers() {
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [categoria, setCategoria] = useState<Categoria | "">("");
  const [escolhendo, setEscolhendo] = useState(false);
  return (
    <>
      <NavigationBar title="Pickers" />
      <List>
        <Section header="Schedule a payment" footer="The same on iPhone and Android, in any language.">
          <PickerRow label="Category" value={categoria ? CATEGORIAS[categoria].nome : ""} onClick={() => setEscolhendo(true)} />
          <Row title="Date" accessory={<DatePicker value={data} onChange={setData} title="Payment date" locale="en-US" shortcuts={[]} />} />
          <Row title="Time" accessory={<TimePicker value={hora} onChange={setHora} title="Payment time" />} />
        </Section>
      </List>
      <Sheet isPresented={escolhendo} onDismiss={() => setEscolhendo(false)} title="Category">
        <ListPicker
          label="Category"
          options={TODAS.map((c) => ({ value: c, label: CATEGORIAS[c].nome, icon: ICONES_CATEGORIA[c] }))}
          selection={categoria}
          onChange={(c) => {
            setCategoria(c);
            setEscolhendo(false);
          }}
        />
      </Sheet>
    </>
  );
}
