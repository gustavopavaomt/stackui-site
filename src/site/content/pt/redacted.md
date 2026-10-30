# Skeleton e Redacted

O formato do conteúdo enquanto ele carrega. O `Redacted` espera um instante antes de mostrar o esqueleto, então carregamentos rápidos não piscam.

@example redacted 360
```tsx
import { Avatar, Redacted, Row, Section, SkeletonList } from "stackui-kit";

<Section header="Contatos">
  <Redacted isLoading={!contatos} placeholder={<SkeletonList rows={3} leading="circle" label="Carregando…" />}>
    {contatos?.map((c) => <Row key={c.id} leading={<Avatar name={c.nome} />} title={c.nome} />)}
  </Redacted>
</Section>
```

O `Skeleton` desenha um bloco e o `SkeletonText` algumas linhas, para o que não é lista.

## Referência

@props Redacted

@props SkeletonList
