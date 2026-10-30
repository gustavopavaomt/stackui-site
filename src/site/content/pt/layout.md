# Layout

As telas são montadas com pilhas, como nos apps nativos: uma pilha vertical de seções, uma pilha horizontal com um espaço no meio. Sem escrever CSS.

@example text-and-stacks 260
```tsx
import { HStack, Spacer, Text, VStack } from "stackui-kit";

<VStack spacing={12} style={{ padding: 16 }}>
  <VStack spacing={4} alignment="leading">
    <Text font="largeTitle">Bom dia</Text>
    <Text color="secondary">Este é o seu dia.</Text>
  </VStack>
  <HStack spacing={8}>
    <Text font="headline">Saldo</Text>
    <Spacer />
    <Text color="tint">R$ 1.280,00</Text>
  </HStack>
</VStack>
```

## Pilhas

- `VStack` organiza de cima para baixo; `HStack`, da esquerda para a direita, centralizado na vertical.
- `spacing` é o espaço em px; `alignment` alinha os filhos (`leading`, `center`, `trailing`, `stretch`).
- `Spacer` ocupa todo o espaço livre: coloque entre dois itens para afastá-los.
- `ZStack` empilha um sobre o outro; `Divider` desenha uma linha fina.

## Texto

`Text` usa os estilos de texto da plataforma, de `largeTitle` a `caption2`, e cores com significado (`primary`, `secondary`, `tertiary`, `tint`, `danger`) que acompanham o claro e o escuro. Títulos viram cabeçalhos, para os leitores de tela pularem entre eles.

> **Dica:** Na maioria das telas, prefira uma `List` com `Section`s. As pilhas são para o que vai dentro de um cartão ou de um cabeçalho.

Veja [Texto e pilhas](/docs/text-and-stacks) para todas as opções.
