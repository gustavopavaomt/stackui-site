# Layout

Screens are built from stacks, the same way native apps are: a vertical stack of sections, a horizontal stack with a spacer in the middle. No CSS required.

@example text-and-stacks 260
```tsx
import { HStack, Spacer, Text, VStack } from "stackui";

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

## Stacks

- `VStack` lays children out top to bottom; `HStack`, left to right, centered vertically.
- `spacing` is the gap in px; `alignment` lines children up (`leading`, `center`, `trailing`, `stretch`).
- `Spacer` takes all the free space: put it between two items to push them apart.
- `ZStack` layers children on top of each other; `Divider` draws a hairline.

## Text

`Text` uses the platform text styles, from `largeTitle` to `caption2`, and semantic colors (`primary`, `secondary`, `tertiary`, `tint`, `danger`) that follow light and dark. Titles render as headings, so screen readers can jump between them.

> **Tip:** Prefer a `List` with `Section`s for most screens. Stacks are for what goes inside a card or a header.

See [Text and stacks](/docs/text-and-stacks) for every option.
