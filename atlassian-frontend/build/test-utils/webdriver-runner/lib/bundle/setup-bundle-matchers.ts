// circumvent global fetch mock

import { matcherHint } from 'jest-matcher-utils';

async function toBeBundled(
  this: any,
  moduleName: string,
  { chunks } = { chunks: [] },
) {
  // Requiring inline until we can bump to node-fetch 3.X
  // https://github.com/node-fetch/node-fetch/pull/810
  const fetch = require('node-fetch');
  const url = `${global.__BASEURL__}/bundled/${moduleName}`;
  const response = await fetch(url);
  // if /bundled/ is not available this won't be json
  const contentType = response.headers.get('content-type');

  if (!contentType?.includes('json')) {
    return {
      pass: !this.isNot,
      message: () => `Could not fetch module summary from ${url}, skipping.`,
    };
  }

  if (!response.ok) {
    throw new Error(
      `Could not fetch module data from ${url}: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  const not = this.isNot ? ` not ` : ' ';
  const prefix = this.isNot ? `.not` : '';
  const matcherName = `${prefix}.toBeBundled`;
  const hint = matcherHint(matcherName, 'received', '');

  const matchesChunk =
    chunks.length === 0 || chunks.some(chunk => data.chunks.includes(chunk));

  const chunksTerm =
    // eslint-disable-next-line no-nested-ternary
    chunks.length === 0
      ? 'any chunk'
      : chunks.length === 1
      ? 'chunk'
      : 'chunks';

  const chunksList =
    chunks.length === 0
      ? ''
      : ` ${chunks.map(chunk => `"${chunk}"`).join(', ')}`;

  return {
    pass: data.bundled && matchesChunk,
    message: () =>
      `${hint}\n\nExpected "${moduleName}"${not}to be bundled in ${chunksTerm}${chunksList}.`,
  };
}

export function setupBundleMatchers() {
  // eslint-disable-next-line no-undef
  // @ts-ignore
  expect.extend({
    toBeBundled,
  });
}
