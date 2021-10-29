import path from 'path';
import { EventEmitter } from 'events';
import { BuildResult, Message } from 'esbuild';
import express from 'express';
import { ExperimentalEsbuildCompiler } from './experimental-esbuild-compiler';
import { serveStatic } from './serve-static';
import { print, PrintOptions } from './print';

export type ExperimentalEsbuildServerOptions = Partial<
  ExperimentalEsbuildServerInit
>;
interface ExperimentalEsbuildServerInit {
  hot: boolean;
  contentBase: string;
  publicBase?: string;
}

export class ExperimentalEsbuildServer extends EventEmitter {
  private app: express.Express;

  private constructor(
    private compiler: ExperimentalEsbuildCompiler,
    opts: ExperimentalEsbuildServerInit,
  ) {
    super();

    if (opts.hot) {
      this.compiler.addPlugin({
        name: 'esbuild-reload-client',
        setup(build) {
          const reloadPath = path.join(__dirname, 'esbuild-reload.js');
          const inject = build.initialOptions.inject ?? [];

          if (!inject.includes(reloadPath)) {
            inject.push(reloadPath);
            build.initialOptions.inject = inject;
          }
        },
      });
    }

    this.app = express()
      .get('/events', (req, res) => {
        res.contentType('text/event-stream');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Cache-Control', 'no-cache');

        res.flushHeaders();
        res.write('retry: 10000\n\n');

        const invalidate = () => res.write(`data: invalidate\n\n`);
        this.compiler.on('invalidate', invalidate);

        req.on('close', () => {
          this.compiler.off('invalidate', invalidate);
        });
      })
      .use((_, __, next) => {
        let deferred = false;

        compiler.scheduler.onEmpty(() => {
          deferred = false;
          this.emit('defer', deferred);
          next();
        });

        if (!deferred) {
          deferred = true;
          this.emit('defer', deferred);
        }
      })
      .use(serveStatic(opts.contentBase, { fs: compiler.fs }))
      .use(serveStatic(opts.contentBase));

    if (opts.publicBase) {
      this.app = this.app.use(serveStatic(opts.publicBase));
    }
  }

  static create(
    compiler: ExperimentalEsbuildCompiler,
    opts?: ExperimentalEsbuildServerOptions,
  ) {
    return new ExperimentalEsbuildServer(compiler, {
      hot: opts?.hot ?? true,
      contentBase: opts?.contentBase ?? compiler.config.outdir!,
      publicBase: opts?.publicBase,
    });
  }

  public async listen(port: number): Promise<BuildResult> {
    return new Promise((resolve, reject) => {
      this.compiler.on('invalidate', () => {});

      this.app.listen(port, err => {
        if (err) {
          reject(err);
        } else {
          this.compiler.watch().then(resolve);
        }
      });
    });
  }

  public print(message: Message, options: PrintOptions): void {
    print(message, options);
  }
}
