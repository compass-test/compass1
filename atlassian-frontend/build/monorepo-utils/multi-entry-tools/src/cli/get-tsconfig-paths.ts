import path from 'path';
import * as bolt from 'bolt';
import type { AFPackageJson } from '@atlaskit/build-utils/types';
import { moduleResolveMapBuilder } from '../module-resolve-map-builder';

type Paths = Record<string, string[]>;

async function main() {
  const project = await bolt.getProject();
  const workspaces = await bolt.getWorkspaces<AFPackageJson>();

  const depths = [
    ...new Set(workspaces.map(ws => path.relative(ws.dir, project.dir))),
  ].sort();

  const mapping = await moduleResolveMapBuilder({
    addDefaultEntries: true,
  });

  const paths = Object.entries(mapping).reduce<Paths>(
    (entryPaths, [moduleName, rawModulePath]) => {
      const workspace = workspaces.find(ws => {
        const relative = path.relative(ws.dir, rawModulePath);
        return !relative.startsWith('..') && !path.isAbsolute(relative);
      });

      const modulePattern = moduleName.replace('$', '');

      if (!workspace) {
        throw new Error(`${moduleName} is not a bolt workspace`);
      }

      const moduleId = path.relative(
        project.dir,
        rawModulePath.replace('/index', '/').replace(/(\.tsx?|\.js)$/, ''),
      );

      entryPaths[modulePattern] = entryPaths[modulePattern] ?? [
        /**
         * Relative to project.dir e.g `./packages/design-system/button/src` as required by
         * file://./../../../resolvers/base-resolver.js#L76
         */
        `./${path.relative(project.dir, moduleId)}`,
        /**
         * Relative to worspace.dir, e.g.
         * `./packages/editor/editor-core` ➞ `../../../packages/design-system/button/src`
         * `./services/canvas-app` ➞ `../../packages/design-system/button/src`
         */
        ...depths.map(
          depth =>
            `${depth}/${path.relative(
              project.dir,
              workspace.dir,
            )}/${path.relative(workspace.dir, moduleId)}`,
        ),
      ];
      return entryPaths;
    },
    {},
  );

  console.log(
    '/* This file is auto-generated to get multi entry points to type check correctly. For more information, see https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/build/03-entry-points/ */',
  );

  console.log(
    JSON.stringify(
      {
        compilerOptions: {
          paths,
        },
      },
      null,
      2,
    ),
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
