export function interleave(a: TemplateStringsArray, b: unknown[]): string {
  return a.flatMap((item, i) => [item, b[i] ?? '']).join('');
}
