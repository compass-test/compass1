import { COMPASS_SITE_ARI } from '@atlassian/dragonfruit-forge';

export function compassAriFor(cloudId: string) {
  return [COMPASS_SITE_ARI, cloudId].join('/');
}
