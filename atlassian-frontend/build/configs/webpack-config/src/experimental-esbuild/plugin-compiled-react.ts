import fs from 'fs';
import path from 'path';
import * as babel from '@babel/core';
import type Esbuild from 'esbuild';

export interface PluginCompiledReact {
  filter: RegExp;
  configFile: string;
}

export const pluginCompiledReact = (
  opts: PluginCompiledReact,
): Esbuild.Plugin => ({
  name: '@compiled/react',
  async setup(esbuild) {
    esbuild.onLoad(
      { filter: opts.filter },

      async args => {
        const contents = await fs.promises.readFile(args.path, 'utf8');

        const babelOptions: any = babel.loadOptions({
          filename: args.path,
          envName: 'website',
          configFile: opts.configFile,
          caller: {
            name: 'esbuild',
            supportsStaticESM: true,
          },
        });

        if (!babelOptions) {
          return { contents };
        }

        if (babelOptions.sourceMaps) {
          babelOptions.sourceFileName = path.relative(process.cwd(), args.path);
        }

        return new Promise((resolve, reject) => {
          babel.transform(contents, babelOptions, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({ contents: result?.code ?? undefined });
            }
          });
        });
      },
    );
  },
});
