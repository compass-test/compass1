import { interleave } from './interleave';

export function outdent(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  const result = interleave(strings, values);
  const lines = result.split('\n');

  const indentation = strings
    .join('')
    .split('\n')
    .filter(line => line.search(/\S/) > -1)
    .reduce((acc, line, index) => {
      const fn = index === 0 ? Math.max : Math.min;
      return fn(line.search(/\S|$/), acc);
    }, 0);

  return lines
    .map(line =>
      line.search(/\S/) >= indentation ? line.slice(indentation) : line,
    )
    .join('\n');
}
