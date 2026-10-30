# TabBar

A barra de baixo das seções principais: uma cápsula flutuante em que a aba escolhida é uma pílula que desliza de aba em aba.

@example tab-bar 300
```tsx
import { TabBar } from "@stackui/react";

const [aba, setAba] = useState("home");

<TabBar
  selection={aba}
  onSelect={setAba}
  label="Principal"
  items={[
    { id: "home", label: "Início", icon: <IconeCasa /> },
    { id: "activity", label: "Atividade", icon: <IconeLista />, badge: 3 },
    { id: "settings", label: "Ajustes", icon: <IconeEngrenagem /> },
  ]}
/>
```

> **Dica:** Com um roteador, dê a cada item `as: Link` e `props: { to: "/inicio" }`, e calcule `selection` a partir do endereço.

## Referência

@props TabBar
