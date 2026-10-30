# NavigationBar

O topo de uma tela: o título, o voltar e a barra de ferramentas. Transparente parada; quando o conteúdo passa por baixo, vira vidro fosco e o título grande entra na barra.

@example navigation-bar 420
```tsx
import { List, NavigationBar, ToolbarButton } from "@stackui/react";

<NavigationBar
  title="Entrada"
  trailing={<ToolbarButton label="Nova mensagem" icon={<IconeMais />} prominent />}
/>
<List>…</List>
```

## Botão de voltar

Passe `onBack`, `backHref`, ou o link do seu roteador com `backAs` e `backProps`. Traduza o nome com `backLabel="Voltar"`. Telas com voltar mostram o título grande abaixo da barra; use `displayMode="inline"` para um título pequeno desde o início.

## Referência

@props NavigationBar

@props ToolbarButton
