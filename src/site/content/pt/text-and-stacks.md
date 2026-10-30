# Texto e pilhas

As peças básicas de layout: `VStack`, `HStack`, `ZStack`, `Spacer`, `Divider` e `Text`.

@example text-and-stacks 260
```tsx
import { HStack, Spacer, Text, VStack } from "stackui";

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

## Estilos de texto

`largeTitle`, `title`, `title2`, `title3`, `headline`, `body`, `callout`, `subheadline`, `footnote`, `caption` e `caption2`, do maior para o menor.

## Referência

@props Text

@props VStack
