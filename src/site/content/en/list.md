# List and Row

A screen of grouped content: a `List` of `Section`s, each one a card of `Row`s.

@example list 380
```tsx
import { List, Row, Section, Toggle } from "stackui-kit";

<List>
  <Section header="Account" footer="Your data stays on this device.">
    <Row icon={<FaceIdIcon />} iconColor="var(--st-green)" title="Face ID"
      accessory={<Toggle isOn={faceId} onChange={setFaceId} label="Face ID" />} />
    <Row icon={<BellIcon />} iconColor="var(--st-red)" title="Notifications" value="On" href="/notifications" />
    <Row icon={<CardIcon />} iconColor="var(--st-blue)" title="Cards" subtitle="2 cards" href="/cards" />
  </Section>
  <Section>
    <Row title="Sign out" centered onClick={signOut} />
  </Section>
</List>
```

## Reference

@props Section

@props Row
