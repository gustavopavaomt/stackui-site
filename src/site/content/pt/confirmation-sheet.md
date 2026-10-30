# ConfirmationSheet

Conferir antes de gravar: o que vai acontecer, em linhas de recibo, e um botão que mostra o progresso. Nada fecha a folha enquanto grava.

@example confirmation-sheet 560
```tsx
import { ConfirmationSheet, type ButtonState } from "stackui";

const [estado, setEstado] = useState<ButtonState>("idle");

<ConfirmationSheet isPresented={aberta} onDismiss={() => setAberta(false)}
  onConfirm={enviar} state={estado}
  title="Enviar dinheiro"
  items={[
    { label: "Para", value: "Ana Souza" },
    { label: "Valor", value: "R$ 250,00" },
  ]}
  confirmLabel="Enviar" loadingLabel="Enviando…" doneLabel="Enviado"
  cancelLabel="Voltar e revisar" />
```

## Referência

@props ConfirmationSheet
