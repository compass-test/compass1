import type { default as CoordinationClient } from '@atlassiansox/engagekit/dist/esm/coordination/coordination-client';
interface Props {
  startFn: (messageId: string) => Promise<boolean>;
  stopFn: (messageId: string) => Promise<boolean>;
}

const defaultStartFn = () =>
  new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(true), 250);
  });

const defaultStopFn = () =>
  new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(true), 250);
  });

export const mockCoordinationClient = (
  { startFn, stopFn }: Props = {
    startFn: defaultStartFn,
    stopFn: defaultStopFn,
  },
): CoordinationClient => {
  return {
    start: startFn,
    stop: stopFn,
  };
};
