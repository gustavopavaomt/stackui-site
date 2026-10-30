/** The StackUI mark: three stacked bars, the last one shorter. Takes the text color. */
export function Marca({ tamanho = 22 }: { tamanho?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={tamanho} height={tamanho} aria-hidden>
      <rect x="6" y="12" width="52" height="11" rx="5.5" fill="currentColor" />
      <rect x="6" y="28.5" width="52" height="11" rx="5.5" fill="currentColor" opacity=".75" />
      <rect x="6" y="45" width="32" height="11" rx="5.5" fill="currentColor" opacity=".5" />
    </svg>
  );
}
