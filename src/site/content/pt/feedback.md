# Retorno

As pessoas precisam saber o que está acontecendo: que algo foi salvo, que ainda está carregando, que ainda não tem nada aqui.

## Avisos (toasts)

Um aviso é uma mensagem curta que sobe do rodapé e some sozinha. Chame `show` de qualquer tela dentro do `ToastProvider`:

@example toast 320
```tsx
import { Button, useToast } from "stackui-kit";

const { show } = useToast();

<Button onClick={() => show("Salvo")}>Mostrar aviso</Button>

// Acompanhe uma tarefa: o aviso muda no lugar.
const aviso = show("Enviando…", "progress");
await enviar();
aviso.update("Enviado", "success");
```

Os avisos fazem fila: um novo espera o atual sair, então eles nunca se amontoam.

## Carregando

Mostre o formato do conteúdo enquanto ele carrega. O `Redacted` só mostra o esqueleto se a espera for longa o bastante para ser notada, e o conteúdo entra suave quando chega:

@example redacted 360
```tsx
import { Redacted, Section, SkeletonList } from "stackui-kit";

<Section header="Contatos">
  <Redacted isLoading={!contatos} placeholder={<SkeletonList rows={3} leading="circle" label="Carregando…" />}>
    {contatos?.map((c) => <Row key={c.id} leading={<Avatar name={c.nome} />} title={c.nome} />)}
  </Redacted>
</Section>
```

## Telas vazias

@example content-unavailable-view 380
```tsx
import { Button, ContentUnavailableView } from "stackui-kit";

<ContentUnavailableView title="Nenhuma mensagem"
  description="As mensagens que você receber aparecem aqui."
  icon={<IconeCaixa />} actions={<Button>Escrever</Button>} />
```

> **Dica:** Dê a cada lista vazia uma frase própria. "Nenhuma mensagem" diz mais que "Nenhum resultado".
