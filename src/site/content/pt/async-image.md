# AsyncImage

Uma imagem que carrega sem deixar buraco: um brilho enquanto chega, um fade quando chega, um substituto quando falha.

@example async-image 280
```tsx
import { AsyncImage } from "stackui-kit";

<AsyncImage src={foto} alt="Uma paisagem" aspectRatio="16 / 9" width="100%"
  radius={16} fit="cover" showProgress fallback={<IconeFoto />} />
```

## Referência

@props AsyncImage
