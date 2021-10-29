import fs from 'fs';
import path from 'path';

import rimraf from 'rimraf';

import { Logger } from './logger';
import { copyDir } from './util';

export interface RemoteStoreConstructor {
  new (logger: Logger): RemoteStore;
}

export interface RemoteStore {
  fetch(hash: string, cacheDirectory: string): Promise<boolean>;
  put(hash: string, cacheDirectory: string): Promise<boolean>;
}

export class Store {
  constructor(
    private logger: Logger,
    private cacheDirectory: string,
    private remoteStore?: RemoteStore,
  ) {
    fs.mkdirSync(cacheDirectory, { recursive: true });
  }

  private readonly defaultMetadata = {
    version: '2.0.0',
  };

  /** Fetches cached output of a package with `hash` to `packageDir`
   *  `packageDir` should be an absolute filepath
   */
  async fetch(packageDir: string, hash: string) {
    let metadata = await this.fetchLocal(packageDir, hash);

    if (
      !metadata &&
      (await this.remoteStore?.fetch(hash, this.cacheDirectory))
    ) {
      metadata = await this.fetchLocal(packageDir, hash);
      if (!metadata) {
        this.logger.warn(
          `Failed to copy cache from local dir after successfully fetching remotely (${hash})`,
          packageDir,
        );
      }
    }
    return metadata;
  }

  /** Stores output of `packageDir` matching `outputGlob` under `hash`
   *  `packageDir` should be an absolute filepath
   */
  async put(
    packageDir: string,
    hash: string,
    outputGlob: string[],
    metadata?: { [key: string]: string },
  ) {
    let success = await this.putLocal(packageDir, hash, outputGlob, metadata);
    if (success && this.remoteStore) {
      success = await this.remoteStore.put(hash, this.cacheDirectory);
      if (!success) {
        this.logger.warn(
          `Failed to store cache remotely (${hash})`,
          packageDir,
        );
      }
    }
    return success;
  }

  private async fetchLocal(
    packageDir: string,
    hash: string,
  ): Promise<null | { [key: string]: string }> {
    const cachePath = this.getCachePath(hash);
    const metadataFile = this.getMetadataFile(hash);
    const isPathLegacy = !fs.existsSync(metadataFile);
    this.logger.trace(
      `Fetching locally from "${cachePath}" to "${packageDir}" for "${hash}"`,
    );

    const commitFile = isPathLegacy
      ? this.getLegacyCommitFile(hash)
      : this.getCommitFile(hash);

    if (!fs.existsSync(commitFile)) {
      return null;
    }

    try {
      const outputPath = isPathLegacy
        ? this.getCachePath(hash)
        : this.getOutputPath(hash);

      await copyDir(outputPath, packageDir);
      return isPathLegacy
        ? {}
        : JSON.parse(fs.readFileSync(metadataFile, 'utf8'));
    } catch (e) {
      this.logger.error(
        `Error copying files from local cache (${hash}): ${e}`,
        packageDir,
      );
      return null;
    }
  }

  private async putLocal(
    packageDir: string,
    hash: string,
    outputGlob: string[],
    customMetadata?: { [key: string]: string },
  ) {
    const metadata = { ...this.defaultMetadata, ...customMetadata };
    const commitFile = this.getCommitFile(hash);
    const cachePath = this.getCachePath(hash);
    this.logger.trace(
      `Storing locally from "${packageDir}" for "${hash}" to "${cachePath}"`,
    );

    rimraf.sync(cachePath);

    if (!fs.existsSync(cachePath)) {
      fs.mkdirSync(cachePath);
    }

    try {
      const outputPath = this.getOutputPath(hash);
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      const metadataFile = this.getMetadataFile(hash);
      fs.writeFileSync(metadataFile, JSON.stringify(metadata));

      await copyDir(packageDir, outputPath, outputGlob);
    } catch (e) {
      this.logger.error(
        `Error copying files to local cache (${hash}): ${e}`,
        packageDir,
      );
      return false;
    }

    fs.writeFileSync(commitFile, 'true');
    return true;
  }

  private getCachePath(hash: string) {
    return path.join(this.cacheDirectory, hash);
  }

  private getOutputPath(hash: string) {
    return path.join(this.cacheDirectory, hash, `output`);
  }

  private getCommitFile(hash: string) {
    return path.join(this.cacheDirectory, hash, `commit`);
  }

  private getLegacyCommitFile(hash: string) {
    return `${path.join(this.cacheDirectory, hash)}.commit`;
  }

  private getMetadataFile(hash: string) {
    return path.join(this.cacheDirectory, hash, `metadata`);
  }
}
