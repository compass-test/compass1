import React from 'react';

import styled from 'styled-components';

import { HelperMessage } from '@atlaskit/form';

export const QuestionHelperMsg = ({ description }: any) => {
  return !!description ? (
    <HelperMessageWrapper>
      <HelperMessage>
        <span data-testid="description">{description}</span>
      </HelperMessage>
    </HelperMessageWrapper>
  ) : null;
};

const HelperMessageWrapper = styled.div`
  > div {
    font-size: 11px;
    margin-bottom: 4px;
  }
`;
