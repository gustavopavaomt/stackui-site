# Introduction

StackUI is a set of React components for building Progressive Web Apps that look and feel native on iOS and Android: screens that slide, sheets you drag to close, grouped lists, toasts, pickers and lists of thousands of rows that never stutter.

You write React as usual. StackUI gives you the building blocks of a phone app, already styled, animated and accessible, so a web app installed from the browser feels at home next to the apps from the store.

## How to use these docs

Start with **The Basics**, in order: each page builds on the previous one, from installing the package to a complete app. Then use **Components** as a reference: every component has a live example, the code to copy and the list of its props.

> **Tip:** Every example on these pages is live. Tap it, drag it, type in it. What you see is the code next to it, running.

## What you need

- React 19 (`react` and `react-dom`). That is the only dependency.
- Any bundler that imports CSS, such as Vite or Next.js.
- Any router, or none. StackUI never imports one.

## Your first screen

This is a complete screen. The next pages explain each piece.

@example first-screen 360
```tsx
import { useState } from "react";
import { List, NavigationBar, Row, Section, Toggle } from "stackui";

export function Settings() {
  const [alerts, setAlerts] = useState(true);
  return (
    <>
      <NavigationBar title="Settings" />
      <List>
        <Section header="General" footer="You can change this at any time.">
          <Row title="Notifications"
            accessory={<Toggle isOn={alerts} onChange={setAlerts} label="Notifications" />} />
          <Row title="Language" value="English" href="/language" />
        </Section>
      </List>
    </>
  );
}
```

Next, [install StackUI](/docs/installation) in your project.
