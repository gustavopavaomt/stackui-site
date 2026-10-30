# Navigation

A phone app moves between screens with a stack: opening a screen pushes it in from the right; going back slides it out. StackUI gives you three pieces:

- `NavigationStack` animates between screens when the location changes.
- `NavigationBar` is the top of each screen: the title, the back button and the toolbar.
- `TabBar` switches between the main sections of the app.

## Moving between screens

`NavigationStack` doesn't know about your router. Give it the current location and a function that draws a location. Here, the location comes from the URL hash:

@example navigation-stack 420
```tsx
import { NavigationBar, NavigationStack, List, Row, Section } from "stackui-kit";

function People() {
  return (
    <>
      <NavigationBar title="People" />
      <List>
        <Section>
          <Row title="Ana" href="#/people/Ana" />
          <Row title="Leo" href="#/people/Leo" />
        </Section>
      </List>
    </>
  );
}

function Person({ name }: { name: string }) {
  return <NavigationBar title={name} backHref="#/people" />;
}

export function Screens() {
  const location = useHash(); // "/people" or "/people/Ana"
  return (
    <NavigationStack
      location={location}
      render={(path) => (path.split("/")[2] ? <Person name={path.split("/")[2]} /> : <People />)}
    />
  );
}
```

The transition comes from the depth of the path: `/people` → `/people/Ana` pushes, the way back pops, and two paths of the same depth crossfade (switching tabs). Scroll is remembered per location.

## With React Router

Pass the location to `<Routes>`, so the leaving screen keeps drawing its own route while it slides out, and use `Link` through the `as` prop:

```tsx
import { Link, Route, Routes, useLocation } from "react-router";
import { NavigationStack, Row } from "stackui-kit";

function Shell() {
  const { pathname } = useLocation();
  return (
    <NavigationStack
      location={pathname}
      render={(location) => (
        <Routes location={location}>
          <Route path="/people" element={<People />} />
          <Route path="/people/:name" element={<Person />} />
        </Routes>
      )}
    />
  );
}

// A row that navigates with the router:
<Row title="Ana" as={Link} to="/people/Ana" />
```

## Tabs

Put the `TabBar` next to the stack, outside of it, and hide it on child screens:

```tsx
<TabBar
  selection={pathname.split("/")[1]}
  hidden={pathname.split("/").length > 2}
  items={[
    { id: "home", label: "Home", icon: <HomeIcon />, as: Link, props: { to: "/home" } },
    { id: "settings", label: "Settings", icon: <GearIcon />, as: Link, props: { to: "/settings" } },
  ]}
/>
```

> **Tip:** Leave room at the bottom of your screens for the tab bar, about 112 px.
