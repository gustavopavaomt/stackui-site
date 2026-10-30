# ProgressSteps

"Do this, then this": numbered steps in a card, with a symbol when the gesture has one on the device.

@example progress-steps 260
```tsx
import { ProgressSteps } from "@stackui/react";

<ProgressSteps steps={[
  { text: "Tap the Share button", icon: <ShareIcon /> },
  { text: "Choose Add to Home Screen", icon: <PlusIcon /> },
  { text: "Open the app from the icon" },
]} />
```

## Reference

@props ProgressSteps
