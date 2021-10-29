import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

// eslint-disable-next-line no-restricted-imports
import { Label } from '@atlaskit/field-base';
import Pagination from '@atlaskit/pagination';
import Spinner from '@atlaskit/spinner';
import Textfield from '@atlaskit/textfield';
import {
  CommonMessage,
  IntlCommonMessages,
  Loader,
} from '@atlassian/proforma-common-core/jira-common';
import { FormReference } from '@atlassian/proforma-common-core/jira-common-models';

import {
  IntlIssueCreateMessages,
  IssueCreateMessage,
} from '../IssueCreateMessages.intl';

import { FormCard } from './FormCard';

interface AvailableFormsProps {
  isLoading: boolean;
  loadingMsg: ReactIntl.FormattedMessage.MessageDescriptor;
  availableForms: FormReference[];
  pageNumbers: number[];
  maxPages: number;
  handleChangePage: (pageNumber: number) => void;
  handleSearch: (text: string) => void;
  handleFormClick: (
    projectFormId: number,
    issueTypeId: string,
    requestTypeId?: string,
  ) => void;
  currentPage: number;
}

export const AvailableForms = injectIntl(
  ({
    isLoading,
    loadingMsg,
    availableForms,
    pageNumbers,
    maxPages,
    handleChangePage,
    handleSearch,
    handleFormClick,
    currentPage,
    intl,
  }: AvailableFormsProps & InjectedIntlProps) => {
    return (
      <div>
        <Label
          label={intl.formatMessage(IntlCommonMessages[CommonMessage.Search])}
        />
        <Textfield
          testId="issue-create-search-bar"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
          elemAfterInput={
            isLoading ? (
              <Spinner testId="issue-create-search-bar-loader" />
            ) : null
          }
        />
        <br />
        {isLoading ? (
          <Loader message={loadingMsg} />
        ) : !availableForms.length ? (
          <NoFormsMessage>
            <FormattedMessage
              {...IntlIssueCreateMessages[
                IssueCreateMessage.IssueCreateNoAvailableForms
              ]}
            />
          </NoFormsMessage>
        ) : (
          <>
            {availableForms.map((formRef, index) => {
              return (
                <FormCard
                  key={index}
                  formName={formRef.formName}
                  issueType={formRef.issueType}
                  avatarUrl={formRef.avatarUrl}
                  onClick={() =>
                    handleFormClick(
                      formRef.projectFormId,
                      formRef.issueTypeId,
                      formRef.requestTypeId,
                    )
                  }
                />
              );
            })}
            <br />
            <PaginationWrapper data-testid="issue-create-available-forms-pagination">
              <Pagination
                pages={pageNumbers}
                max={maxPages}
                onChange={(_, newPage) => handleChangePage(newPage)}
                selectedIndex={currentPage}
              />
            </PaginationWrapper>
          </>
        )}
      </div>
    );
  },
);

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const NoFormsMessage = styled.h4`
  text-align: center;
  padding: 20px;
`;
