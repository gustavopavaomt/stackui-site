# Instalação

A StackUI é um pacote npm com um arquivo de estilos.

## Instale o pacote

```sh
npm install stackui
```

## Importe os estilos uma vez

Importe o CSS no arquivo de entrada, antes do seu próprio CSS:

```tsx
// main.tsx
import "stackui/styles.css";
```

## Envolva o app

`App` define o fundo, a fonte e o texto base. `ToastProvider` deixa qualquer tela mostrar um aviso. Coloque os dois perto da raiz:

```tsx
import { createRoot } from "react-dom/client";
import { App, ToastProvider } from "stackui";
import "stackui/styles.css";

createRoot(document.getElementById("root")!).render(
  <App>
    <ToastProvider>
      <Rotas />
    </ToastProvider>
  </App>,
);
```

> **Nota:** A StackUI só estiliza os próprios elementos. Nada fora do `App` é tocado, então dá para adotar uma tela de cada vez.

## Textos em português

Os componentes vêm com textos padrão em inglês ("Close", "Saving…", "Search"). Todo texto que aparece tem uma prop para traduzir, como `closeLabel`, `loadingLabel` e `placeholder`. Os exemplos desta documentação em português já passam esses textos.

## Deixe instalável

Um PWA precisa de um manifesto e de um service worker. Com Vite, o `vite-plugin-pwa` cria os dois. Inclua a meta de viewport para o app chegar às bordas da tela:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

Depois veja [Apps instaláveis](/docs/pwa) para guiar as pessoas na instalação.
