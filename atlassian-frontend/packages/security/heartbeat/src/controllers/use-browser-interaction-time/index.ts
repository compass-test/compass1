import { useEffect, useState } from 'react';

import browserInteractionTime from 'browser-interaction-time';

export const useBrowserInteractionTime = (threshold: number) => {
  const [idle, setIdle] = useState<boolean>(false);

  useEffect(() => {
    const timer = new browserInteractionTime({
      idleTimeoutMs: threshold,
      stopTimerOnTabchange: false,
      browserTabActiveCallbacks: [
        () => {
          setIdle(false);
        },
      ],
      browserTabInactiveCallbacks: [
        () => {
          setIdle(true);
        },
      ],
      idleCallbacks: [
        () => {
          setIdle(true);
        },
      ],
      activeCallbacks: [
        () => {
          setIdle(false);
        },
      ],
    });
    timer.startTimer();
  }, [threshold]);

  return { idle };
};
