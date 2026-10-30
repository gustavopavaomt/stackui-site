# TabBar

The bottom bar of the main sections: a floating capsule where the selected tab is a pill that slides from tab to tab.

@example tab-bar 300
```tsx
import { TabBar } from "@stackui/react";

const [tab, setTab] = useState("home");

<TabBar
  selection={tab}
  onSelect={setTab}
  items={[
    { id: "home", label: "Home", icon: <HomeIcon /> },
    { id: "activity", label: "Activity", icon: <ListIcon />, badge: 3 },
    { id: "settings", label: "Settings", icon: <GearIcon /> },
  ]}
/>
```

> **Tip:** With a router, give each item `as: Link` and `props: { to: "/home" }`, and derive `selection` from the location.

## Reference

@props TabBar
