import React, { useEffect } from 'react';

import { setupWorker } from 'msw';

import { HeartbeatDisplay } from '../src';
import { handlers } from '../src/__mocks__/handlers';

export default () => {
  useEffect(() => {
    const worker = setupWorker(...handlers);

    // Start the Mock Service Worker
    worker.start();
    worker.printHandlers();
  }, []);

  return <HeartbeatDisplay idleTime={2000} />;
};
