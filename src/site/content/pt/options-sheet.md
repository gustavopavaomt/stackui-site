# OptionsSheet

Uma escolha numa folha, como ordenação ou filtro. Escolher fecha a folha.

@example options-sheet 480
```tsx
import { OptionsSheet, Row } from "@stackui/react";

<Row title="Ordenar por" value={nomes[ordem]} onClick={() => setAberta(true)} chevron />

<OptionsSheet isPresented={aberta} onDismiss={() => setAberta(false)}
  title="Ordenar por" selection={ordem} onChange={setOrdem}
  options={[
    { value: "date", label: "Data", description: "Mais recentes primeiro" },
    { value: "name", label: "Nome" },
    { value: "size", label: "Tamanho", description: "Maiores primeiro" },
  ]} />
```

> **Dica:** Abra a partir de um `ToolbarButton` com `dot` enquanto um filtro estiver ligado, para as pessoas saberem que a lista está filtrada.

## Referência

@props OptionsSheet
