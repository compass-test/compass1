import { parse as parseAri } from '@atlassian/cs-ari';

import { ARI_PREFIX } from '../../constants';

export function extractResourceId(ari: string): string | undefined {
  // Not an ari, return as is
  if (!ari.startsWith(ARI_PREFIX)) {
    return ari;
  }

  try {
    return parseAri(ari).resourceId;
  } catch (e) {
    console.error('Failed to parse ARI', e);

    return undefined;
  }
}

export function extractComponentId(ari: string): string | undefined {
  const resourceId = extractResourceId(ari);

  if (!resourceId) {
    return undefined;
  }

  // Compass' ARIs contains workspaceId/componentId in the resourceId section
  const ids = resourceId.split('/');

  return ids[ids.length - 1];
}
