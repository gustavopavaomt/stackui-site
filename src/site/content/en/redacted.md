# Skeleton and Redacted

The shape of the content while it loads. `Redacted` waits a moment before showing the placeholder, so fast loads never flash.

@example redacted 360
```tsx
import { Avatar, Redacted, Row, Section, SkeletonList } from "@stackui/react";

<Section header="Contacts">
  <Redacted isLoading={!contacts} placeholder={<SkeletonList rows={3} leading="circle" />}>
    {contacts?.map((c) => <Row key={c.id} leading={<Avatar name={c.name} />} title={c.name} />)}
  </Redacted>
</Section>
```

`Skeleton` draws a single block and `SkeletonText` a few lines, for anything that isn't a list.

## Reference

@props Redacted

@props SkeletonList
