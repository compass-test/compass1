import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import Textfield from '@atlaskit/textfield';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';
import {
  LocalRuleCondition,
  LocalRuleConditionType,
  ReferenceDataStatusItem,
} from '@atlassian/proforma-common-core/jira-common-models';

import {
  EditAutomationRuleMessage,
  IntlEditAutomationRuleMessages,
} from '../../EditAutomationRuleMessages.intl';
import {
  ValidationError,
  ValidationErrorType,
} from '../../helpers/validationHelper';

import { ConditionItem } from './ConditionItem';

interface ConditionSectionProps {
  conditions: LocalRuleCondition[];
  availableConditions: LocalRuleConditionType[];
  availableStatuses: ReferenceDataStatusItem[];
  validationErrors: ValidationError[];
}

export const ConditionSection = injectIntl(
  ({
    conditions,
    availableConditions,
    availableStatuses,
    validationErrors,
    intl,
  }: ConditionSectionProps & InjectedIntlProps) => {
    return (
      <>
        {!conditions.length && !availableConditions.length && (
          <Textfield
            value={intl.formatMessage(
              IntlEditAutomationRuleMessages[
                EditAutomationRuleMessage.MissingWhenOption
              ],
            )}
            isDisabled
          />
        )}
        {conditions.map((condition, index) => {
          const noConditionStatusError = validationErrors.find(
            valErr =>
              valErr.errorType === ValidationErrorType.NoConditionStatus,
          );
          const hasValidationError =
            noConditionStatusError && !condition.statusId;
          return (
            <>
              {index !== 0 && (
                <h3>
                  <FormattedMessage
                    {...IntlCommonMessages[CommonMessage.And]}
                  />
                </h3>
              )}
              <ConditionItem
                condition={condition}
                availableConditions={availableConditions}
                availableStatuses={availableStatuses}
                conditionStatusId={condition.statusId}
                validationError={
                  hasValidationError ? noConditionStatusError : undefined
                }
              />
            </>
          );
        })}
      </>
    );
  },
);
