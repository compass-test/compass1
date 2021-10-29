export function list(
  input: string[][],
  fn: (line: string[]) => string[],
): string {
  const lines = input.map(fn);
  const maxPrefixLength = lines.reduce(
    (acc, line) => Math.max(acc, line[0].length),
    0,
  );

  return lines
    .map(([prefix, ...segments]) =>
      ['-', prefix.padEnd(maxPrefixLength), ...segments].join(' '),
    )
    .join('\n');
}
