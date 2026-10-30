# Alert

Um diálogo no meio da tela para algo que precisa ser lido agora.

@example alert 360
```tsx
import { Alert } from "@stackui/react";

<Alert isPresented={aberto} onDismiss={() => setAberto(false)}
  title="Apagar esta foto?" message="Ela sai de todos os seus aparelhos."
  actions={[
    { label: "Cancelar", role: "cancel" },
    { label: "Apagar", role: "destructive", onPress: apagarFoto },
  ]} />
```

## Referência

@props Alert
