# DatePicker

Um botão de data compacto que abre um calendário numa folha, igual no iPhone e no Android, em qualquer idioma.

@example date-picker 560
```tsx
import { DatePicker, Row } from "@stackui/react";

const [data, setData] = useState(""); // "2026-10-30"

<Row title="Vencimento" accessory={
  <DatePicker value={data} onChange={setData} locale="pt-BR"
    title="Data" placeholder="Escolher"
    shortcuts={[{ label: "Hoje", value: hoje }, { label: "Ontem", value: ontem }]} />
} />
```

> **Dica:** Com `locale="pt-BR"`, os meses e os dias da semana saem em português.

## Referência

@props DatePicker
