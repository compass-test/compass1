import path from 'path';

export interface GetEntriesOptions {
  isProduction: boolean;
  entryPath: string;
  websiteDir: string;
  port?: number;
}

export function getEntries(opts: GetEntriesOptions): string[] {
  const absEntryPath = path.resolve(opts.websiteDir, opts.entryPath);

  if (opts.isProduction || typeof opts.port === 'undefined') {
    return [absEntryPath];
  }

  const client = require.resolve('webpack-dev-server/client');
  const devServerPath = `${client}?http://localhost:${opts.port}/`;
  return [devServerPath, absEntryPath];
}
