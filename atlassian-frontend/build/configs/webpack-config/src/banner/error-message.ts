import chalk from 'chalk';
import { redBadge } from './red-badge';

export interface ErrorMessage {
  title: string;
  body: string;
}

export function errorMessage(message: ErrorMessage): string[] {
  return [
    '',
    chalk.red(`${redBadge('ERROR')} ${message.title}:`),
    '',
    message.body,
    '',
  ];
}
