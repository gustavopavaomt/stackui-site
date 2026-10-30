# Toggle

An on and off switch for something that takes effect at once.

@example toggle 200
```tsx
import { Row, Toggle } from "@stackui/react";

const [isOn, setIsOn] = useState(true);

<Row title="Wi-Fi" accessory={<Toggle isOn={isOn} onChange={setIsOn} label="Wi-Fi" />} />
```

## Reference

@props Toggle
