import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';
import * as esbuild from 'esbuild';
import memfs from 'memfs';
import { build } from './build';
import { Scheduler } from './scheduler';
import { watch } from './watch';
import { print, PrintOptions } from './print';
import { Message } from 'esbuild';
import {
  createWebsiteEsbuildConfig,
  CreateWebsiteEsbuildConfig,
} from './create-website-esbuild-config';
import {
  CreateEsbuildConfig,
  createEsbuildConfig,
} from './create-esbuild-config';
import { pluginHtml } from './plugin-html';

export interface CreateExperimentalWebsiteCompilerOptions {
  cwd: string;
  projectDir: string;
  globs: string[];
  isEnabled(id: string): boolean;
  isRunning(id: string): boolean;
  isFile: boolean;
  isPrivateWebsiteBuild: boolean;
  isProduction: boolean;
  extractReactTypes: boolean;
  contentBase: string;
  define?: CreateWebsiteEsbuildConfig['define'];
  minify?: boolean;
}

export interface CreateExperimentalCompilerOptions {
  fs?: memfs.IFs | typeof fs;
  cwd: string;
  outdir: string;
  projectDir: string;
  config: CreateEsbuildConfig;
}

export interface AddHtmlOpts {
  template: string;
  title?: string;
  entryPoints?: string[];
  publicPath?: string;
  favicon?: string;
}

interface ExperimentalCompilerOptions {
  cwd: string;
  projectDir: string;
  config: esbuild.BuildOptions;
  fs: memfs.IFs;
}

export class ExperimentalEsbuildCompiler extends EventEmitter {
  public readonly fs: memfs.IFs;

  public readonly scheduler = new Scheduler<esbuild.BuildResult>({
    maxBacklogLength: 2,
    maxConcurrency: 1,
  });

  public readonly cwd: string;
  public readonly rootPath: string;
  public readonly outdir: string;

  public readonly config: esbuild.BuildOptions;

  private constructor(opts: ExperimentalCompilerOptions) {
    super();

    this.cwd = opts.cwd;
    this.rootPath = opts.projectDir;
    this.outdir = path.join(opts.projectDir, 'website/public/output');
    this.fs = opts.fs;
    this.config = opts.config;
  }

  static async website(opts: CreateExperimentalWebsiteCompilerOptions) {
    const fs = memfs.createFsFromVolume(new memfs.Volume());
    const outdir = path.join(opts.projectDir, 'website/public/output');

    const config = await createWebsiteEsbuildConfig({
      fs,
      globs: opts.globs,
      incremental: false,
      write: true,
      isEnabled: opts.isEnabled,
      isRunning: opts.isRunning,
      plugins: [],
      isPrivateWebsiteBuild: opts.isPrivateWebsiteBuild,
      cwd: opts.cwd,
      rootPath: opts.projectDir,
      outdir,
      isProduction: opts.isProduction,
      contentBase: opts.contentBase,
      define: opts.define,
      minify: opts.minify,
    });

    return new ExperimentalEsbuildCompiler({
      fs,
      config,
      cwd: opts.cwd,
      projectDir: opts.projectDir,
    });
  }

  static async create(opts: CreateExperimentalCompilerOptions) {
    const fs = memfs.createFsFromVolume(new memfs.Volume());
    const config = await createEsbuildConfig(opts.config);

    return new ExperimentalEsbuildCompiler({
      fs,
      config,
      cwd: opts.cwd,
      projectDir: opts.projectDir,
    });
  }

  async run() {
    return build({
      fs: this.fs,
      options: {
        ...this.config,
        incremental: false,
        write: true,
      },
    });
  }

  async watch() {
    const building = build({
      fs: this.fs,
      options: {
        ...this.config,
        incremental: true,
        write: false,
      },
    });

    this.scheduler.add(() => building);
    const result = await building;

    await watch(result, {
      scheduler: this.scheduler,
      rootPath: this.rootPath,
      cwd: this.cwd,
      outdir: this.config.outdir!,
      fs: this.fs,
      onInvalidate: () => {
        this.emit('invalidate');
      },
      onResult: (result, duration) => {
        this.emit('result', result, duration);
      },
    });

    return result;
  }

  public addPlugin(plugin: esbuild.Plugin) {
    this.config.plugins?.push(plugin);
  }

  public addHtml(opts: AddHtmlOpts) {
    this.config.plugins?.push(
      pluginHtml({
        template: opts.template,
        outdir: this.config.outdir!,
        entryPoints:
          opts.entryPoints ??
          Object.keys(this.config.entryPoints ?? {}).map(e => `${e}.js`),
        publicPath: opts.publicPath ?? this.config.publicPath!,
        fs: this.fs,
        favicon: opts.favicon,
        title: opts.title,
      }),
    );
  }

  public print(message: Message, options: PrintOptions): void {
    print(message, options);
  }
}
