import path from 'path';
import globby from 'globby';
import type { AFPackage } from '@atlaskit/build-utils/types';

/**
 * @deprecated
 */
export async function getAlisasesForWorkspaceDeprecated(
  pkg: AFPackage,
  addDefaultEntries?: boolean,
): Promise<string[][]> {
  const paths = await globby(`${pkg.dir}/src/*`);
  const fileRegex = /^.*(?<!\.d)\.(js|ts(x)?)$/; // Exclude .d.ts files
  let defaultEntry;
  const aliasEntries = paths
    .filter(pathName => fileRegex.test(pathName))
    .map(pathName => {
      const { name: entryName } = path.parse(pathName);
      if (addDefaultEntries && entryName === 'index') {
        defaultEntry = [`${pkg.name}$`, pathName];
        return undefined;
      }
      return [`${pkg.name}/${entryName}`, pathName];
    })
    .filter<string[]>((entry): entry is string[] => entry !== undefined);
  if (defaultEntry) {
    aliasEntries.push(defaultEntry);
    aliasEntries.push([pkg.name, pkg.dir]);
  }
  return aliasEntries;
}
