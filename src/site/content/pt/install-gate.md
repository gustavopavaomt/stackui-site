# InstallGate

Roda o seu app só quando está instalado, e mostra como instalar em qualquer outro lugar.

@example install-gate 560
```tsx
import { InstallGate } from "stackui";

<InstallGate appName="Wallet" icon={<img src="/icone-192.png" alt="" />}
  texts={{ title: "Instale o app", install: "Instalar", copyLink: "Copiar link" /* … */ }}>
  <App />
</InstallGate>
```

Veja [Apps instaláveis](/docs/pwa) para os hooks que acompanham.

## Referência

@props InstallGate
