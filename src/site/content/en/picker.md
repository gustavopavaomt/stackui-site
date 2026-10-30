# Picker

A segmented control: two to four short options that exclude each other. The selection slides between them.

@example picker 220
```tsx
import { Picker } from "stackui-kit";

const [period, setPeriod] = useState<"day" | "week" | "month">("week");

<Picker label="Period" selection={period} onChange={setPeriod}
  options={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]} />
```

## Reference

@props Picker
