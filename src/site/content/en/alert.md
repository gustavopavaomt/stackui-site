# Alert

A dialog in the middle of the screen for something that must be read now.

@example alert 360
```tsx
import { Alert } from "stackui-kit";

<Alert isPresented={open} onDismiss={() => setOpen(false)}
  title="Delete this photo?" message="It will be removed from all your devices."
  actions={[
    { label: "Cancel", role: "cancel" },
    { label: "Delete", role: "destructive", onPress: deletePhoto },
  ]} />
```

## Reference

@props Alert
