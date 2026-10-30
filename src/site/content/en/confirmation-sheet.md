# ConfirmationSheet

Check before saving: what will happen, as receipt lines, and a button that shows the progress. Nothing closes it while saving.

@example confirmation-sheet 560
```tsx
import { Button, ConfirmationSheet, type ButtonState } from "stackui";

const [state, setState] = useState<ButtonState>("idle");

<ConfirmationSheet isPresented={open} onDismiss={() => setOpen(false)}
  onConfirm={send} state={state}
  title="Send money"
  items={[
    { label: "To", value: "Ana Souza" },
    { label: "Amount", value: "$250.00" },
  ]}
  confirmLabel="Send" loadingLabel="Sending…" doneLabel="Sent" />
```

## Reference

@props ConfirmationSheet
