# BarcodeScanner

Lê códigos de barras de produtos pela câmera, sem internet. É uma entrada separada: apps que nunca leem códigos nunca baixam o leitor.

@example barcode-scanner 560
```tsx
import { BarcodeScanner } from "stackui/barcode";

<Sheet isPresented={aberta} onDismiss={() => setAberta(false)} title="Ler código" closeLabel="Fechar">
  {aberta && (
    <BarcodeScanner texts={{ aim: "Aponte para o código de barras.", retry: "Tentar de novo" /* … */ }}
      onScan={(codigo) => { setCodigo(codigo); setAberta(false); }} />
  )}
</Sheet>
```

Ele usa o leitor de códigos do próprio aparelho onde existe (Chrome no Android). Para o Safari, instale também o leitor reserva:

```sh
npm install @zxing/browser @zxing/library
```

> **Nota:** O navegador pede a câmera na primeira vez. A página precisa estar em HTTPS.

## Referência

@props BarcodeScanner
