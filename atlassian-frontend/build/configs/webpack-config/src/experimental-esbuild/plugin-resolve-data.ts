import type Esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import enhancedResolve from 'enhanced-resolve';

const boltFsLoader = require('bolt-fs-loader');
const navInfoLoader = require('nav-info-loader');
const extractReactTypes = require('extract-react-types-loader');
const noopExtractReactTypesLoader = require('../../assets/noop-extract-react-types-loader');

export interface PluginResolveDataOptions {
  include: string[];
  exclude: string[];
  extractReactTypes: boolean;
  isEnabled(id: string): boolean;
}

export const pluginResolveData = (
  options: PluginResolveDataOptions,
): Esbuild.Plugin => ({
  name: 'resolve-data',
  async setup(esbuild) {
    const resolver = enhancedResolve.create({
      extensions: esbuild.initialOptions.resolveExtensions ?? ['.js'],
    });

    const resolve = (path: string): Promise<string> =>
      new Promise((resolve, reject) => {
        resolver(process.cwd(), path, (err, result: string) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });

    esbuild.onLoad({ filter: /NAV_DATA/ }, async () => {
      if (!options.isEnabled('website')) {
        return { contents: 'export default {}' };
      }

      const contents = await navInfoLoader.call({
        clearDependencies: () => {},
        addContextDependency: () => {},
        query: {
          include: options.include
            .filter(p => p.includes('package.json'))
            .map(p => p.replace('/package.json', '')),
          exclude: options.exclude,
          configProps: [
            'name',
            'version',
            'description',
            'atlaskit',
            'atlassian',
            'maintainers',
            'peerDependencies',
            'devDependencies',
            'dependencies',
          ],
        },
      });

      return {
        contents,
      };
    });

    esbuild.onLoad({ filter: /SITE_DATA/ }, async () => {
      const contents = await boltFsLoader.call({
        clearDependencies: () => {},
        addContextDependency: () => {},
        query: {
          include: options.include,
          exclude: options.exclude,
          source: options.isEnabled('website'),
        },
      });

      return {
        contents,
      };
    });

    if (options.isEnabled('website')) {
      esbuild.onResolve({ filter: /\!\!raw-loader\!/ }, args => {
        const fragments = args.path.split('!');
        const filePath = path.resolve(
          args.resolveDir,
          fragments[fragments.length - 1],
        );
        return { path: filePath, namespace: 'raw-loader' };
      });

      esbuild.onLoad({ filter: /.*/, namespace: 'raw-loader' }, async args => {
        const filePath = await resolve(args.path);

        return {
          contents: `export default ${escape(
            String(await fs.promises.readFile(filePath)),
          )}`,
        };
      });

      esbuild.onResolve(
        { filter: /\!\!extract-react-types-loader\!/ },
        args => {
          const fragments = args.path.split('!');
          const filePath = path.resolve(
            args.resolveDir,
            fragments[fragments.length - 1],
          );
          return { path: filePath, namespace: 'extract-react-types-loader' };
        },
      );

      esbuild.onLoad(
        { filter: /.*/, namespace: 'extract-react-types-loader' },
        async args => {
          if (!options.extractReactTypes) {
            return { contents: noopExtractReactTypesLoader() };
          }

          const filePath = await resolve(args.path);
          const fileContents = await fs.promises.readFile(filePath);

          const contents = extractReactTypes.call(
            {
              resource: filePath,
            },
            [fileContents],
          );

          return { contents };
        },
      );
    }
  },
});

function escape(input: string): string {
  return JSON.stringify(input)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
