# TimePicker

A compact time button that opens two wheels, hours and minutes, in a sheet.

@example time-picker 560
```tsx
import { Row, TimePicker } from "stackui-kit";

const [time, setTime] = useState(""); // "09:30"

<Row title="Reminder" accessory={<TimePicker value={time} onChange={setTime} />} />
```

## Reference

@props TimePicker
