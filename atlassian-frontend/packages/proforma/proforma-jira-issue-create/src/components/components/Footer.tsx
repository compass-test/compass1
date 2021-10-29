import React from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button, { ButtonGroup } from '@atlaskit/button';
import LoadingButton from '@atlaskit/button/loading-button';
import { Checkbox } from '@atlaskit/checkbox';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';

interface FooterProps {
  cancelOnly: boolean;
  handleCancel: () => void;
  handleCreate: () => void;
  handleCreateAnother: (value: boolean) => void;
  createAnother: boolean;
  creatingIssue: boolean;
}

export const Footer: React.FunctionComponent<FooterProps> = ({
  cancelOnly,
  handleCancel,
  handleCreate,
  handleCreateAnother,
  createAnother,
  creatingIssue,
}) => {
  return (
    <IssueCreateFooter data-testid="issue-create-footer">
      {!cancelOnly && (
        <CheckboxWrapper>
          <Checkbox
            label={
              <FormattedMessage
                {...IntlCommonMessages[CommonMessage.CreateAnother]}
              />
            }
            value={0}
            name="createAnotherBtn"
            onChange={event => {
              handleCreateAnother(event.target.checked);
            }}
            isChecked={createAnother}
            testId="issue-create-create-another-checkbox"
          />
        </CheckboxWrapper>
      )}
      <ButtonGroup>
        {!cancelOnly && (
          <LoadingButton
            appearance="primary"
            onClick={handleCreate}
            isLoading={creatingIssue}
          >
            <FormattedMessage {...IntlCommonMessages[CommonMessage.Create]} />
          </LoadingButton>
        )}
        <Button onClick={handleCancel}>
          <FormattedMessage {...IntlCommonMessages[CommonMessage.Cancel]} />
        </Button>
      </ButtonGroup>
    </IssueCreateFooter>
  );
};

const IssueCreateFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 20px;
`;

const CheckboxWrapper = styled.div`
  margin-right: 15px;
`;
