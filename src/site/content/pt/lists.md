# Listas

A maioria das telas de um app são listas: ajustes, mensagens, lançamentos. Na StackUI, uma tela é uma `List` de `Section`s, e cada seção é um cartão de `Row`s.

@example list 380
```tsx
import { List, Row, Section, Toggle } from "stackui-kit";

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

## O que uma linha mostra

- `title` e `subtitle` à esquerda; `value` em cinza à direita.
- `icon` com `iconColor`, num quadrado arredondado, ou `leading` para algo maior, como um `Avatar`.
- `accessory` para um controle à direita: `Toggle`, `Stepper`, `Badge`, `DatePicker`.
- `href` (ou `as` com o link do seu roteador) vira link com seta; `onClick` vira botão.

## Listas longas

Uma lista de milhares de linhas precisa da `LazyList`: ela desenha só as linhas da tela e as reaproveita enquanto você rola, como as listas nativas.

@example lazy-list 420
```tsx
import { Avatar, LazyList, List, Row, Section } from "stackui-kit";

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

> **Nota:** Todas as linhas de uma `LazyList` têm a mesma altura. Use `lineLimit={1}` para um nome comprido não deixar uma linha mais alta que as outras.
