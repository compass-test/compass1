import path from 'path';
import fs from 'fs';
import memFs from 'memfs';
import express from 'express';
import { FileSystemStorage } from 'send-stream';

export interface ServeStaticOptions {
  fs: typeof fs | memFs.IFs;
}

export const serveStatic = (
  publicPath: string,
  options?: ServeStaticOptions,
): express.RequestHandler => {
  const storage = new FileSystemStorage(publicPath, {
    defaultMimeType: 'application/octet-stream',
    dynamicCompression: true,
    fsModule: (options?.fs ?? fs) as typeof fs,
    onDirectory: 'serve-index',
  });

  return async (req, res, next) => {
    try {
      const result = await storage.prepareResponse(req.url, req);
      if (result.statusCode === 404) {
        if (!path.extname(req.path)) {
          const rootResponse = await storage.prepareResponse(
            '/index.html',
            req,
          );

          if (rootResponse.statusCode === 404) {
            return next();
          } else {
            return await rootResponse.send(res);
          }
        }

        return next();
      } else {
        await result.send(res);
      }
    } catch (err) {
      next(err);
    }
  };
};
