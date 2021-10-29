import chalk from 'chalk';
import { outdent } from './outdent';

export function buildBanner(): string {
  return outdent`
    ${chalk.yellow(`Building with ${chalk.bold('all')} packages.`)}
  `;
}
