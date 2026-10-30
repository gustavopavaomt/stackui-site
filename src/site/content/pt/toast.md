# Toast

Uma mensagem curta que sobe do rodapé e some sozinha. Os avisos fazem fila, e um pode mudar no lugar enquanto a tarefa acontece.

@example toast 320
```tsx
import { Button, useToast } from "@stackui/react";

const { show } = useToast();

<Button onClick={() => show("Salvo")}>Mostrar aviso</Button>

const aviso = show("Enviando…", "progress");
await enviar();
aviso.update("Enviado", "success");

show("Sem conexão", "error", { label: "Tentar de novo", onPress: tentarDeNovo });
```

> **Nota:** O `useToast` funciona dentro de um `ToastProvider`. Veja [Instalação](/docs/installation).

## Referência

@props ToastProvider

@props useToast
