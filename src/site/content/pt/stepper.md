# Stepper

Menos, o número e mais. O número também pode ser digitado, com vírgula ou ponto.

@example stepper 200
```tsx
import { Row, Stepper } from "stackui-kit";

const [convidados, setConvidados] = useState(2);

<Row title="Convidados" accessory={
  <Stepper label="Convidados" value={convidados} onChange={setConvidados} min={1} max={8}
    decrementLabel="Diminuir" incrementLabel="Aumentar" />
} />
```

## Referência

@props Stepper
