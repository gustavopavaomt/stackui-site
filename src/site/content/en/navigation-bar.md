# NavigationBar

The top of a screen: the title, the back button and the toolbar. Transparent at rest; once content scrolls under it, it turns to frosted glass and the large title moves into the bar.

@example navigation-bar 420
```tsx
import { List, NavigationBar, ToolbarButton } from "stackui";

<NavigationBar
  title="Inbox"
  trailing={<ToolbarButton label="New message" icon={<PlusIcon />} prominent />}
/>
<List>…</List>
```

## Back button

Pass `onBack`, `backHref`, or your router's link with `backAs` and `backProps`. Screens with a back button show their large title under the bar; use `displayMode="inline"` for a small title from the start.

## Reference

@props NavigationBar

@props ToolbarButton
