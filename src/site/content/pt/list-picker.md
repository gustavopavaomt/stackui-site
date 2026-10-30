# ListPicker

Escolher numa lista longa: a busca em cima, a lista embaixo, aberta na escolha atual. Abra numa folha a partir de uma `PickerRow`.

@example list-picker 560
```tsx
import { ListPicker, PickerRow, Section, Sheet } from "stackui";

<Section>
  <PickerRow label="País" value={pais} placeholder="Escolher" onClick={() => setAberta(true)} />
</Section>

<Sheet isPresented={aberta} onDismiss={() => setAberta(false)} title="País" closeLabel="Fechar">
  <ListPicker label="País" selection={pais}
    options={paises.map((p) => ({ value: p, label: p }))}
    onChange={(p) => { setPais(p); setAberta(false); }}
    searchPlaceholder="Buscar" emptyText="Nada com esse nome"
    countText={(n, total) => (n === total ? `${total} itens` : `${n} de ${total}`)} />
</Sheet>
```

## Referência

@props PickerRow

@props ListPicker
