#!/usr/bin/env node

// eslint-disable-next-line import/no-extraneous-dependencies
const bolt = require('bolt');
const fs = require('fs');

async function main() {
  const workspaces = await bolt.getWorkspaces();
  const iconPackage = workspaces.find((ws) => ws.name === '@atlaskit/icon');
  const { dir } = iconPackage;

  const iconNames = fs
    .readdirSync(`${dir}/glyph`, { withFileTypes: true })
    .reduce((files, dirent) => {
      if (dirent.isDirectory()) {
        const icons = fs
          .readdirSync(`${dir}/glyph/${dirent.name}`)
          .map((icon) => `${dirent.name}/${icon}`);

        return files.concat(icons);
      }
      return files.concat(dirent.name);
    }, [])
    .filter((file) => file.match(/.+?\.js$/))
    .map((file) => file.replace(/\.js$/, ''))
    .sort();

  const allLazyImportLines = iconNames
    .map(
      (icon) =>
        `'${icon.replace(
          '/',
          '-',
        )}': lazy(() => import(/* webpackChunkName: "forge-ui-icons" */ '@atlaskit/icon/glyph/${icon}')),`,
    )
    .map((x) => `  ${x}\n`)
    .join('');

  const importsFileStr = `// *** GENERATED FILE - DO NOT EDIT ***
// WARNING: import needs to be statically analysable to not be problematic [at runtime]
import { lazy, ComponentType, LazyExoticComponent } from 'react';
import { Icon } from '@atlassian/forge-ui-types';

type LazyIcon = LazyExoticComponent<ComponentType<any>>;
export const IconPaths: Record<Icon, LazyIcon> = {
${allLazyImportLines}
};
`;

  const allIconTypeLines = iconNames
    .map((icon) => `  | '${icon.replace('/', '-')}'`)
    .join('\n');
  const iconsFileStr = `// *** GENERATED FILE - DO NOT EDIT ***
export type Icon =
${allIconTypeLines};
`;

  const forgeTypesPackage = workspaces.find(
    (ws) => ws.name === '@atlassian/forge-ui-types',
  );
  const { dir: typesDir } = forgeTypesPackage;

  fs.writeFileSync('imports.tsx', importsFileStr);
  fs.writeFileSync(`${typesDir}/src/public/icons.ts`, iconsFileStr);
}

main();
