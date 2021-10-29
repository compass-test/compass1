import React from 'react';

import Button from '@atlaskit/button';

import { useCallbackWithAnalyticsController } from '../src';

type Props = {
  onClick: (...args: any[]) => void;
};

const payload = {
  eventType: 'UI' as const,
  action: 'clicked',
  actionSubject: 'button',
  actionSubjectId: 'myCoolButton',
};

export default ({ onClick }: Props) => {
  const onClickNew = useCallbackWithAnalyticsController(onClick, payload);

  return (
    <Button onClick={onClickNew}>
      Click me and sent an UIEvent! Click the source code button to learn more!
    </Button>
  );
};
