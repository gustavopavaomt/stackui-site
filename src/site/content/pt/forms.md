# Formulários

Formulários também são listas: campos e controles ficam em seções, e o botão de salvar vem embaixo.

@example text-field 260
```tsx
import { List, Section, TextField } from "@stackui/react";

const [email, setEmail] = useState("");
const invalido = email.length > 0 && !email.includes("@");

<List>
  <Section>
    <TextField label="Email" type="email" value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={invalido ? "Digite um email válido" : undefined} />
    <TextField label="Senha" type="password" />
  </Section>
</List>
```

## Os controles

- `TextField` e `TextEditor` para texto, com rótulo flutuante e mensagem de erro.
- `Toggle` para ligar e desligar, `Stepper` para números pequenos, `Picker` para duas a quatro opções.
- `DatePicker`, `TimePicker` e `ListPicker` abrem uma folha, igual em qualquer celular.
- `SearchField` filtra uma lista enquanto você digita.

## Salvando

Dê um `state` ao botão de salvar. Ele mostra um carregando enquanto salva e um check quando termina, sem mudar de tamanho, então nada na tela pula:

@example button 340
```tsx
import { Button, type ButtonState } from "@stackui/react";

const [estado, setEstado] = useState<ButtonState>("idle");

async function salvar() {
  setEstado("loading");
  await api.salvar(formulario);
  setEstado("done");
  setTimeout(() => setEstado("idle"), 1500);
}

<Button state={estado} onClick={salvar} loadingLabel="Salvando…" doneLabel="Salvo">Salvar</Button>
```

> **Dica:** Antes de gravar algo importante, confirme com uma [ConfirmationSheet](/docs/confirmation-sheet).
