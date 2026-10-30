# ListPicker

Choosing from a long list: a search on top, the list below, opened at the current choice. Open it in a sheet from a `PickerRow`.

@example list-picker 560
```tsx
import { ListPicker, PickerRow, Section, Sheet } from "stackui";

<Section>
  <PickerRow label="Country" value={country} onClick={() => setOpen(true)} />
</Section>

<Sheet isPresented={open} onDismiss={() => setOpen(false)} title="Country">
  <ListPicker label="Country" selection={country}
    options={countries.map((c) => ({ value: c, label: c }))}
    onChange={(c) => { setCountry(c); setOpen(false); }} />
</Sheet>
```

## Reference

@props PickerRow

@props ListPicker
