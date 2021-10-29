import path from 'path';
import { BuildResult } from 'esbuild';
import chokidar from 'chokidar';
import memfs from 'memfs';
import { Scheduler } from './scheduler';

export interface WatchOptions {
  scheduler: Scheduler;
  rootPath: string;
  cwd: string;
  outdir: string;
  fs: memfs.IFs;
  onInvalidate(): void;
  onResult(result: BuildResult, duration: number): void;
}

export async function watch(result: BuildResult, options: WatchOptions) {
  const inputs = Object.keys(result.metafile?.inputs ?? {})
    .map(inputPath => path.join(process.cwd(), inputPath))
    .filter(inputPath => !inputPath.includes('/node_modules/'));

  const watcher = chokidar.watch(inputs, {
    disableGlobbing: true,
    ignoreInitial: true,
    cwd: options.rootPath,
  });

  watcher.on('change', () => {
    const start = Date.now();

    options.scheduler.add(async () => {
      try {
        options.onInvalidate();
        result = await result.rebuild!();
        const duration = Date.now() - start;

        await options.fs.promises.mkdir(options.outdir, { recursive: true });

        await Promise.all(
          (result.outputFiles ?? []).map(async outputFile => {
            await options.fs.promises.writeFile(
              outputFile.path,
              outputFile.contents,
            );
          }),
        );

        options.onResult(
          {
            ...result,
            warnings: result.warnings.filter(
              warning => !warning.location?.file.includes('node_modules'),
            ),
          },
          duration,
        );
      } catch (err) {
        const duration = Date.now() - start;

        options.onResult(
          {
            errors: err.errors ?? [{ text: err.message }],
            warnings: [],
            outputFiles: [],
          },
          duration,
        );
      }
    });
  });
}
