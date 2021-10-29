import React from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { N40 } from '@atlaskit/theme/colors';

import { messages } from './messages';

interface FormCardProps {
  formName: string;
  issueType: string;
  avatarUrl?: string;
  onClick: () => void;
}

export const FormCard: React.FunctionComponent<FormCardProps> = ({
  formName,
  issueType,
  avatarUrl,
  onClick,
}) => {
  return (
    <FormCardWrapper onClick={onClick}>
      {avatarUrl && <FormCardImg src={avatarUrl} />}
      <FormCardInfo>
        <div>
          <FormattedMessage
            {...messages.formCardLayout}
            values={{
              label: (
                <strong>
                  <FormattedMessage {...messages.formCardNameLabel} />
                </strong>
              ),
              value: formName,
            }}
          />
        </div>
        <div>
          <FormattedMessage
            {...messages.formCardLayout}
            values={{
              label: (
                <strong>
                  <FormattedMessage {...messages.formCardIssueTypeLabel} />
                </strong>
              ),
              value: issueType,
            }}
          />
        </div>
      </FormCardInfo>
    </FormCardWrapper>
  );
};

const FormCardWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  margin: 0 0 8px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px 0 ${N40};
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: $grams-hair;
  }

  &.--active {
    font-weight: 500;
    background-color: $squid-ink;
    color: $white;
    cursor: default;
  }
`;

const FormCardImg = styled.img`
  height: 50px;
  width: 50px;
  min-width: 50px;
  margin-right: 8px;
  padding: 4px;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: $white;
`;

const FormCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 64px);
  height: 100%;
  padding: 4px 0;
  box-sizing: border-box;
`;
