# NavigationStack

Telas animadas como uma pilha nativa: abrir desliza a nova tela para dentro, voltar desliza para fora, trocar de aba cruza as duas. Funciona com qualquer roteador.

@example navigation-stack 420
```tsx
import { NavigationStack } from "@stackui/react";

const endereco = useHash(); // ou useLocation().pathname

<NavigationStack
  location={endereco}
  render={(caminho) => (caminho.split("/")[2] ? <Pessoa nome={caminho.split("/")[2]} /> : <Pessoas />)}
/>
```

> **Dica:** Com React Router, devolva `<Routes location={endereco}>` no `render`, para a tela que sai manter a própria rota durante a animação. Veja [Navegação](/docs/navigation).

## Referência

@props NavigationStack
