import fs from 'fs';
import path from 'path';

type StepData = {
  boltInstallStart?: number;
  boltInstallEnd?: number;
  boltCacheHit?: boolean;
  testCacheHits?: number;
  testCacheMisses?: number;
  buildCacheHits?: number;
  buildCacheMisses?: number;
  numTestFiles?: number;
  parallelBucketSize?: string;
};

export class RepoMetricsStore {
  private store?: StepData;
  private filepath: string;

  constructor() {
    const currentStep = parseInt(process.env.BITBUCKET_PARALLEL_STEP || '0');
    this.filepath = path.resolve(
      __dirname,
      `../../../metrics-store-${currentStep}.json`,
    );
  }

  get(): StepData {
    if (!fs.existsSync(this.filepath)) {
      console.log(`Metrics store file "${this.filepath}" does not exist`);
      return {};
    }

    return JSON.parse(fs.readFileSync(this.filepath, 'utf-8'));
  }

  set(data: Partial<StepData>) {
    this.store = {
      ...this.get(),
      ...data,
    };

    fs.writeFileSync(this.filepath, JSON.stringify(this.store, null, 2));
  }
}
