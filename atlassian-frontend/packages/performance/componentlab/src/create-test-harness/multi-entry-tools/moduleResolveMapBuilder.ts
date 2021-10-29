// @ts-nocheck
/*
  This file is a copy of build/monorepo-utils/multi-entry-tools/module-resolve-map-builder.js
  This is a temporary workaround as multi-entry-tools is a private package and we cannot
  have private packages as dependencies.

  This is currently being addressed in https://product-fabric.atlassian.net/browse/AFP-2524
*/

import glob from 'glob';
import * as bolt from 'bolt';
import path from 'path';
import fromEntries from './fromEntries';

// Array.prototype.flat polyfill, remove when upgraded to node 10
function flatten(array) {
  return array.reduce((acc, a) => [...acc, ...a], []);
}

function deprecatedGetAliasesForWorkspace({ name: packageName, dir }) {
  return new Promise((resolve, reject) => {
    glob(`${dir}/src/*`, (err, paths) => {
      if (err) {
        reject(err);
      }
      const tsxOrJsRegex = /^.*\.(js|ts(x)?)$/;
      resolve(
        paths
          .filter((pathName) => pathName.match(tsxOrJsRegex))
          .map((pathName) => {
            const { name: entryName } = path.parse(pathName);

            return [`${packageName}/${entryName}`, pathName];
          }),
      );
    });
  });
}

function getAliasesForWorkspace(pkg, addDefaultEntries) {
  if (
    pkg.config.atlassian &&
    pkg.config.atlassian.deprecatedAutoEntryPoints === true
  ) {
    return deprecatedGetAliasesForWorkspace(pkg);
  }

  const aliases = {
    ...pkg.config['af:exports'],
  };

  if (addDefaultEntries) {
    aliases['.'] = './src';
  }

  return Object.entries(aliases).map(([entryName, entryPath]) => [
    path.posix.join(pkg.name, entryName),
    path.resolve(pkg.dir, entryPath),
  ]);
}

/** Generates an entry point alias map for usage by tools such as webpack
 * When the `addDefaultEntries` option is set, will also add entries for the top-level directories.
 */
export default async function getAlternativeEntryPointAliasMap({
  addDefaultEntries,
} = {}) {
  const workspaces = await bolt.getWorkspaces();

  const aliasPromises = workspaces.map((workspace) =>
    getAliasesForWorkspace(workspace, addDefaultEntries),
  );
  const aliases = fromEntries(
    flatten(
      (await Promise.all(aliasPromises)).filter(
        (aliasesP) => aliasesP.length > 0,
      ),
    ),
  );

  return aliases;
}
