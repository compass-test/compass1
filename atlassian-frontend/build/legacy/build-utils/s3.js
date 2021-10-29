const s3 = require('@auth0/s3');

/** A wrapper around the @auth0/s3 client that provides promise-based methods for
 *  certain functions.
 *
 *  The @auth0/s3 client can be accessed via the `client` property
 */
class S3Wrapper {
  constructor(options = {}, clientOpts = {}) {
    this.logger = options.logger || console;
    const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;

    const awsAccessKey = options.accessKey || AWS_ACCESS_KEY;
    const awsSecretKey = options.secretKey || AWS_SECRET_KEY;
    const region = options.region || 'ap-southeast-2';

    if (!awsAccessKey || !awsSecretKey) {
      throw Error(
        '$AWS_ACCESS_KEY or $AWS_SECRET_KEY environment variables are not set',
      );
    }

    this.client = s3.createClient({
      maxAsyncS3: 20, // this is the default
      s3RetryCount: 3, // this is the default
      s3RetryDelay: 1000, // this is the default
      multipartUploadThreshold: 20971520, // this is the default (20 MB)
      multipartUploadSize: 15728640, // this is the default (15 MB)
      s3Options: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretKey,
        region,
      },
      ...clientOpts,
    });
  }

  uploadFile(params) {
    return new Promise((resolve, reject) => {
      const uploader = this.client.uploadFile(params);
      let progress = 0;
      uploader.on('progress', () => {
        const curProgress =
          (uploader.progressAmount / uploader.progressTotal) * 100;
        if (curProgress > progress + 10) {
          this.logger.log(`progress: ${progress}%`);
          progress = curProgress;
        }
      });
      uploader.on('end', () => {
        this.logger.log('done uploading');
        resolve(uploader);
      });
      uploader.on('error', err => {
        reject(err);
      });
    });
  }

  fileExists(params) {
    return new Promise((resolve, reject) => {
      this.client.s3.headObject(params, err => {
        if (err) {
          if (err.name === 'NotFound') {
            resolve(false);
          }
          reject(err);
        }
        resolve(true);
      });
    });
  }

  downloadFile(params) {
    return new Promise((resolve, reject) => {
      const downloader = this.client.downloadFile(params);
      let progress = 0;
      downloader.on('progress', () => {
        const curProgress =
          (downloader.progressAmount / downloader.progressTotal) * 100;
        if (curProgress > progress + 10) {
          this.logger.log(`progress: ${progress}%`);
          progress = curProgress;
        }
      });
      downloader.on('end', () => {
        this.logger.log('done downloading');
        resolve(downloader);
      });
      downloader.on('error', err => {
        reject(err);
      });
    });
  }

  uploadDir(params) {
    return new Promise((resolve, reject) => {
      const uploader = this.client.uploadDir(params);
      let progress = 0;
      uploader.on('error', err => {
        reject(err);
      });
      uploader.on('progress', () => {
        const curProgress =
          (uploader.progressAmount / uploader.progressTotal) * 100;
        if (curProgress > progress + 10) {
          this.logger.log(`progress: ${progress}%`);
          progress = curProgress;
        }
      });
      uploader.on('end', () => {
        this.logger.log('done uploading');
        resolve(uploader);
      });
    });
  }

  downloadDir(params) {
    this.logger.log({ params });
    return new Promise((resolve, reject) => {
      const downloader = this.client.downloadDir(params);
      let progress = 0;
      downloader.on('error', err => {
        reject(err);
      });
      downloader.on('progress', () => {
        const curProgress =
          (downloader.progressAmount / downloader.progressTotal) * 100;
        if (curProgress > progress + 10) {
          this.logger.log(`progress: ${progress}%`);
          progress = curProgress;
        }
      });
      downloader.on('end', () => {
        this.logger.log('done downloading');
        resolve(downloader);
      });
    });
  }
}

module.exports = { S3Wrapper };
