# Forms and input

Forms are lists too: fields and controls live in sections, and the button that saves goes below.

@example text-field 260
```tsx
import { List, Section, TextField } from "stackui-kit";

const [email, setEmail] = useState("");
const invalid = email.length > 0 && !email.includes("@");

<List>
  <Section>
    <TextField label="Email" type="email" value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={invalid ? "Type a valid email" : undefined} />
    <TextField label="Password" type="password" />
  </Section>
</List>
```

## The controls

- `TextField` and `TextEditor` for text, with a floating label and an error message.
- `Toggle` for on and off, `Stepper` for small numbers, `Picker` for two to four options.
- `DatePicker`, `TimePicker` and `ListPicker` open a sheet, the same on every phone.
- `SearchField` filters a list as you type.

## Saving

Give the save button a `state`. It shows a spinner while saving and a check when done, without changing size, so nothing on the screen jumps:

@example button 340
```tsx
import { Button, type ButtonState } from "stackui-kit";

const [state, setState] = useState<ButtonState>("idle");

async function save() {
  setState("loading");
  await api.save(form);
  setState("done");
  setTimeout(() => setState("idle"), 1500);
}

<Button state={state} onClick={save} loadingLabel="Saving…" doneLabel="Saved">Save</Button>
```

> **Tip:** Before saving something important, confirm it with a [ConfirmationSheet](/docs/confirmation-sheet).
