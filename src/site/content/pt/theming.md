# Temas

Todas as cores da StackUI são variáveis CSS. A maioria dos apps muda só a cor de destaque:

```css
:root {
  --st-tint: #0e8a4a;
}
```

@example theming 300
```tsx
// Com o --st-tint definido, todos os componentes acompanham:
<Toggle isOn={ligado} onChange={setLigado} label="Exemplo" />
<Button>Cor de destaque</Button>
<Text color="tint">Links e destaques também usam.</Text>
```

## Claro e escuro

Claro e escuro seguem o sistema. Para forçar um deles, use `data-theme` no html:

```html
<html data-theme="dark">
```

## As variáveis

- `--st-tint`, `--st-on-tint`: o destaque e o texto sobre ele.
- `--st-background`, `--st-surface`, `--st-elevated`, `--st-sheet`: as camadas, da tela até uma folha.
- `--st-label`, `--st-secondary-label`, `--st-tertiary-label`, `--st-separator`, `--st-fill`.
- `--st-success`, `--st-warning`, `--st-danger` e as versões `-fill`.
- `--st-blue`, `--st-green`, `--st-orange`, `--st-red`, `--st-indigo`, `--st-yellow`, `--st-gray`, `--st-teal`.
- `--st-font`, `--st-radius-control`, `--st-radius-card`.

> **Nota:** Mude os valores do escuro dentro de `@media (prefers-color-scheme: dark)` e `[data-theme="dark"]`, do mesmo jeito que a StackUI faz.
