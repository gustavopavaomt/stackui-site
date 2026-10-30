# LazyList

Uma lista de milhares de linhas que não trava: só existem as linhas da tela, e elas são reaproveitadas enquanto você rola.

@example lazy-list 420
```tsx
import { Avatar, LazyList, List, Row, Section } from "@stackui/react";

<List>
  <Section header="20 mil pessoas" plain>
    <LazyList
      items={pessoas}
      id={(p) => p.id}
      estimatedRowHeight={61}
      render={(p) => <Row leading={<Avatar name={p.nome} />} title={p.nome} subtitle={p.cidade} lineLimit={1} />}
    />
  </Section>
</List>
```

> **Nota:** Listas de até 30 itens são desenhadas inteiras. Coloque a `LazyList` numa `Section` com `plain`: ela desenha o próprio cartão.

## Referência

@props LazyList
