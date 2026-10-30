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

/*
 * The live examples of the docs: one per component, loaded as demo.html?c=<name>. Each one is the code shown next
 * to it on the docs page, made runnable.
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

function FirstScreen() {
  const [alerts, setAlerts] = useState(true);
  return (
    <>
      <NavigationBar title="Settings" />
      <List>
        <Section header="General" footer="You can change this at any time.">
          <Row title="Notifications" accessory={<Toggle isOn={alerts} onChange={setAlerts} label="Notifications" />} />
          <Row title="Language" value="English" href="#" />
        </Section>
      </List>
    </>
  );
}

function TextStacks() {
  return (
    <Pad>
      <VStack spacing={4} alignment="leading">
        <Text font="largeTitle">Good morning</Text>
        <Text color="secondary">Here is your day.</Text>
      </VStack>
      <HStack spacing={8}>
        <Text font="headline">Balance</Text>
        <Spacer />
        <Text color="tint">$1,280.00</Text>
      </HStack>
    </Pad>
  );
}

function Pessoa({ nome }: { nome: string }) {
  return (
    <>
      <NavigationBar title={nome} backHref="#/people" />
      <List>
        <Section>
          <Row title="Email" value={`${nome.toLowerCase()}@mail.com`} />
          <Row title="Phone" value="+1 555 0100" />
        </Section>
      </List>
    </>
  );
}

function Pessoas() {
  return (
    <>
      <NavigationBar title="People" />
      <List>
        <Section>
          {["Ana", "Leo", "Maya"].map((n) => (
            <Row key={n} leading={<Avatar name={n} />} title={n} href={`#/people/${n}`} />
          ))}
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
      <NavigationBar title="Inbox" trailing={<ToolbarButton label="New message" icon={MAIS} prominent />} />
      <List>
        <Section header="Scroll to see the title move into the bar">
          {Array.from({ length: 20 }, (_, i) => (
            <Row key={i} title={`Message ${i + 1}`} subtitle="Tap to read" />
          ))}
        </Section>
      </List>
    </>
  );
}

function TabBarDemo() {
  const [tab, setTab] = useState("home");
  return (
    <>
      <Pad>
        <Text font="title2">{{ home: "Home", activity: "Activity", settings: "Settings" }[tab]}</Text>
        <Text color="secondary">Pick a tab: the pill slides to it.</Text>
      </Pad>
      <TabBar
        selection={tab}
        onSelect={setTab}
        items={[
          { id: "home", label: "Home", icon: CASA },
          { id: "activity", label: "Activity", icon: LISTA, badge: 3 },
          { id: "settings", label: "Settings", icon: ENGRENAGEM },
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
        title="Note"
        trailing={
          <Menu
            label="More"
            icon={RETICENCIAS}
            items={[
              { label: "Edit", icon: LAPIS, onPress: () => show("Edit") },
              { label: "Duplicate", icon: COPIAR, onPress: () => show("Duplicated") },
              { label: "Delete", icon: LIXO, destructive: true, onPress: () => show("Deleted", "error") },
            ]}
          />
        }
      />
      <Pad>
        <Text color="secondary">Tap ··· in the top right corner.</Text>
      </Pad>
    </>
  );
}

function ListDemo() {
  const [faceId, setFaceId] = useState(true);
  return (
    <List>
      <Section header="Account" footer="Your data stays on this device.">
        <Row icon={ROSTO} iconColor="var(--st-green)" title="Face ID" accessory={<Toggle isOn={faceId} onChange={setFaceId} label="Face ID" />} />
        <Row icon={SINO} iconColor="var(--st-red)" title="Notifications" value="On" href="#" />
        <Row icon={CARTAO} iconColor="var(--st-blue)" title="Cards" subtitle="2 cards" href="#" />
      </Section>
      <Section>
        <Row title="Sign out" centered onClick={() => undefined} />
      </Section>
    </List>
  );
}

const NOMES = ["Ana", "Leo", "Maya", "Noah", "Iris", "Theo", "Lia", "Omar"];
const PESSOAS = Array.from({ length: 20000 }, (_, i) => ({ id: String(i), name: `${NOMES[i % 8]} ${String.fromCharCode(65 + (i % 26))}.`, city: ["Lisbon", "Austin", "Osaka", "Lagos"][i % 4] }));

function LazyListDemo() {
  return (
    <List>
      <Section header="20,000 people" plain>
        <LazyList items={PESSOAS} id={(p) => p.id} estimatedRowHeight={61} render={(p) => <Row leading={<Avatar name={p.name} />} title={p.name} subtitle={p.city} lineLimit={1} />} />
      </Section>
    </List>
  );
}

function CardDemo() {
  return (
    <Pad>
      <Card href="#">
        <Text font="headline">Monthly goal</Text>
        <Text color="secondary">72% reached, 8 days left</Text>
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
      <Button size="large" state={state} onClick={save} loadingLabel="Saving…" doneLabel="Saved">
        Save
      </Button>
      <Button variant="bordered">Bordered</Button>
      <Button variant="plain">Plain</Button>
      <Button variant="destructive">Delete</Button>
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
  return (
    <Pad>
      <Picker
        label="Period"
        selection={period}
        onChange={setPeriod}
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
      />
      <Text color="secondary">Showing this {period}.</Text>
    </Pad>
  );
}

function StepperDemo() {
  const [guests, setGuests] = useState(2);
  return (
    <List>
      <Section>
        <Row title="Guests" accessory={<Stepper label="Guests" value={guests} onChange={setGuests} min={1} max={8} />} />
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
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={invalid ? "Type a valid email" : undefined} />
        <TextField label="Password" type="password" />
      </Section>
    </List>
  );
}

const FRUTAS = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Grape", "Lemon", "Mango", "Orange", "Peach", "Pear", "Plum"];

function SearchFieldDemo() {
  const [query, setQuery] = useState("");
  const shown = FRUTAS.filter((f) => normalizeSearch(f).includes(normalizeSearch(query)));
  return (
    <>
      <SearchField value={query} onChange={setQuery} label="Search fruits" sticky />
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
        <Badge>Draft</Badge>
        <Badge tone="tint">New</Badge>
        <Badge tone="success">Paid</Badge>
        <Badge tone="warning">Pending</Badge>
        <Badge tone="danger">Declined</Badge>
      </HStack>
    </Pad>
  );
}

function DatePickerDemo() {
  const [date, setDate] = useState("");
  return (
    <List>
      <Section>
        <Row title="Due date" accessory={<DatePicker value={date} onChange={setDate} locale="en-US" />} />
      </Section>
    </List>
  );
}

function TimePickerDemo() {
  const [time, setTime] = useState("");
  return (
    <List>
      <Section>
        <Row title="Reminder" accessory={<TimePicker value={time} onChange={setTime} />} />
      </Section>
    </List>
  );
}

const PAISES = ["Argentina", "Australia", "Brazil", "Canada", "Chile", "France", "Germany", "India", "Italy", "Japan", "Mexico", "Portugal", "Spain", "United Kingdom", "United States"];

function ListPickerDemo() {
  const [country, setCountry] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <>
      <List>
        <Section>
          <PickerRow label="Country" value={country} onClick={() => setOpen(true)} />
        </Section>
      </List>
      <Sheet isPresented={open} onDismiss={() => setOpen(false)} title="Country">
        <ListPicker
          label="Country"
          options={PAISES.map((c) => ({ value: c, label: c }))}
          selection={country}
          onChange={(c) => {
            setCountry(c);
            setOpen(false);
          }}
        />
      </Sheet>
    </>
  );
}

function OptionsSheetDemo() {
  const [sort, setSort] = useState<"date" | "name" | "size">("date");
  const [open, setOpen] = useState(false);
  return (
    <>
      <List>
        <Section>
          <Row title="Sort by" value={{ date: "Date", name: "Name", size: "Size" }[sort]} onClick={() => setOpen(true)} chevron />
        </Section>
      </List>
      <OptionsSheet
        isPresented={open}
        onDismiss={() => setOpen(false)}
        title="Sort by"
        selection={sort}
        onChange={setSort}
        options={[
          { value: "date", label: "Date", description: "Newest first" },
          { value: "name", label: "Name" },
          { value: "size", label: "Size", description: "Largest first" },
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
        <Button onClick={() => setIsPresented(true)}>Share</Button>
      </Pad>
      <Sheet isPresented={isPresented} onDismiss={() => setIsPresented(false)} title="Share" icon={COMPARTILHAR} description="Drag the handle down to close.">
        <List>
          <Section>
            <Row title="Copy link" onClick={() => setIsPresented(false)} />
            <Row title="Send by email" onClick={() => setIsPresented(false)} />
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
        <Button onClick={() => setOpen(true)}>Send $250</Button>
      </Pad>
      <ConfirmationSheet
        isPresented={open}
        onDismiss={() => setOpen(false)}
        onConfirm={send}
        state={state}
        title="Send money"
        items={[
          { label: "To", value: "Ana Souza" },
          { label: "Amount", value: "$250.00" },
        ]}
        confirmLabel="Send"
        loadingLabel="Sending…"
        doneLabel="Sent"
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
          Delete photo
        </Button>
      </Pad>
      <Alert
        isPresented={open}
        onDismiss={() => setOpen(false)}
        title="Delete this photo?"
        message="It will be removed from all your devices."
        actions={[{ label: "Cancel", role: "cancel" }, { label: "Delete", role: "destructive", onPress: () => undefined }]}
      />
    </>
  );
}

function ToastDemo() {
  const { show } = useToast();
  const upload = () => {
    const toast = show("Uploading…", "progress");
    setTimeout(() => toast.update("Uploaded", "success"), 1500);
  };
  return (
    <Pad>
      <Button onClick={() => show("Saved")}>Show toast</Button>
      <Button variant="bordered" onClick={upload}>
        Show progress
      </Button>
      <Button variant="plain" onClick={() => show("No connection", "error", { label: "Retry", onPress: () => undefined })}>
        Show error
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
      <Section header="Contacts" headerAccessory={<button type="button" onClick={() => setLoading(true)} style={{ border: 0, background: "none", color: "var(--st-tint)", font: "inherit", fontSize: 15, cursor: "pointer" }}>Reload</button>}>
        <Redacted isLoading={loading} placeholder={<SkeletonList rows={3} leading="circle" />}>
          {["Ana", "Leo", "Maya"].map((n) => (
            <Row key={n} leading={<Avatar name={n} />} title={n} subtitle="Mobile" />
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
        <ProgressView />
        <Text color="secondary">Loading…</Text>
      </HStack>
    </Pad>
  );
}

function ContentUnavailableDemo() {
  return <ContentUnavailableView title="No messages" description="Messages you receive show up here." icon={LISTA} actions={<Button>Compose</Button>} />;
}

function TimelineDemo() {
  return (
    <List>
      <Section header="Delivery">
        <Timeline
          steps={[
            { title: "Ordered", detail: "Today, 9:12", state: "done" },
            { title: "Shipped", detail: "Today, 14:30", state: "done" },
            { title: "Out for delivery", detail: "Arrives by 6 pm", state: "current" },
            { title: "Delivered", state: "upcoming" },
          ]}
        />
      </Section>
    </List>
  );
}

function ProgressStepsDemo() {
  return (
    <Pad>
      <ProgressSteps steps={[{ text: "Tap the Share button", icon: COMPARTILHAR }, { text: "Choose Add to Home Screen", icon: MAIS }, { text: "Open the app from the icon" }]} />
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
      <AsyncImage src="https://picsum.photos/seed/stackui/800/450" alt="A landscape" aspectRatio="16 / 9" width="100%" radius={16} fit="cover" showProgress />
    </Pad>
  );
}

function InstallGateDemo() {
  return (
    <InstallGate appName="Wallet">
      <p>Your app</p>
    </InstallGate>
  );
}

function BarcodeDemo() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  return (
    <>
      <List>
        <Section footer="Allow the camera when the browser asks.">
          <Row title="Scan a barcode" onClick={() => setOpen(true)} chevron />
          {code && <Row title="Code" value={code} />}
        </Section>
      </List>
      <Sheet isPresented={open} onDismiss={() => setOpen(false)} title="Scan">
        {open && (
          <BarcodeScanner
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
      <Toggle isOn={on} onChange={setOn} label="Sample" />
      <Button>Accent color</Button>
      <Text color="tint">Links and highlights use it too.</Text>
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
