import memfs from 'memfs';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import type Esbuild from 'esbuild';
import { JSDOM } from 'jsdom';

export interface PluginHTMLOptions {
  template: string;
  outdir: string;
  entryPoints?: string[];
  publicPath: string;
  fs: memfs.IFs | typeof fs;
  favicon?: string;
  title?: string;
}

export const pluginHtml = (options: PluginHTMLOptions): Esbuild.Plugin => ({
  name: 'html',
  async setup(build) {
    build.onEnd(async result => {
      const template = await fs.promises.readFile(options.template, 'utf-8');

      const rawResult = ejs.render(template, {
        htmlWebpackPlugin: {
          options: {
            title: options.title,
          },
        },
        webpackConfig: {
          output: {
            publicPath: options.publicPath,
          },
        },
      });

      const publicPath = options.publicPath ?? '';
      const outputs =
        options.entryPoints ?? Object.keys(result.metafile?.outputs ?? {});

      const jsdom = new JSDOM(rawResult);
      const { window } = jsdom;
      const { document } = window;

      if (options.favicon) {
        const href = path.posix.join(publicPath, options.favicon);

        const link = document.createElement('link');
        link.rel = 'shortcut icon';
        link.href = href;

        document.head.append(link);
      }

      outputs.forEach(outPath => {
        if (path.extname(outPath) === '.js') {
          const outPathname = outPath.startsWith('/')
            ? path.posix.relative(options.outdir, outPath)
            : outPath;

          const src = path.posix.join(publicPath, outPathname);

          const script = document.createElement('script');
          script.type = 'module';
          script.src = src;

          document.body.append(script);
        }

        if (path.extname(outPath) === '.css') {
          const outPathname = outPath.startsWith('/')
            ? path.posix.relative(options.outdir, outPath)
            : outPath;

          const href = path.posix.join(publicPath, outPathname);

          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;

          document.head.append(link);
        }
      });

      const target = path.join(
        options.outdir,
        path.basename(options.template, '.ejs'),
      );

      const outFs = build.initialOptions.write === false ? options.fs : fs;
      await outFs.promises.mkdir(path.dirname(target), { recursive: true });
      await outFs.promises.writeFile(target, jsdom.serialize());
    });
  },
});
