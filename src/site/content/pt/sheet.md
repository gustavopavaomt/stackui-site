# Sheet

Um painel que sobe por cima da tela. Arraste para baixo, toque fora, aperte Esc ou use o voltar do Android para fechar.

@example sheet 460
```tsx
import { Button, List, Row, Section, Sheet } from "@stackui/react";

const [aberta, setAberta] = useState(false);

<Button onClick={() => setAberta(true)}>Compartilhar</Button>

<Sheet isPresented={aberta} onDismiss={() => setAberta(false)} closeLabel="Fechar"
  title="Compartilhar" icon={<IconeCompartilhar />} description="Arraste a alça para baixo para fechar.">
  <List>
    <Section>
      <Row title="Copiar link" onClick={copiar} />
      <Row title="Enviar por email" onClick={enviarEmail} />
    </Section>
  </List>
</Sheet>
```

## Telas internas

Uma folha pode ter uma tela atrás de outra: passe `onBack` e troque o conteúdo. O botão de voltar aparece à esquerda.

## Referência

@props Sheet
