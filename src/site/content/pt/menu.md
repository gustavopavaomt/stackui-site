# Menu

Um botão da barra de ferramentas que abre um menu de ações preso a ele. Ações destrutivas ficam em vermelho.

@example menu 320
```tsx
import { Menu, NavigationBar } from "@stackui/react";

<NavigationBar
  title="Nota"
  trailing={
    <Menu label="Mais" icon={<IconeReticencias />} items={[
      { label: "Editar", icon: <IconeLapis />, onPress: editar },
      { label: "Duplicar", icon: <IconeCopiar />, onPress: duplicar },
      { label: "Apagar", icon: <IconeLixo />, destructive: true, onPress: apagar },
    ]} />
  }
/>
```

## Referência

@props Menu
