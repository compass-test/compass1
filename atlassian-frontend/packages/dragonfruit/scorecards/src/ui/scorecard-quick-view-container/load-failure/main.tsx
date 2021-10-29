import React from 'react';

import { Card, CardBody } from '@atlassian/dragonfruit-common-ui';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { Body, Container, Image, Title } from './styled';

type Props = {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
};

export default function LoadFailure({ testId }: Props) {
  const { formatMessage } = useIntl();

  return (
    <Container data-testid={testId ?? 'load-failure'}>
      <Card>
        <CardBody>
          <Title>{formatMessage(messages.title)}</Title>

          <Image src={ErrorIcon} data-testid="error-image" />

          <Body>{formatMessage(messages.body)}</Body>
        </CardBody>
      </Card>
    </Container>
  );
}
