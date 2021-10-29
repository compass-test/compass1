import { promises as fsp } from 'fs';
import path from 'path';

import spawn from 'spawndamnit';

import { RemoteStore, Logger } from '@af/cache';
import { S3Wrapper } from '@atlaskit/build-utils/s3';

const bundleFilename = 'bundle.tar.gz';

/**
 * Remote cache store implementation backing onto s3
 */
export class S3RemoteStore implements RemoteStore {
  private s3: any;

  constructor(private logger: Logger) {
    this.s3 = new S3Wrapper({ logger: { log: () => {} } }, { maxAsyncS3: 50 });
  }

  async fetch(hash: string, cacheDirectory: string) {
    const params = this.getS3Params(hash, cacheDirectory);
    try {
      const cacheExists = await this.s3.fileExists(params.s3Params);
      if (!cacheExists) {
        return false;
      }
      await this.s3.downloadFile(params);
      await this.untar(cacheDirectory, hash);
      await fsp.writeFile(
        path.join(cacheDirectory, hash, 'commit'),
        'true',
        'utf8',
      );
    } catch (e) {
      this.logger.warn(`Error fetching remote cache for ${hash}: ${e}`);
      return false;
    }

    return true;
  }

  async put(hash: string, cacheDirectory: string) {
    const params = this.getS3Params(hash, cacheDirectory);
    try {
      await this.tar(cacheDirectory, hash);
      await this.s3.uploadFile(params);
    } catch (e) {
      this.logger.warn(`Error storing remote cache for ${hash}: ${e}`);
      return false;
    }
    return true;
  }

  private getS3Params(hash: string, cacheDirectory: string) {
    return {
      localFile: `${path.join(cacheDirectory, hash)}.${bundleFilename}`,
      s3Params: {
        Bucket: 'atlassian-frontend-private-us-east',
        Key: `build-cache/${hash}.${bundleFilename}`,
      },
    };
  }

  private tar(cacheDirectory: string, hash: string) {
    const cachePath = path.join(cacheDirectory, hash);
    const bundlePath = `${cachePath}.${bundleFilename}`;

    return spawn('tar', ['-czf', bundlePath, '-C', cachePath, '.'], {
      stdio: 'inherit',
    });
  }

  private async untar(cacheDirectory: string, hash: string) {
    const cachePath = path.join(cacheDirectory, hash);
    const bundlePath = `${cachePath}.${bundleFilename}`;
    await fsp.mkdir(cachePath, { recursive: true });
    return spawn('tar', ['-xzf', bundlePath, '-C', cachePath], {
      stdio: 'inherit',
    });
  }
}
