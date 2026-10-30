# Lists

Most screens in a phone app are lists: settings, messages, transactions. In StackUI, a screen is a `List` of `Section`s, and each section is a card of `Row`s.

@example list 380
```tsx
import { List, Row, Section, Toggle } from "@stackui/react";

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

## What a row can hold

- `title` and `subtitle` on the left; `value` in gray on the right.
- `icon` with `iconColor`, in a rounded square, or `leading` for a larger element like an `Avatar`.
- `accessory` for a control on the right: `Toggle`, `Stepper`, `Badge`, `DatePicker`.
- `href` (or `as` with your router's link) makes it a link with a chevron; `onClick` makes it a button.

## Long lists

A list of thousands of rows needs `LazyList`: it draws only the rows on screen and recycles them as you scroll, like native lists do.

@example lazy-list 420
```tsx
import { Avatar, LazyList, List, Row, Section } from "@stackui/react";

<List>
  <Section header="20,000 people" plain>
    <LazyList
      items={people}
      id={(p) => p.id}
      estimatedRowHeight={61}
      render={(p) => <Row leading={<Avatar name={p.name} />} title={p.name} subtitle={p.city} lineLimit={1} />}
    />
  </Section>
</List>
```

> **Note:** Every row of a `LazyList` has the same height. Use `lineLimit={1}` so a long name doesn't make one row taller than the others.
