# Button

Um botão que mostra o próprio progresso: carregando enquanto trabalha e um check quando termina, sem mudar de tamanho.

@example button 340
```tsx
import { Button, type ButtonState } from "@stackui/react";

const [estado, setEstado] = useState<ButtonState>("idle");

<Button state={estado} onClick={salvar} loadingLabel="Salvando…" doneLabel="Salvo">Salvar</Button>
<Button variant="bordered">Com fundo</Button>
<Button variant="plain">Simples</Button>
<Button variant="destructive">Apagar</Button>
```

## Referência

@props Button
