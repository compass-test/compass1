import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { ErrorMessage } from '@atlaskit/form';
import Select from '@atlaskit/select';
import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';
import { ReferenceData } from '@atlassian/proforma-common-core/jira-common-models';

import {
  EditAutomationRuleMessage,
  IntlEditAutomationRuleMessages,
} from '../../EditAutomationRuleMessages.intl';
import {
  ValidationError,
  ValidationErrorType,
} from '../../helpers/validationHelper';
import { StatusSelect } from '../../StatusSelect';
import { RuleDroplistWrapper } from '../../styled';

import {
  IntlTriggerSectionMessages,
  TriggerSectionMessage,
} from './TriggerSectionMessages.intl';

export enum TriggerType {
  submit = 'submit',
  transition = 'transition',
  workflowValidator = 'workflowValidator',
}

export enum TriggerMessageLabels {
  submit = EditAutomationRuleMessage.TriggerLabelSubmit,
  transition = EditAutomationRuleMessage.TriggerLabelTransition,
  workflowValidator = EditAutomationRuleMessage.TriggerLabelWorkflow,
}

interface TriggerSectionProps {
  triggerType: TriggerType;
  status?: string;
  availableStatuses: ReferenceData['statuses'];
  validationErrors: ValidationError[];
}

export const TriggerSection = injectIntl(
  ({
    triggerType,
    status,
    availableStatuses,
    validationErrors,
    intl,
  }: TriggerSectionProps & InjectedIntlProps) => {
    const triggerOptions = Object.keys(TriggerType).map(type => ({
      label: intl.formatMessage(
        // @ts-ignore
        IntlEditAutomationRuleMessages[
          // @ts-ignore
          EditAutomationRuleMessage[TriggerMessageLabels[type]]
        ],
      ),
      // @ts-ignore
      value: TriggerType[type],
    }));
    const selectedTriggerOption = triggerOptions.find(
      option => option.value === triggerType,
    );

    const noTriggerStatusValidationError = validationErrors.find(
      valErr => valErr.errorType === ValidationErrorType.NoTriggerStatus,
    );

    const noTriggerValidationError = validationErrors.find(
      valErr => valErr.errorType === ValidationErrorType.NoTrigger,
    );

    const placeholder = intl.formatMessage(
      IntlEditAutomationRuleMessages[
        EditAutomationRuleMessage.RuleTriggerSelectPlaceholder
      ],
    );

    return (
      <>
        <Select<SelectOption>
          placeholder={placeholder}
          value={selectedTriggerOption}
          options={triggerOptions}
          isDisabled
          validationState={noTriggerValidationError ? 'error' : 'default'}
        />
        {!!noTriggerValidationError && (
          <ErrorMessage>
            <FormattedMessage
              // @ts-ignore
              {...IntlEditAutomationRuleMessages[
                noTriggerValidationError.errorMsg
              ]}
            />
          </ErrorMessage>
        )}
        {triggerType === TriggerType.transition && (
          <RuleDroplistWrapper>
            <StatusSelect
              availableStatuses={availableStatuses}
              currentStatusId={status}
              isError={!!noTriggerStatusValidationError}
            />
            {!!noTriggerStatusValidationError && (
              <ErrorMessage>
                <FormattedMessage
                  // @ts-ignore
                  {...IntlEditAutomationRuleMessages[
                    noTriggerStatusValidationError.errorMsg
                  ]}
                />
              </ErrorMessage>
            )}
          </RuleDroplistWrapper>
        )}
        {triggerType === TriggerType.workflowValidator && (
          <>
            <p>
              <FormattedMessage
                {...IntlTriggerSectionMessages[
                  TriggerSectionMessage.WorkflowValidatorDesc
                ]}
              />
            </p>
            <p>
              <FormattedMessage
                {...IntlTriggerSectionMessages[
                  TriggerSectionMessage.WorkflowValidatorTypesDesc
                ]}
              />
            </p>
            <ul>
              <li>
                <FormattedMessage
                  {...IntlTriggerSectionMessages[
                    TriggerSectionMessage.WorkflowValidatorType1
                  ]}
                />
              </li>
              <li>
                <FormattedMessage
                  {...IntlTriggerSectionMessages[
                    TriggerSectionMessage.WorkflowValidatorType2
                  ]}
                />
              </li>
              <li>
                <FormattedMessage
                  {...IntlTriggerSectionMessages[
                    TriggerSectionMessage.WorkflowValidatorType3
                  ]}
                />
              </li>
            </ul>
            <p>
              <FormattedMessage
                {...IntlTriggerSectionMessages[
                  TriggerSectionMessage.WorkflowValidatorType3Details
                ]}
              />
            </p>
          </>
        )}
      </>
    );
  },
);
