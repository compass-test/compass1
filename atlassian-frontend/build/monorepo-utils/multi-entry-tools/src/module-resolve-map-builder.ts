import * as bolt from 'bolt';
import type { AFPackageJson } from '@atlaskit/build-utils/types';
import { getAliasesForWorkspace } from './get-aliases-for-workspace';
import { ModuleResolveMapBuilderOptions } from './types';

/**
 * Generate an entry point alias map for usage by tools such as webpack.
 * When the `addDefaultEntries` option is set it will also add entries for the top-level directories.
 */
export async function moduleResolveMapBuilder(
  opts?: ModuleResolveMapBuilderOptions,
): Promise<Record<string, string>> {
  const workspaces = await bolt.getWorkspaces<AFPackageJson>();

  const aliases = await Promise.all(
    workspaces.map(workspace => getAliasesForWorkspace(workspace, opts)),
  );

  return Object.fromEntries(aliases.flat());
}
