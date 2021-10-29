import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import { ErrorMessage } from '@atlaskit/form';
import Select from '@atlaskit/select';
import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';
import {
  LocalRuleCondition,
  LocalRuleConditionType,
  ReferenceDataStatusItem,
} from '@atlassian/proforma-common-core/jira-common-models';

import {
  EditAutomationRuleMessage,
  IntlEditAutomationRuleMessages,
} from '../../EditAutomationRuleMessages.intl';
import { ValidationError } from '../../helpers/validationHelper';
import { StatusSelect } from '../../StatusSelect';
import { RuleDroplistWrapper } from '../../styled';

enum RuleConditionLabels {
  allFormsSubmitted = EditAutomationRuleMessage.ConditionLabelAllFormsSubmitted,
  matchingIssueStatus = EditAutomationRuleMessage.ConditionLabelMatchingIssueStatus,
  previousIssueStatus = EditAutomationRuleMessage.ConditionLabelPreviousIssueStatus,
  isNotSubmitted = EditAutomationRuleMessage.ConditionLabelIsNotSubmitted,
  toStatus = EditAutomationRuleMessage.ConditionLabelToStatus,
  fromStatus = EditAutomationRuleMessage.ConditionLabelFromStatus,
}

interface ConditionItemProps {
  condition: LocalRuleCondition;
  availableConditions: LocalRuleConditionType[];
  availableStatuses: ReferenceDataStatusItem[];
  conditionStatusId?: ReferenceDataStatusItem['id'] | null;
  validationError?: ValidationError;
}

export const ConditionItem = injectIntl(
  ({
    condition,
    availableConditions,
    availableStatuses,
    conditionStatusId,
    validationError,
    intl,
  }: ConditionItemProps & InjectedIntlProps) => {
    const availableOptions: SelectOption[] = availableConditions.map(c => {
      return {
        label: intl.formatMessage(
          // @ts-ignore
          IntlEditAutomationRuleMessages[
            // @ts-ignore
            EditAutomationRuleMessage[RuleConditionLabels[c]]
          ],
        ),
        value: c,
      };
    });

    const selectedOption: SelectOption | undefined = condition.type
      ? {
          label: intl.formatMessage(
            // @ts-ignore
            IntlEditAutomationRuleMessages[
              // @ts-ignore
              EditAutomationRuleMessage[RuleConditionLabels[condition.type]]
            ],
          ),
          value: condition.type,
        }
      : undefined;

    const conditionNeedsStatus = (): boolean => {
      switch (condition.type) {
        case LocalRuleConditionType.fromStatus:
        case LocalRuleConditionType.toStatus:
        case LocalRuleConditionType.matchingIssueStatus:
        case LocalRuleConditionType.previousIssueStatus:
          return true;
        default:
          return false;
      }
    };

    return (
      <ConditionItemWrapper>
        <ConditionSelect>
          <Select<SelectOption>
            value={selectedOption}
            options={availableOptions}
            isDisabled
          />
          {conditionNeedsStatus() && (
            <RuleDroplistWrapper>
              <StatusSelect
                availableStatuses={availableStatuses}
                currentStatusId={conditionStatusId}
                isError={!!validationError}
              />
              {!!validationError && (
                <ErrorMessage>
                  <FormattedMessage
                    // @ts-ignore
                    {...IntlEditAutomationRuleMessages[
                      validationError.errorMsg
                    ]}
                  />
                </ErrorMessage>
              )}
            </RuleDroplistWrapper>
          )}
        </ConditionSelect>
      </ConditionItemWrapper>
    );
  },
);

export const ConditionItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

export const ConditionSelect = styled.div`
  width: 100%;
  margin-right: 14px;
`;
