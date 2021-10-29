import React from 'react';

import Button from '@atlaskit/button';

interface Props {
  name: string;
  eventKey: string;
}

export const MetricName = ({ eventKey, name }: Props) => {
  return (
    <Button appearance="link" spacing="none" href={`/metric/${eventKey}/`}>
      {name}
    </Button>
  );
};
