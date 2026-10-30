# TextField

Um campo de texto para listas, com rótulo que sobe quando você digita e mensagem de erro embaixo. `TextEditor` é a versão alta, para observações.

@example text-field 260
```tsx
import { Section, TextField } from "stackui-kit";

<Section>
  <TextField label="Email" type="email" value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={invalido ? "Digite um email válido" : undefined} />
  <TextField label="Senha" type="password" />
</Section>
```

## Referência

@props TextField
