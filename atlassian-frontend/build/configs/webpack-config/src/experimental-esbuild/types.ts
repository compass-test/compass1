import fs from 'fs';
import memfs from 'memfs';
import esbuild from 'esbuild';
import { Scheduler } from './scheduler';

export interface EsbuildCompiler {
  run(): Promise<esbuild.BuildResult>;
  watch(): Promise<esbuild.BuildResult>;
  scheduler: Scheduler;
  fs: typeof fs | memfs.IFs;
}

export interface EsbuildServer {
  listen(port: number): Promise<void>;
}
