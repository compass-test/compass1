import { ComponentLabBrowser, FilePath } from '../types';
import { Logger } from 'winston';
import { AbortSignal } from 'abort-controller';

import tempy from 'tempy';
import getPort from 'get-port';
import startServer from './HTTPServer';
import AwaitableDisposable from './AwaitableDisposable';
import nullthrows from 'nullthrows';
import ngrok from 'ngrok';
import crypto from 'crypto';

import JestWorker from 'jest-worker';
import { v4 as uuid } from 'uuid';

const TUNNEL_USER = 'componentlab';
const TUNNEL_PASSWORD = crypto.randomBytes(64).toString('base64');
const workerPath = require.resolve('./worker-entry.js');

export default async function runComponentLab({
  browser,
  runnerPlugins,
  metricsPlugins,
  logger,
  tests,
  signal,
}: {
  browser: ComponentLabBrowser;
  runnerPlugins: FilePath[];
  metricsPlugins: FilePath[];
  logger: Logger;
  tests: FilePath[];
  signal?: AbortSignal;
}): Promise<void> {
  if (tests.length === 0) {
    throw new Error('No tests provided.');
  }

  const runId = uuid();
  const runTs = new Date(new Date().toUTCString()).toISOString();
  const worker = new JestWorker(workerPath, {
    setupArgs: [{ browser, logLevel: logger.level }],
    enableWorkerThreads: true,
  });
  worker.getStdout().pipe(process.stdout);
  worker.getStderr().pipe(process.stderr);

  if (signal != null) {
    signal.addEventListener('abort', () => {
      worker.end();
    });
  }

  const serverRoot: FilePath = tempy.directory();
  const port = await getPort();
  let serverBaseUrl: string;

  const serverDisposable = new AwaitableDisposable(
    startServer({
      port,
      serverRoot,
    }),
  );

  if (browser.type === 'remote') {
    const connection = await connectToNgrok(port);
    logger.debug(`connected to ngrok using ${connection.url}`);
    serverBaseUrl = connection.url;
    serverDisposable.add(connection);
  } else {
    serverBaseUrl = `http://localhost:${port}`;
  }

  try {
    await Promise.all(
      tests.map((testPath) => {
        return (
          worker
            // @ts-ignore
            .processTest({
              metricsPlugins,
              runId,
              runTs,
              runnerPlugins,
              testPath,
              serverRoot,
              serverBaseUrl,
              tunnelUser: TUNNEL_USER,
              tunnelPassword: TUNNEL_PASSWORD,
            })
        );
      }),
    );
  } catch (e) {
    if (e.name !== 'TornDownError') {
      throw e;
    }
  } finally {
    await worker.end();
    await serverDisposable.dispose();
  }
}

async function connectToNgrok(
  port: number,
): Promise<{ url: string; dispose(): Promise<void> }> {
  const url = await ngrok.connect({
    port,
    authtoken: nullthrows(process.env.CL_NGROK_TOKEN),
    auth: [TUNNEL_USER, TUNNEL_PASSWORD].join(':'),
  });

  return {
    url,
    async dispose() {
      await ngrok.disconnect(url);
      await ngrok.kill();
    },
  };
}
