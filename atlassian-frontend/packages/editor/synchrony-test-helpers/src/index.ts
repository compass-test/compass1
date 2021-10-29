import { CollabEditProvider } from '@atlaskit/editor-common/collab';
import createSynchronyProvider from './synchrony-provider';
import { createMockCollabEditProvider } from './mock-collab-provider';

export { createMockCollabEditProvider };

export interface CreateCollabProviderOptions {
  userId?: string;
  defaultDoc?: string;
  docId?: string;
}

export interface CreateCollabProviderContext {
  autoConnect: boolean;
}

const DEFAULT_SYNCHRONY_URLS = [
  'https://synchronytesting--app.ap-southeast-2.dev.atl-paas.net',
  'https://synchronytesting.ap-southeast-2.dev.atl-paas.net',
];

const timeout = (delay: number): Promise<{ ok: false }> =>
  new Promise((resolve) => setTimeout(() => resolve({ ok: false }), delay));

const ping = async (url: string) =>
  fetch(`${url}/heartbeat`, {
    method: 'GET',
    mode: 'no-cors',
  })
    .then(() => ({ ok: true }))
    .catch(() => ({ ok: false }));

async function determineSynchronyUrl(): Promise<string | undefined> {
  if (SYNCHRONY_URL) {
    return SYNCHRONY_URL;
  }

  if (process.env.NODE_ENV === 'production') {
    for (const url of DEFAULT_SYNCHRONY_URLS) {
      const response = await Promise.race([ping(url), timeout(500)]);

      if (response.ok) {
        return url;
      }
    }
  }
}

export async function createCollabEditProvider(
  options?: CreateCollabProviderOptions,
  context: CreateCollabProviderContext = { autoConnect: false },
): Promise<CollabEditProvider> {
  const { userId, defaultDoc } = options || {};

  const url = context.autoConnect
    ? await determineSynchronyUrl()
    : SYNCHRONY_URL;

  if (!url) {
    return createMockCollabEditProvider(userId, defaultDoc);
  }

  return (await createSynchronyProvider(url))!;
}
