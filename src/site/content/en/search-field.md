# SearchField

The search capsule. With `sticky`, it stays under the navigation bar, hides as you scroll down and comes back as you scroll up.

@example search-field 420
```tsx
import { normalizeSearch, Row, SearchField, Section } from "stackui-kit";

const [query, setQuery] = useState("");
const shown = fruits.filter((f) => normalizeSearch(f).includes(normalizeSearch(query)));

<SearchField value={query} onChange={setQuery} label="Search fruits" sticky />
<Section>
  {shown.map((f) => <Row key={f} title={f} />)}
</Section>
```

> **Tip:** `normalizeSearch` ignores accents and case, so "sao" finds "São Paulo".

## Reference

@props SearchField
