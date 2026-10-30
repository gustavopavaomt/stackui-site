# List e Row

Uma tela de conteúdo agrupado: uma `List` de `Section`s, cada uma um cartão de `Row`s.

@example list 380
```tsx
import { List, Row, Section, Toggle } from "@stackui/react";

<List>
  <Section header="Conta" footer="Seus dados ficam neste aparelho.">
    <Row icon={<IconeRosto />} iconColor="var(--st-green)" title="Face ID"
      accessory={<Toggle isOn={faceId} onChange={setFaceId} label="Face ID" />} />
    <Row icon={<IconeSino />} iconColor="var(--st-red)" title="Notificações" value="Ligadas" href="/notificacoes" />
    <Row icon={<IconeCartao />} iconColor="var(--st-blue)" title="Cartões" subtitle="2 cartões" href="/cartoes" />
  </Section>
  <Section>
    <Row title="Sair" centered onClick={sair} />
  </Section>
</List>
```

## Referência

@props Section

@props Row
