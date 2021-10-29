import chalk from 'chalk';
import { Message } from 'esbuild';

export interface PrintOptions {
  resolvePath?(file: string): string;
  level: 'warning' | 'error';
}

export function print(message: Message, options?: PrintOptions): void {
  const color = options?.level === 'error' ? chalk.red : chalk.yellow;
  const prefix = color(options?.level ?? '');

  console.log(prefix, message.text);

  if (message.location) {
    const resolvePath = options?.resolvePath ?? (id => id);
    const filePath = resolvePath(message.location.file);
    const { line, column } = message.location;

    console.log(`${filePath}(${line},${column})`);
    console.log(message.location.lineText);
    console.log(
      ' '.repeat(message.location.column) +
        color('^'.repeat(message.location.length)),
    );
  }
}
