# Toast

A short message that rises from the bottom and leaves on its own. Toasts wait in line, and one can change in place while a task runs.

@example toast 320
```tsx
import { Button, useToast } from "stackui";

const { show } = useToast();

<Button onClick={() => show("Saved")}>Show toast</Button>

const toast = show("Uploading…", "progress");
await upload();
toast.update("Uploaded", "success");

show("No connection", "error", { label: "Retry", onPress: retry });
```

> **Note:** `useToast` works inside a `ToastProvider`. See [Installation](/docs/installation).

## Reference

@props ToastProvider

@props useToast
