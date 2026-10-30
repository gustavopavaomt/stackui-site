# SearchField

A cápsula de busca. Com `sticky`, fica presa abaixo da barra de navegação, some ao descer e volta ao subir.

@example search-field 420
```tsx
import { normalizeSearch, Row, SearchField, Section } from "@stackui/react";

const [busca, setBusca] = useState("");
const visiveis = frutas.filter((f) => normalizeSearch(f).includes(normalizeSearch(busca)));

<SearchField value={busca} onChange={setBusca} label="Buscar frutas"
  placeholder="Buscar" clearLabel="Limpar busca" sticky />
<Section>
  {visiveis.map((f) => <Row key={f} title={f} />)}
</Section>
```

> **Dica:** `normalizeSearch` ignora acentos e maiúsculas, então "sao" encontra "São Paulo".

## Referência

@props SearchField
