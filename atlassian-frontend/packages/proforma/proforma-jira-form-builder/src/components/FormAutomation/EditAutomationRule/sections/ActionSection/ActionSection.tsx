import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { ErrorMessage } from '@atlaskit/form';
import Select from '@atlaskit/select';
import Textfield from '@atlaskit/textfield';
import {
  ReferenceDataStatusItem,
  SelectChoice,
} from '@atlassian/proforma-common-core/jira-common-models';

import {
  RuleActionType,
  RuleActionTypeMessage,
} from '../../../../../model/AutomationRule';
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
  ActionSectionMessage,
  IntlActionSectionMessages,
} from './ActionSectionMessages.intl';

interface ActionSectionProps {
  isServiceProject: boolean;
  actionType: RuleActionType | null;
  availableStatuses: ReferenceDataStatusItem[];
  actionStatus?: ReferenceDataStatusItem['id'];
  addFormDoNotDuplicate: boolean;
  addFormVisibilityExternal?: boolean;
  validationErrors: ValidationError[];
}

export const ActionSection = injectIntl(
  ({
    isServiceProject,
    actionType,
    availableStatuses,
    actionStatus,
    addFormDoNotDuplicate,
    addFormVisibilityExternal,
    validationErrors,
    intl,
  }: ActionSectionProps & InjectedIntlProps) => {
    const allowDuplicatesSelectOptions: SelectChoice<boolean>[] = [
      {
        label: intl.formatMessage(
          IntlActionSectionMessages[
            ActionSectionMessage.SelectLabelAllowDuplicates
          ],
        ),
        value: false,
      },
      {
        label: intl.formatMessage(
          IntlActionSectionMessages[
            ActionSectionMessage.SelectLabelNoDuplicates
          ],
        ),
        value: true,
      },
    ];

    const allowDuplicatesSelectOptionValue:
      | SelectChoice<boolean>
      | undefined = allowDuplicatesSelectOptions.find(
      option => option.value === addFormDoNotDuplicate,
    );

    const setFormVisibilitySelectOptions: SelectChoice<boolean>[] = [
      {
        label: intl.formatMessage(
          IntlActionSectionMessages[ActionSectionMessage.SelectLabelInternal],
        ),
        value: false,
      },
      {
        label: intl.formatMessage(
          IntlActionSectionMessages[ActionSectionMessage.SelectLabelExternal],
        ),
        value: true,
      },
    ];

    const setFormVisibilitySelectOptionValue:
      | SelectChoice<boolean>
      | undefined = setFormVisibilitySelectOptions.find(
      option => option.value === (addFormVisibilityExternal || false),
    );

    const noActionStatusValidationError = validationErrors.find(
      valErr => valErr.errorType === ValidationErrorType.NoActionStatus,
    );

    return (
      <>
        <Textfield
          value={intl.formatMessage(
            actionType
              ? IntlEditAutomationRuleMessages[
                  EditAutomationRuleMessage[RuleActionTypeMessage[actionType]]
                ]
              : IntlEditAutomationRuleMessages[
                  EditAutomationRuleMessage.MissingWhenOption
                ],
          )}
          isDisabled
        />
        {actionType === RuleActionType.changeStatus && (
          <RuleDroplistWrapper>
            <StatusSelect
              availableStatuses={availableStatuses}
              currentStatusId={actionStatus}
              isError={!!noActionStatusValidationError}
            />
            {!!noActionStatusValidationError && (
              <ErrorMessage>
                <FormattedMessage
                  // @ts-ignore
                  {...IntlEditAutomationRuleMessages[
                    noActionStatusValidationError.errorMsg
                  ]}
                />
              </ErrorMessage>
            )}
          </RuleDroplistWrapper>
        )}
        {actionType === RuleActionType.addForm && (
          <>
            <RuleDroplistWrapper>
              <Select
                value={allowDuplicatesSelectOptionValue}
                options={allowDuplicatesSelectOptions}
                isDisabled
              />
            </RuleDroplistWrapper>
            {isServiceProject && (
              <RuleDroplistWrapper>
                <Select
                  value={setFormVisibilitySelectOptionValue}
                  options={setFormVisibilitySelectOptions}
                  isDisabled
                />
              </RuleDroplistWrapper>
            )}
          </>
        )}
      </>
    );
  },
);
