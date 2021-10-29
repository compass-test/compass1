import React from 'react';

import { Flow, FlowProps } from './index';

export const mockOnComplete = (data: any) => {
  // eslint-disable-next-line no-console
  console.log('completed', data);
};

export type OptionalProps<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/**
  A Flow with partially setup properties for testing purpose
 */
export const TestFlow = <T extends object = {}>({
  definition,
  onComplete = mockOnComplete,
  onCancel,
}: OptionalProps<FlowProps<T>, 'onComplete'>) => (
  <Flow definition={definition} onComplete={onComplete} onCancel={onCancel} />
);
