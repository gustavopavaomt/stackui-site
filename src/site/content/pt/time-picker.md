# TimePicker

Um botão de hora compacto que abre duas rodas, horas e minutos, numa folha.

@example time-picker 560
```tsx
import { Row, TimePicker } from "stackui";

const [hora, setHora] = useState(""); // "09:30"

<Row title="Lembrete" accessory={
  <TimePicker value={hora} onChange={setHora}
    title="Hora" nowLabel="Agora" clearLabel="Limpar" doneLabel="Pronto" />
} />
```

## Referência

@props TimePicker
