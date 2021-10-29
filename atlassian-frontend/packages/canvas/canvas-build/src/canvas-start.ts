import path from 'path';
import * as bolt from 'bolt';
import ora from 'ora';
import chalk from 'chalk';
import {
  ExperimentalEsbuildCompiler,
  ExperimentalEsbuildServer,
} from '@atlaskit/webpack-config';
import yargs from 'yargs';

const cli = yargs
  .options({
    port: {
      type: 'number',
      default: parseInt(process.env.PORT ?? '9010'),
    },
    main: {
      type: 'string',
      require: true,
    },
    cwd: {
      type: 'string',
      default: process.cwd(),
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
      default: false,
    },
    env: {
      type: 'string',
      default: 'development',
    },
  })
  .strict();

async function main() {
  const start = Date.now();
  const flags = cli.argv;
  const host = `http://localhost:${flags.port}`;

  const spinner = ora(`${host} - canvas starts`).start();

  let watchRun = false;

  const cwd = path.resolve(process.cwd(), flags.cwd);
  const project = await bolt.getProject({ cwd });

  const esbuildCompiler = await ExperimentalEsbuildCompiler.create({
    outdir: path.join(cwd, 'dist'),
    projectDir: project.dir,
    cwd,
    config: {
      splitting: true,
      minify: flags.minify,
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

  esbuildCompiler
    .on('invalidate', () => {
      if (watchRun && process.stdout?.isTTY) {
        const stdout = process.stdout as any;
        stdout.moveCursor(0, -1);
        stdout.clearLine(1);
      }

      watchRun = true;
      spinner.start(`${host} - canvas updates`);
    })
    .on('result', (result: any, duration: number) => {
      const seconds = chalk.dim(` ⏱ ${(duration / 1000).toFixed(2)}s`);
      const warnings =
        result.warnings.length > 0
          ? chalk.dim(` ⚠️ ${result.warnings.length}`)
          : '';

      if (result.warnings.length > 0 && flags.verbose) {
        result.warnings.forEach((warning: any) =>
          esbuildCompiler.print(warning, {
            resolvePath: id => id,
            level: 'warning',
          }),
        );
      }

      spinner.stop();

      if (result.errors.length > 0) {
        result.errors.forEach((error: any) =>
          esbuildCompiler.print(error, {
            resolvePath: id => id,
            level: 'error',
          }),
        );

        spinner.fail(`${host} - canvas update failed ${seconds}`);
      } else {
        spinner.succeed(`${host} - canvas updated ${warnings}${seconds}`);
      }
    });

  const esbuildServer = ExperimentalEsbuildServer.create(esbuildCompiler, {
    publicBase: path.join(cwd, 'public'),
  }).on('defer', (deferred: boolean) => {
    if (deferred && !spinner.text.includes('waiting...')) {
      spinner.text = spinner.text + chalk.dim(' waiting...');
    } else {
      spinner.text = spinner.text.replace(/ waiting\.\.\.$/, '');
    }
  });

  const result = await esbuildServer.listen(flags.port);
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
      esbuildServer.print(error, {
        resolvePath: id => id,
        level: 'error',
      }),
    );

    spinner.fail(`${host} - canvas start failed ${seconds}`);
    process.exit(1);
  } else {
    spinner.succeed(`${host} - canvas started ${warnings}${seconds}`);
  }
}

main().catch(err => {
  process.stderr.write(err);
  process.exit(1);
});
