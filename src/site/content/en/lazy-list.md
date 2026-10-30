# LazyList

A list of thousands of rows that stays smooth: only the rows on screen exist, and they are recycled as you scroll.

@example lazy-list 420
```tsx
import { Avatar, LazyList, List, Row, Section } from "stackui";

<List>
  <Section header="20,000 people" plain>
    <LazyList
      items={people}
      id={(p) => p.id}
      estimatedRowHeight={61}
      render={(p) => <Row leading={<Avatar name={p.name} />} title={p.name} subtitle={p.city} lineLimit={1} />}
    />
  </Section>
</List>
```

> **Note:** Lists of up to 30 items are drawn whole. Put the `LazyList` in a `Section` with `plain`: it draws its own card.

## Reference

@props LazyList
