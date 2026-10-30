# ProgressSteps

"Faça isto, depois isto": passos numerados num cartão, com um símbolo quando o gesto tem um no aparelho.

@example progress-steps 260
```tsx
import { ProgressSteps } from "stackui-kit";

<ProgressSteps steps={[
  { text: "Toque em Compartilhar", icon: <IconeCompartilhar /> },
  { text: "Escolha Adicionar à Tela de Início", icon: <IconeMais /> },
  { text: "Abra o app pelo ícone" },
]} />
```

## Referência

@props ProgressSteps
