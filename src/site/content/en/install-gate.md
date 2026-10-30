# InstallGate

Runs your app only when it is installed, and shows how to install it everywhere else.

@example install-gate 560
```tsx
import { InstallGate } from "stackui";

<InstallGate appName="Wallet" icon={<img src="/icon-192.png" alt="" />}>
  <App />
</InstallGate>
```

See [Installable apps](/docs/pwa) for the hooks that go with it.

## Reference

@props InstallGate
