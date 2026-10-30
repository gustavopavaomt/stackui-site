# DatePicker

A compact date button that opens a calendar in a sheet, the same on iPhone and Android, in any language.

@example date-picker 560
```tsx
import { DatePicker, Row } from "@stackui/react";

const [date, setDate] = useState(""); // "2026-10-30"

<Row title="Due date" accessory={<DatePicker value={date} onChange={setDate} locale="en-US" />} />
```

## Reference

@props DatePicker
