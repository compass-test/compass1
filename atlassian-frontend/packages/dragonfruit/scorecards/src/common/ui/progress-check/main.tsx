import React from 'react';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import * as colors from '@atlaskit/theme/colors';

import incompleteCheck from '../../assets/IncompleteCheck.svg';

import { ProgressCheckWrapper } from './styled';

interface Props {
  complete?: boolean;
  testId?: string;
}

export const ProgressCheck: React.FC<Props> = ({
  complete = false,
  testId,
}) => {
  if (!complete) {
    return (
      <ProgressCheckWrapper data-testid={testId && `${testId}.incomplete`}>
        <img src={incompleteCheck} height="24" width="24" />
      </ProgressCheckWrapper>
    );
  }

  return (
    <ProgressCheckWrapper data-testid={testId && `${testId}.complete`}>
      <CheckCircleIcon label="" size="medium" primaryColor={colors.G300} />
    </ProgressCheckWrapper>
  );
};
