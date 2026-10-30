# Folhas e alertas

Algumas coisas não merecem uma tela inteira: compartilhar, escolher uma opção, confirmar. Elas sobem numa **folha** por cima da tela atual. Quando algo precisa ser lido agora, um **alerta** pergunta no meio da tela.

## Folhas

Uma folha é controlada por `isPresented`: deixe `true` para abrir e feche no `onDismiss`. Ela fecha pelo botão de fechar, por um toque fora, pelo Esc, pelo gesto de voltar do Android e quando é arrastada para baixo.

@example sheet 460
```tsx
import { Button, List, Row, Section, Sheet } from "@stackui/react";

const [aberta, setAberta] = useState(false);

<Button onClick={() => setAberta(true)}>Compartilhar</Button>

<Sheet isPresented={aberta} onDismiss={() => setAberta(false)}
  title="Compartilhar" description="Arraste a alça para baixo para fechar." closeLabel="Fechar">
  <List>
    <Section>
      <Row title="Copiar link" onClick={copiar} />
      <Row title="Enviar por email" onClick={enviarEmail} />
    </Section>
  </List>
</Sheet>
```

## Folhas prontas

- [ConfirmationSheet](/docs/confirmation-sheet): conferir antes de gravar, com o progresso no botão.
- [OptionsSheet](/docs/options-sheet): escolher uma opção, como ordenação ou filtro.
- [ListPicker](/docs/list-picker): escolher numa lista longa, com busca.

## Alertas

@example alert 360
```tsx
import { Alert, Button } from "@stackui/react";

<Button variant="destructive" onClick={() => setAberto(true)}>Apagar foto</Button>

<Alert isPresented={aberto} onDismiss={() => setAberto(false)}
  title="Apagar esta foto?" message="Ela sai de todos os seus aparelhos."
  actions={[
    { label: "Cancelar", role: "cancel" },
    { label: "Apagar", role: "destructive", onPress: apagarFoto },
  ]} />
```

> **Dica:** Use alerta só quando a pessoa precisa decidir agora. Para escolhas, use uma folha; para novidades, um aviso.
