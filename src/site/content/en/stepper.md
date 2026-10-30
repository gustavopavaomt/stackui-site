# Stepper

Minus, the number and plus. The number can also be typed, with a comma or a dot.

@example stepper 200
```tsx
import { Row, Stepper } from "stackui-kit";

const [guests, setGuests] = useState(2);

<Row title="Guests" accessory={<Stepper label="Guests" value={guests} onChange={setGuests} min={1} max={8} />} />
```

## Reference

@props Stepper
