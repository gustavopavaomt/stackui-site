# Toggle

Uma chave de liga e desliga para algo que vale na hora.

@example toggle 200
```tsx
import { Row, Toggle } from "stackui";

const [ligado, setLigado] = useState(true);

<Row title="Wi-Fi" accessory={<Toggle isOn={ligado} onChange={setLigado} label="Wi-Fi" />} />
```

## Referência

@props Toggle
