# Installation

StackUI is one npm package with one stylesheet.

## Install the package

```sh
npm install stackui
```

## Import the styles once

Import the stylesheet in your entry file, before your own CSS:

```tsx
// main.tsx
import "stackui/styles.css";
```

## Wrap your app

`App` sets the background, the font and the base text style. `ToastProvider` lets any screen show a toast. Put both near the root:

```tsx
import { createRoot } from "react-dom/client";
import { App, ToastProvider } from "stackui";
import "stackui/styles.css";

createRoot(document.getElementById("root")!).render(
  <App>
    <ToastProvider>
      <Routes />
    </ToastProvider>
  </App>,
);
```

> **Note:** StackUI styles only its own elements. Nothing outside `App` is touched, so you can adopt it one screen at a time.

## Make it installable

A PWA needs a web manifest and a service worker. With Vite, `vite-plugin-pwa` creates both. Add the viewport meta so the app reaches the edges of the screen:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

Then see [Installable apps](/docs/pwa) to guide people through installing it.
