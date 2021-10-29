import path from 'path';
import type { AFPackage } from '@atlaskit/build-utils/types';
import { getAlisasesForWorkspaceDeprecated } from './get-aliases-for-workspace-deprecated';
import { ModuleResolveMapBuilderOptions } from './types';

export async function getAliasesForWorkspace(
  pkg: AFPackage,
  opts?: ModuleResolveMapBuilderOptions,
): Promise<string[][]> {
  if (pkg.config.atlassian?.deprecatedAutoEntryPoints) {
    return getAlisasesForWorkspaceDeprecated(pkg, opts?.addDefaultEntries);
  }

  // Omit the default entry point here as it is added back after as the last element of the entryPoints array
  // This is to prevent default entry points in tsconfig from matching before custom entry point paths can, so they fail to load
  const { ['.']: dot, ...aliases } = (pkg.config['af:exports'] ?? {}) as Record<
    string,
    string
  >;

  const entryPoints = Object.entries(aliases);

  if (opts?.addDefaultEntries) {
    entryPoints.push([
      '.',
      (opts.useAtlaskitSrc ? pkg.config['atlaskit:src'] : undefined) ?? './src',
    ]);
  }

  return entryPoints.map(([entryName, entryPath]) => [
    path.posix.join(pkg.name, entryName),
    path.resolve(pkg.dir, entryPath),
  ]);
}
