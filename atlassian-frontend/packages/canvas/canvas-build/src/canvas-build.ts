import fs from 'fs';
import path from 'path';
import * as bolt from 'bolt';
import ora from 'ora';
import chalk from 'chalk';
import { ExperimentalEsbuildCompiler } from '@atlaskit/webpack-config';
import yargs from 'yargs';

const cli = yargs
  .options({
    cwd: {
      type: 'string',
      default: process.cwd(),
    },
    main: {
      type: 'string',
      require: true,
    },
    verbose: {
      type: 'boolean',
      default: false,
    },
    basename: {
      type: 'string',
      default: '/',
    },
    favicon: {
      type: 'string',
    },
    minify: {
      type: 'boolean',
      default: true,
    },
    env: {
      type: 'string',
      default: 'production',
    },
  })
  .strict();

async function main() {
  const start = Date.now();
  const flags = cli.argv;

  const spinner = ora(`canvas builds`).start();

  const cwd = path.resolve(process.cwd(), flags.cwd);
  const outdir = path.join(cwd, 'dist');
  const publicBase = path.join(cwd, 'public');
  const copying = cp(publicBase, outdir);

  const project = await bolt.getProject({ cwd });

  const esbuildCompiler = await ExperimentalEsbuildCompiler.create({
    fs,
    outdir: path.join(cwd, 'dist'),
    projectDir: project.dir,
    cwd,
    config: {
      splitting: true,
      minify: flags.minify,
      write: false,
      outdir: path.join(cwd, 'dist'),
      tsconfig: path.join(project.dir, 'tsconfig.json'),
      babelconfig: path.join(project.dir, 'babel.config.js'),
      entryPoints: {
        main: path.join(cwd, flags.main),
      },
      define: {
        'process.env.BASENAME': flags.basename,
        'process.env.NODE_ENV': flags.env,
      },
    },
  });

  esbuildCompiler.addHtml({
    template: path.join(cwd, 'index.html'),
    entryPoints: ['main.js', 'main.css'],
    publicPath: flags.basename,
    favicon: flags.favicon,
  });

  const result = await esbuildCompiler.run();
  const duration = (Date.now() - start) / 1000;
  const seconds = chalk.dim(` ⏱ ${duration.toFixed(2)}s`);
  const warnings =
    result.warnings.length > 0
      ? chalk.dim(` ⚠️ ${result.warnings.length}`)
      : '';

  if (result.warnings.length > 0 && flags.verbose) {
    spinner.stop();
    spinner.text = '';

    result.warnings.forEach((warning: any) =>
      esbuildCompiler.print(warning, {
        resolvePath: id => id,
        level: 'warning',
      }),
    );
  }

  if (result.errors.length > 0) {
    spinner.stop();
    spinner.text = '';

    result.errors.forEach((error: any) =>
      esbuildCompiler.print(error, {
        resolvePath: id => id,
        level: 'error',
      }),
    );

    spinner.fail(`canvas failed ${seconds}`);
    process.exit(1);
  } else {
    spinner.succeed(`canvas built ${warnings}${seconds}`);
  }

  await copying;
}

async function cp(src: string, dest: string): Promise<void> {
  const [entries] = await Promise.all([
    fs.promises.readdir(src, { withFileTypes: true }),
    fs.promises.mkdir(dest, { recursive: true }),
  ]);

  await Promise.all<void>(
    entries.map(async entry => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await cp(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }),
  );
}

main().catch(err => {
  process.stderr.write(err);
  process.exit(1);
});
