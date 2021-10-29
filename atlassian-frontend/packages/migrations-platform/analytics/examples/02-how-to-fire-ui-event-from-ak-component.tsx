import React from 'react';

import Button from '@atlaskit/button';

import { useCallbackWithUIEventController } from '../src';

type Props = {
  onClick: (...args: any[]) => void;
};

const payloadOverwrite = {
  actionSubjectId: 'myCoolButton',
};

export default ({ onClick }: Props) => {
  const onClickNew = useCallbackWithUIEventController(
    onClick,
    payloadOverwrite,
  );

  return (
    <Button onClick={onClickNew}>
      Click me and sent an UIEvent! Click the source code button to learn more!
    </Button>
  );
};
