# NavigationStack

Animated screens, like a native navigation stack: pushing slides the new screen in, popping slides it back, switching tabs crossfades. Works with any router.

@example navigation-stack 420
```tsx
import { NavigationStack } from "@stackui/react";

const location = useHash(); // or useLocation().pathname

<NavigationStack
  location={location}
  render={(path) => (path.split("/")[2] ? <Person name={path.split("/")[2]} /> : <People />)}
/>
```

> **Tip:** With React Router, return `<Routes location={location}>` from `render`, so the leaving screen keeps its own route while it animates. See [Navigation](/docs/navigation).

## Reference

@props NavigationStack
