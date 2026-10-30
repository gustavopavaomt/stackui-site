# Picker

Um controle segmentado: duas a quatro opções curtas que se excluem. A escolha desliza entre elas.

@example picker 220
```tsx
import { Picker } from "@stackui/react";

const [periodo, setPeriodo] = useState<"day" | "week" | "month">("week");

<Picker label="Período" selection={periodo} onChange={setPeriodo}
  options={[
    { value: "day", label: "Dia" },
    { value: "week", label: "Semana" },
    { value: "month", label: "Mês" },
  ]} />
```

## Referência

@props Picker
