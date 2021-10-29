import React from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import { N40 } from '@atlaskit/theme/colors';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';

import {
  IntlIssueCreateMessages,
  IssueCreateMessage,
} from '../IssueCreateMessages.intl';

interface ActiveFormDetailsProps {
  formName: string;
  projectName: string;
  issueTypeName: string;
  handleChangeForm?: () => void;
}

export const ActiveFormDetails: React.FunctionComponent<ActiveFormDetailsProps> = ({
  formName,
  projectName,
  issueTypeName,
  handleChangeForm,
}) => {
  return (
    <ActiveFormDetailsContainer data-testid="issue-create-active-form-details">
      <ActiveFormDetailsContent>
        <p>
          <strong>
            <FormattedMessage
              {...IntlIssueCreateMessages[
                IssueCreateMessage.IssueCreateActiveFormName
              ]}
            />
            {': '}
          </strong>
          <span>{formName}</span>
        </p>
        <p>
          <strong>
            <FormattedMessage {...IntlCommonMessages[CommonMessage.Project]} />
            {': '}
          </strong>
          <span>{projectName}</span>
        </p>
        <p>
          <strong>
            <FormattedMessage
              {...IntlIssueCreateMessages[
                IssueCreateMessage.IssueCreateActiveFormType
              ]}
            />
            {': '}
          </strong>
          <span>{issueTypeName}</span>
        </p>
      </ActiveFormDetailsContent>
      {handleChangeForm && (
        <div>
          <Button
            testId="issue-create-change-form-btn"
            onClick={handleChangeForm}
          >
            <FormattedMessage {...IntlCommonMessages[CommonMessage.Change]} />
          </Button>
        </div>
      )}
    </ActiveFormDetailsContainer>
  );
};

const ActiveFormDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border: solid 1px ${N40};
  border-radius: 5px;
`;

const ActiveFormDetailsContent = styled.div`
  flex-direction: column;
  display: flex;
  width: calc(100% - 55px);
`;
