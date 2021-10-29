import { parse } from '@atlassian/cs-ari';
import type { ExtensionIdParts } from '../analytics';

// Convert an extensionId ARI into attributes to add to the analytics event
export function extensionIdToAnalyticsAttributes(
  extensionId?: string,
): {} | ExtensionIdParts {
  if (!extensionId) {
    return {};
  }
  try {
    const ari = parse(extensionId);
    if (!ari.resourceId) {
      return {};
    }
    const [appId, environmentId, groupId, extensionKey] = ari.resourceId.split(
      '/',
    );
    return { appId, environmentId, groupId, extensionKey };
  } catch {
    return {};
  }
}
