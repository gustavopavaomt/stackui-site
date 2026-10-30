# Menu

A toolbar button that opens a menu of actions anchored to it. Destructive actions are red.

@example menu 320
```tsx
import { Menu, NavigationBar } from "@stackui/react";

<NavigationBar
  title="Note"
  trailing={
    <Menu label="More" icon={<EllipsisIcon />} items={[
      { label: "Edit", icon: <PencilIcon />, onPress: edit },
      { label: "Duplicate", icon: <CopyIcon />, onPress: duplicate },
      { label: "Delete", icon: <TrashIcon />, destructive: true, onPress: remove },
    ]} />
  }
/>
```

## Reference

@props Menu
