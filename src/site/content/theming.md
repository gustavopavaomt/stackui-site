# Theming

Every color in StackUI is a CSS variable. Most apps change only the accent:

```css
:root {
  --st-tint: #0e8a4a;
}
```

@example theming 300
```tsx
// With --st-tint set, every component follows:
<Toggle isOn={on} onChange={setOn} label="Sample" />
<Button>Accent color</Button>
<Text color="tint">Links and highlights use it too.</Text>
```

## Light and dark

Light and dark follow the system. To force one, set `data-theme` on the html element:

```html
<html data-theme="dark">
```

## The variables

- `--st-tint`, `--st-on-tint`: the accent and the text on it.
- `--st-background`, `--st-surface`, `--st-elevated`, `--st-sheet`: the layers, from the screen to a sheet.
- `--st-label`, `--st-secondary-label`, `--st-tertiary-label`, `--st-separator`, `--st-fill`.
- `--st-success`, `--st-warning`, `--st-danger` and their `-fill` variants.
- `--st-blue`, `--st-green`, `--st-orange`, `--st-red`, `--st-indigo`, `--st-yellow`, `--st-gray`, `--st-teal`.
- `--st-font`, `--st-radius-control`, `--st-radius-card`.

> **Note:** Change dark mode values inside `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]`, the same way StackUI does.
