# Apps instaláveis

Um PWA vira app quando é adicionado à tela de início: abre em tela cheia, pelo próprio ícone. A StackUI ajuda na parte mais difícil, que é explicar como instalar em cada celular.

## Abrir só instalado

Envolva o app no `InstallGate`. Aberto pelo ícone, ele mostra o seu app. No navegador, mostra como instalar: o botão de instalar onde o navegador oferece, os passos no iPhone e "abra no seu navegador" dentro de apps como WhatsApp ou Instagram, que não instalam nada.

@example install-gate 560
```tsx
import { InstallGate } from "stackui";

<InstallGate appName="Wallet" icon={<img src="/icone-192.png" alt="" />}
  texts={{ title: "Instale o app", install: "Instalar", copyLink: "Copiar link" /* … */ }}>
  <App />
</InstallGate>
```

> **Dica:** Passe `bypass` enquanto desenvolve no computador, ou para uma versão do app que também roda no navegador.

## Hooks

- `useStandalone()` é `true` quando o app foi aberto pelo ícone.
- `useEnvironment()` informa a plataforma (`ios`, `android`, `desktop`), o navegador e se é um navegador interno de outro app.
- `useInstallPrompt()` dá o botão de instalar do navegador: `state` e `install()`. Chame `captureInstallPrompt()` no arquivo de entrada, antes do React desenhar, para não perder o evento do navegador.
- `useIosKeyboardFix()` corrige um erro do WebKit em apps instalados no iPhone, em que a tela fica curta depois que o teclado fecha.

```tsx
import { captureInstallPrompt } from "stackui";

captureInstallPrompt();
createRoot(raiz).render(<Principal />);
```

## Códigos de barras

O `BarcodeScanner` lê códigos de barras de produtos pela câmera, sem internet. Ele é uma entrada separada, então apps que nunca leem códigos nunca baixam o leitor. Veja [BarcodeScanner](/docs/barcode-scanner).
