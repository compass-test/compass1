/* eslint-disable import/dynamic-import-chunkname */
import { CLJSModule } from './types';
import { getProfile } from './user-profile';
import { CollabEditProvider } from '@atlaskit/editor-common/collab';
import {
  stepFromDelta,
  validateSteps,
} from '@atlassian/synchrony-delta-to-steps';

function location(window: Window) {
  try {
    return window.parent.location;
  } catch (err) {
    return window.location;
  }
}

export default async function createSynchronyProvider(
  serverUrl: string,
): Promise<CollabEditProvider | null> {
  const cljs: CLJSModule = await import(
    /*webpackChunkName: "@atlassian/prosemirror-synchrony-plugin/cljs" */ '@atlassian/prosemirror-synchrony-plugin/build/cljs'
  );

  const params = new URLSearchParams(location(window).search);
  const host = params.get('host');
  const port: string = params.get('port') ?? '10123';
  const docns: string = params.get('docns') ?? 'myapp';
  const docid: string = params.get('docid') ?? 'atldemo';
  const jwtduration: number = parseInt(params.get('jwtduration') ?? '30', 10);

  const socketWorkerEnabled =
    params.has('socketWorker') && params.get('socketWorker') !== 'false';
  const customStepFromDelta =
    params.has('stepFromDelta') && params.get('stepFromDelta') !== 'false';

  const provider = await import(
    /*webpackChunkName: "@atlassian/prosemirror-synchrony-plugin/build/collab-provider" */ '@atlassian/prosemirror-synchrony-plugin/build/collab-provider'
  );

  const synchronyURl = host ? `http://${host}:${port}/v1` : `${serverUrl}/v1`;
  const entityId = `${docns}/${docid}`;

  const jwt = async () => {
    const duration =
      typeof jwtduration === 'string' ? parseInt(jwtduration, 10) : jwtduration;
    return cljs.default.create_development_token(
      synchronyURl,
      `${docns}/\*`,
      duration,
    );
  };

  // eslint-disable-next-line import/no-extraneous-dependencies
  const worker = require('worker-plugin/loader?name=diff_js!@atlassian/prosemirror-synchrony-plugin/build/diff_js.worker.js');

  const socketWorkerPath = socketWorkerEnabled
    ? // eslint-disable-next-line import/no-extraneous-dependencies
      require('worker-plugin/loader?name=websocket!@atlassian/prosemirror-synchrony-plugin/build/websocket.worker.js')
    : undefined;

  return new provider.Provider(
    {
      url: synchronyURl,
      jwt,
      entityId,
      worker: new Worker(worker),
      websocketWorker: socketWorkerPath
        ? new Worker(socketWorkerPath)
        : undefined,
    },
    getProfile,
    {
      ...(customStepFromDelta && {
        customStepFromDeltaFn: {
          stepFromDelta,
          validateSteps,
        },
      }),
    },
  );
}
