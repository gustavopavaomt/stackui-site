# Installable apps

A PWA becomes an app when it is added to the home screen: it opens full screen, from its own icon. StackUI helps with the hardest part, which is explaining how to install it on each phone.

## Only open installed

Wrap your app in `InstallGate`. Opened from the icon, it renders your app. In a browser, it shows how to install: the install button where the browser offers one, the steps on iPhone, and "open in your browser" inside apps like WhatsApp or Instagram, which can't install anything.

@example install-gate 560
```tsx
import { InstallGate } from "stackui";

<InstallGate appName="Wallet" icon={<img src="/icon-192.png" alt="" />}>
  <App />
</InstallGate>
```

> **Tip:** Pass `bypass` while developing on a computer, or for a version of your app that also runs in the browser.

## Hooks

- `useStandalone()` is `true` when the app was opened from its icon.
- `useEnvironment()` tells the platform (`ios`, `android`, `desktop`), the browser and whether it is an in-app browser.
- `useInstallPrompt()` gives the browser's install button: `state` and `install()`. Call `captureInstallPrompt()` in your entry file, before React renders, so the browser's event is not missed.
- `useIosKeyboardFix()` fixes a WebKit bug of installed apps on iPhone, where the screen stays short after the keyboard closes.

```tsx
import { captureInstallPrompt } from "stackui";

captureInstallPrompt();
createRoot(root).render(<Main />);
```

## Barcodes

`BarcodeScanner` reads product barcodes with the camera, offline. It is a separate entry, so apps that never scan never download it. See [BarcodeScanner](/docs/barcode-scanner).
