# Sheet

A panel that slides up over the screen. Drag it down, tap outside, press Esc or use the Android back gesture to close it.

@example sheet 460
```tsx
import { Button, List, Row, Section, Sheet } from "stackui-kit";

const [isPresented, setIsPresented] = useState(false);

<Button onClick={() => setIsPresented(true)}>Share</Button>

<Sheet isPresented={isPresented} onDismiss={() => setIsPresented(false)}
  title="Share" icon={<ShareIcon />} description="Drag the handle down to close.">
  <List>
    <Section>
      <Row title="Copy link" onClick={copy} />
      <Row title="Send by email" onClick={email} />
    </Section>
  </List>
</Sheet>
```

## Inner screens

A sheet can have a screen behind another: pass `onBack` and swap its content. The back button appears on the left.

## Reference

@props Sheet
