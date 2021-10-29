import type { Entity } from '../../../../../common/types';

/**
 * Builds the path text from the given path object.
 */
export const buildPathText = (
  path: Entity[],
  entity: Entity | undefined,
): string => {
  const status = entity?.status?.value ?? '';
  const length = path.length;

  if (length === 0) {
    return '';
  }

  const title = path[length - 1].title;
  return status ? `${title} • ${status}` : title;
};
