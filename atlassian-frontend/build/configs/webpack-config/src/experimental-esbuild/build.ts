import fs from 'fs';
import * as esbuild from 'esbuild';
import memfs from 'memfs';

export interface BuildOpts {
  fs: typeof fs | memfs.IFs;
  options: esbuild.BuildOptions;
}

export async function build(opts: BuildOpts) {
  try {
    const result = await esbuild.build(opts.options);
    await opts.fs.promises.mkdir(opts.options.outdir!, { recursive: true });

    await Promise.all(
      (result.outputFiles ?? []).map(async outputFile => {
        await opts.fs.promises.writeFile(outputFile.path, outputFile.contents);
      }),
    );

    return {
      ...result,
      warnings: result.warnings.filter(
        warning => !warning.location?.file.includes('node_modules'),
      ),
    };
  } catch (err) {
    return {
      errors: err.errors ?? [{ text: err.message }],
      warnings: [],
      outputFiles: [],
    };
  }
}
