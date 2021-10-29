import chalk from 'chalk';

export function redBadge(label: string): string {
  return chalk.bgRed.black(` ${label} `);
}
