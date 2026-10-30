# OptionsSheet

A choice in a sheet, such as a sort order or a filter. Choosing closes it.

@example options-sheet 480
```tsx
import { OptionsSheet, Row } from "stackui-kit";

<Row title="Sort by" value={labels[sort]} onClick={() => setOpen(true)} chevron />

<OptionsSheet isPresented={open} onDismiss={() => setOpen(false)}
  title="Sort by" selection={sort} onChange={setSort}
  options={[
    { value: "date", label: "Date", description: "Newest first" },
    { value: "name", label: "Name" },
    { value: "size", label: "Size", description: "Largest first" },
  ]} />
```

> **Tip:** Open it from a `ToolbarButton` with `dot` while a filter is on, so people know the list is filtered.

## Reference

@props OptionsSheet
