# Timeline

Onde algo está, como o rastreio de uma entrega: cada etapa com seu marcador, a que está em andamento pulsando.

@example timeline 340
```tsx
import { Section, Timeline } from "@stackui/react";

<Section header="Entrega">
  <Timeline steps={[
    { title: "Pedido feito", detail: "Hoje, 9:12", state: "done" },
    { title: "Enviado", detail: "Hoje, 14:30", state: "done" },
    { title: "Saiu para entrega", detail: "Chega até 18h", state: "current" },
    { title: "Entregue", state: "upcoming" },
  ]} />
</Section>
```

## Referência

@props Timeline
