import { RedashClient } from './client';

export interface CloneCli {
  url: string;
  key: string;
  name?: string;
  deep?: boolean;
}

export async function clone(cli: CloneCli): Promise<Error | string> {
  const client = RedashClient.fromUrl(cli.url, cli.key);

  const verified = await client.verify();

  if (verified instanceof Error) {
    return verified;
  }

  const dashboard = await client.cloneDashboard({
    fromUrl: cli.url,
    name: cli.name,
    deep: cli.deep,
  });

  if (dashboard instanceof Error) {
    return dashboard;
  }

  return dashboard.href;
}
