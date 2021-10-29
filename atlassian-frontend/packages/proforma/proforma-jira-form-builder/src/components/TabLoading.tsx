import React, { FunctionComponent } from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Spinner from '@atlaskit/spinner';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';

export const TabLoading: FunctionComponent = () => {
  return (
    <LoadingWrapper>
      <LoadingBlock>
        <Spinner size="large" />
      </LoadingBlock>
      <LoadingBlock>
        <FormattedMessage {...IntlCommonMessages[CommonMessage.Loading]} />
        ...
      </LoadingBlock>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 400px;
  padding: 20px;
`;

const LoadingBlock = styled.div`
  flex-shrink: 1;
  margin: auto 10px;
`;
