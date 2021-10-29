import path from 'path';
import chalk from 'chalk';
import { Package } from 'bolt';
import { outdent } from './outdent';
import { list } from './list';
import { optional } from './optional';

export interface DevServerBannerOptions {
  workspaces: Package[];
  isAll: boolean;
  port: number;
  host: string;
  isFile: boolean;
  filePath?: string;
  input: string[];
  report: boolean;
}

export function devServerBanner(opts: DevServerBannerOptions): string {
  const isLongMessage = opts.workspaces.length > 8;
  const prettyHost = opts.host === '0.0.0.0' ? 'localhost' : opts.host;
  const hostname = `http://${prettyHost}:${opts.port}`;
  const isUsingTokens = process.env.ENABLE_TOKENS;
  const tokensMessage = isUsingTokens
    ? chalk.blueBright(`\nToken switcher enabled for all examples`)
    : '';
  const url = (ws: Package) =>
    `${hostname}/packages${ws.dir.split('packages')[1]}`;

  const fileUrlPath = opts.filePath
    ? path
        .basename(opts.filePath, path.extname(opts.filePath))
        .replace(/(\d+)-/, '')
    : undefined;

  const openUrl =
    opts.workspaces.length === 1
      ? [
          hostname,
          'examples',
          opts.workspaces[0].dir.split('/packages/')[1],
          fileUrlPath,
        ]
          .filter(Boolean)
          .join('/')
      : hostname;

  const isGlobPackages = !opts.isAll && !opts.isFile;
  const isAllPackages = opts.isAll && !opts.isFile;

  const urls = opts.workspaces.map(ws => [ws.name, url(ws)]);

  if (opts.report) {
    urls.push(['report', `${hostname}/report.html`]);
  }

  if (isAllPackages) {
    return outdent`
      ➞ Open ${chalk.yellow(openUrl)}${tokensMessage}

      ${chalk.yellow(`Building with ${chalk.bold('all')} packages.`)}
      ${list(
        opts.report ? [['report', `${hostname}/report.html`]] : [],
        ([name, address]) => [name, chalk.dim(address)],
      )}
    `;
  }

  if (isGlobPackages) {
    return outdent`
      ${optional`➞ Open ${chalk.yellow(openUrl)}\n`(
        !isLongMessage,
      )}${tokensMessage}
      Running with packages glob "${chalk.bold(opts.input.join(', '))}".
      ${list(urls, ([name, address]) => [name, chalk.dim(address)])}
      ${optional`\n➞ Open ${chalk.yellow(openUrl)}`(isLongMessage)}
    `;
  }

  return outdent`
  ➞ Open ${chalk.yellow(openUrl)}${tokensMessage}
  Running with file "${chalk.bold(opts.filePath ?? '')}".
  ${list(urls, ([name, address]) => [name, chalk.dim(address)])}
  `;
}
