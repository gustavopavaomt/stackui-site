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

import { CIDADES } from "./data";
import { CAIXA, COMPARTILHAR, COPIAR } from "./icons";

export function DemoSheets() {
  const [aberta, setAberta] = useState<"" | "share" | "confirm" | "options" | "alert">("");
  const [estado, setEstado] = useState<ButtonState>("idle");
  const [ordem, setOrdem] = useState<"name" | "date" | "total">("date");
  const fechar = () => setAberta("");
  const confirmar = () => {
    setEstado("loading");
    window.setTimeout(() => setEstado("done"), 1000);
    window.setTimeout(() => {
      fechar();
      setEstado("idle");
    }, 1900);
  };
  return (
    <>
      <NavigationBar title="Sheets" />
      <List>
        <Section header="Drag the handle down to close" footer="Esc, a tap outside and the Android back gesture close them too.">
          <Row title="Share" onClick={() => setAberta("share")} chevron />
          <Row title="Confirm before saving" onClick={() => setAberta("confirm")} chevron />
          <Row title="Sort by" value={{ name: "Name", date: "Date", total: "Total" }[ordem]} onClick={() => setAberta("options")} chevron />
          <Row title="Delete order" destructive onClick={() => setAberta("alert")} />
        </Section>
      </List>
      <Sheet isPresented={aberta === "share"} onDismiss={fechar} title="Share" icon={COMPARTILHAR} description="Send this order to the client.">
        <List>
          <Section>
            <Row icon={COPIAR} iconColor="var(--st-gray)" title="Copy link" onClick={fechar} />
            <Row icon={CAIXA} iconColor="var(--st-green)" title="Send by message" onClick={fechar} />
          </Section>
        </List>
      </Sheet>
      <ConfirmationSheet
        isPresented={aberta === "confirm"}
        onDismiss={fechar}
        onConfirm={confirmar}
        state={estado}
        title="Save visit"
        items={[
          { label: "Client", value: "Pão Quente" },
          { label: "Date", value: "Today, 10:30" },
        ]}
        confirmLabel="Save"
        loadingLabel="Saving…"
        doneLabel="Saved"
      />
      <OptionsSheet
        isPresented={aberta === "options"}
        onDismiss={fechar}
        title="Sort by"
        selection={ordem}
        onChange={setOrdem}
        options={[
          { value: "name", label: "Name" },
          { value: "date", label: "Date", description: "Newest first" },
          { value: "total", label: "Total", description: "Largest first" },
        ]}
      />
      <Alert isPresented={aberta === "alert"} onDismiss={fechar} title="Delete this order?" message="It leaves this phone and cannot be recovered." actions={[{ label: "Cancel", role: "cancel" }, { label: "Delete", role: "destructive" }]} />
    </>
  );
}

export function DemoControls() {
  const [avisos, setAvisos] = useState(true);
  const [modo, setModo] = useState<"delivery" | "pickup">("delivery");
  const [qtd, setQtd] = useState(2);
  const [email, setEmail] = useState("");
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
        <Section>
          <div style={{ padding: "12px 16px" }}>
            <Picker
              selection={modo}
              onChange={setModo}
              label="Mode"
              options={[
                { value: "delivery", label: "Delivery" },
                { value: "pickup", label: "Pickup" },
              ]}
            />
          </div>
          <Row title="Notifications" accessory={<Toggle isOn={avisos} onChange={setAvisos} label="Notifications" />} />
          <Row title="Boxes" accessory={<Stepper value={qtd} onChange={setQtd} label="Boxes" />} />
        </Section>
        <Section header="Contact">
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={email && !email.includes("@") ? "Type a valid email" : undefined} />
          <TextField label="Phone" type="tel" />
        </Section>
        <Section header="Status">
          <HStack spacing={8} style={{ padding: 16, flexWrap: "wrap" }}>
            <Badge>Draft</Badge>
            <Badge tone="tint">New</Badge>
            <Badge tone="success">Sent</Badge>
            <Badge tone="warning">Pending</Badge>
            <Badge tone="danger">Rejected</Badge>
          </HStack>
        </Section>
        <VStack spacing={8}>
          <Button size="large" state={estado} onClick={salvar} loadingLabel="Saving…" doneLabel="Saved">
            Save changes
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
  const enviar = () => {
    const t = show("Sending 3 orders…", "progress");
    window.setTimeout(() => t.update("3 orders sent", "success", { label: "View", onPress: () => undefined }), 1800);
  };
  return (
    <>
      <NavigationBar title="Toasts" />
      <List>
        <Section footer="One at a time: a new toast waits for the current one to leave.">
          <VStack spacing={10} style={{ padding: 16 }}>
            <Button onClick={enviar}>Send with progress</Button>
            <Button variant="bordered" onClick={() => show("Saved on this phone")}>
              Success
            </Button>
            <Button variant="bordered" onClick={() => show("No signal: it goes up later", "info")}>
              Info
            </Button>
            <Button variant="destructive" onClick={() => show("The company did not accept it", "error", { label: "Why", onPress: () => undefined })}>
              Error with an action
            </Button>
          </VStack>
        </Section>
      </List>
    </>
  );
}

export function DemoPickers() {
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [cidade, setCidade] = useState("");
  const [escolhendo, setEscolhendo] = useState(false);
  return (
    <>
      <NavigationBar title="Pickers" />
      <List>
        <Section header="Delivery" footer="The same on iPhone and Android, in any language.">
          <PickerRow label="City" value={cidade} onClick={() => setEscolhendo(true)} />
          <Row title="Date" accessory={<DatePicker value={data} onChange={setData} title="Delivery date" locale="en-US" />} />
          <Row title="Time" accessory={<TimePicker value={hora} onChange={setHora} title="Delivery time" />} />
        </Section>
      </List>
      <Sheet isPresented={escolhendo} onDismiss={() => setEscolhendo(false)} title="City">
        <ListPicker
          label="City"
          options={CIDADES.map((c) => ({ value: c, label: c }))}
          selection={cidade}
          onChange={(c) => {
            setCidade(c);
            setEscolhendo(false);
          }}
        />
      </Sheet>
    </>
  );
}

