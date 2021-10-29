import { interleave } from './interleave';

export type optionally = (flag: boolean) => string;

export function optional(
  strings: TemplateStringsArray,
  ...values: unknown[]
): optionally {
  return (flag: boolean) => (flag ? interleave(strings, values) : '');
}
