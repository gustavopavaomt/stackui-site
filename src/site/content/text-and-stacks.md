# Text and stacks

The layout primitives: `VStack`, `HStack`, `ZStack`, `Spacer`, `Divider` and `Text`.

@example text-and-stacks 260
```tsx
import { HStack, Spacer, Text, VStack } from "@stackui/react";

<VStack spacing={12} style={{ padding: 16 }}>
  <VStack spacing={4} alignment="leading">
    <Text font="largeTitle">Good morning</Text>
    <Text color="secondary">Here is your day.</Text>
  </VStack>
  <HStack spacing={8}>
    <Text font="headline">Balance</Text>
    <Spacer />
    <Text color="tint">$1,280.00</Text>
  </HStack>
</VStack>
```

## Text styles

`largeTitle`, `title`, `title2`, `title3`, `headline`, `body`, `callout`, `subheadline`, `footnote`, `caption` and `caption2`, from the largest to the smallest.

## Reference

@props Text

@props VStack
