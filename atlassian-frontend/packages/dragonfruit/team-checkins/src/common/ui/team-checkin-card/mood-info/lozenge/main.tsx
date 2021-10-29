import React from 'react';

import Lozenge from '@atlaskit/lozenge';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from '../messages';

interface Props {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
  mood: number;
}

const MoodAsLozenge = ({ testId = 'lozenge', mood }: Props) => {
  const { formatMessage } = useIntl();

  const lozengeTestId = testId && `${testId}-${mood}`;

  switch (mood) {
    case 1:
      return (
        <Lozenge testId={lozengeTestId} appearance="removed">
          {formatMessage(messages.bad)}
        </Lozenge>
      );
    case 2:
      return (
        <Lozenge testId={lozengeTestId} appearance="moved">
          {formatMessage(messages.notGreat)}
        </Lozenge>
      );
    case 3:
      return (
        <Lozenge testId={lozengeTestId}>{formatMessage(messages.ok)}</Lozenge>
      );
    case 4:
      return (
        <Lozenge testId={lozengeTestId} appearance="success">
          {formatMessage(messages.good)}
        </Lozenge>
      );
    case 5:
      return (
        <Lozenge testId={lozengeTestId} appearance="success">
          {formatMessage(messages.great)}
        </Lozenge>
      );
    default:
      return <></>;
  }
};

export default MoodAsLozenge;
