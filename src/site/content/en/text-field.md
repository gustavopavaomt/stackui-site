# TextField

A text field for a list, with a label that floats up when you type, and an error message under it. `TextEditor` is the tall version for notes.

@example text-field 260
```tsx
import { Section, TextField } from "@stackui/react";

<Section>
  <TextField label="Email" type="email" value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={invalid ? "Type a valid email" : undefined} />
  <TextField label="Password" type="password" />
</Section>
```

## Reference

@props TextField
