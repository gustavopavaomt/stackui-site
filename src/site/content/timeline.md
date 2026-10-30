# Timeline

Where something is, like tracking a delivery: each step with its marker, the one in progress pulsing.

@example timeline 340
```tsx
import { Section, Timeline } from "@stackui/react";

<Section header="Delivery">
  <Timeline steps={[
    { title: "Ordered", detail: "Today, 9:12", state: "done" },
    { title: "Shipped", detail: "Today, 14:30", state: "done" },
    { title: "Out for delivery", detail: "Arrives by 6 pm", state: "current" },
    { title: "Delivered", state: "upcoming" },
  ]} />
</Section>
```

## Reference

@props Timeline
