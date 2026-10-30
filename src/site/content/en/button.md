# Button

A button that can show its own progress: a spinner while working and a check when done, without changing size.

@example button 340
```tsx
import { Button, type ButtonState } from "stackui";

const [state, setState] = useState<ButtonState>("idle");

<Button state={state} onClick={save} loadingLabel="Saving…" doneLabel="Saved">Save</Button>
<Button variant="bordered">Bordered</Button>
<Button variant="plain">Plain</Button>
<Button variant="destructive">Delete</Button>
```

## Reference

@props Button
