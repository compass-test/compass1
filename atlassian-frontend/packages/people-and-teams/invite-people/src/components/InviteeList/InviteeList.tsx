import React, { useCallback, useEffect } from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { ErrorMessage } from '@atlaskit/form';
import { CreatableSelect, ValueType } from '@atlaskit/select';
import UserPicker, {
  OptionData,
  Value,
  isEmail,
  isUser,
  isValidEmail,
} from '@atlaskit/user-picker';
import { R50, R500 } from '@atlaskit/theme/colors';

import { messages } from '../i18n';
import { InviteeListWrapper, Label, Warning } from '../InvitePeople/styled';
import ThirdPartyConnectedTo from '../ThirdParty/ThirdPartyConnectedTo';
import { extractDomainFromEmail } from '../../utils';
import {
  triggerAnalyticsForInviteeListFocused,
  triggerAnalyticsForInviteeListItemAdded,
  CREATEABLE_SELECT_ID,
  USER_PICKER_ID,
  InviteeListId,
} from '../analytics';
import { useThirdPartyState } from '../ThirdParty/context';

export interface OwnProps {
  restrictedDomains?: string[];
  maxEmails?: number;
  onInviteeListChange?: (emails: string[], validEmails: string[]) => void;
  onManagePage?: () => void;
  showEmptyError?: boolean;
  onFocusEvent?: () => void;
}

export type SelectOption = {
  label: string;
  value: string;
};

export type InvitedUser = {
  email: string;
};

type ValidationState = {
  validationState: 'default' | 'error' | 'success';
  reason?: 'invalid-email' | 'overflow';
  errorMessage?: FormattedMessage.MessageDescriptor;
};

const VALIDATION_OVERFLOW_ERROR: ValidationState = {
  validationState: 'error',
  reason: 'overflow',
  errorMessage: messages.tooManyEmailAddresses,
};
const VALIDATION_INVALID_EMAIL: ValidationState = {
  validationState: 'error',
  reason: 'invalid-email',
  errorMessage: messages.invalidMultipleEmailMessage,
};
const VALIDATION_DEFAULT: ValidationState = { validationState: 'default' };

const determineValidationState = (
  options: SelectOption[],
  maxEmails: number,
): ValidationState => {
  const isOverflowing = options.length > maxEmails;
  const hasInvalidEmail = options.some(
    (v) => isValidEmail(v.label) === 'INVALID',
  );

  if (isOverflowing) {
    return VALIDATION_OVERFLOW_ERROR;
  }

  if (hasInvalidEmail) {
    return VALIDATION_INVALID_EMAIL;
  }

  return VALIDATION_DEFAULT;
};

const InviteeList: React.FC<OwnProps & InjectedIntlProps> = ({
  maxEmails = 10,
  onInviteeListChange = () => {},
  onFocusEvent,
  showEmptyError = false,
  intl,
  onManagePage,
}) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const [options, setOptions] = React.useState<SelectOption[]>([]);
  const [validationState, setValidationState] = React.useState<ValidationState>(
    VALIDATION_DEFAULT,
  );

  const firstRender = React.useRef(true);
  const validatorTimeout = React.useRef<any>(null);
  const [isEmptyInput, setEmptyInput] = React.useState(false);
  const [trailingText, setTrailingText] = React.useState('');

  const {
    isOk: enableThirdPartyInvites,
    integrations: thirdPartyIntegrations,
    queryThirdParty,
    loggedInEmailDomain,
  } = useThirdPartyState();

  const removeValue = React.useCallback(
    (removedValue: SelectOption) => {
      if (!removedValue) {
        return;
      }

      const { label } = removedValue;

      const newOptions = options.filter((val) => val.label !== label);

      setOptions(newOptions);
    },
    [options],
  );

  const onEmailChange = useCallback(
    (newValue: ValueType<SelectOption, true>, actionMeta: any) => {
      switch (actionMeta.action) {
        case 'remove-value':
        case 'pop-value':
          return removeValue(actionMeta.removedValue);
        case 'clear':
          return setOptions([]);
        default:
          const newOptions = [...options, newValue] as SelectOption[];
          const [, newEmail] = newOptions;
          triggerAnalyticsForInviteeListItemAdded(
            { domains: [extractDomainFromEmail(newEmail?.value) || ''] },
            CREATEABLE_SELECT_ID,
            createAnalyticsEvent,
          );
          return setOptions(newOptions);
      }
    },
    [options, removeValue, createAnalyticsEvent],
  );

  const onFocusEventWithAnalytics = useCallback(
    (pickerId: InviteeListId) => () => {
      triggerAnalyticsForInviteeListFocused(pickerId, createAnalyticsEvent);
      onFocusEvent && onFocusEvent();
    },
    [onFocusEvent, createAnalyticsEvent],
  );

  const onEmailCreate = useCallback(
    (inputValue: string) => {
      let newOpts: SelectOption[] = [];
      for (const value of inputValue.trim().split(/\s*[,; ]\s*/)) {
        const isEmpty = !value.length;
        const isDuplicate =
          options.some((val) => val.label === value) ||
          newOpts.some((val) => val.label === value);

        if (isDuplicate || isEmpty) {
          continue;
        }
        const newValue = { label: value, value };

        newOpts.push(newValue);
      }
      triggerAnalyticsForInviteeListItemAdded(
        {
          domains: newOpts
            .map((opt) => extractDomainFromEmail(opt.value))
            .filter((v: string | null): v is string => v !== null),
        },
        CREATEABLE_SELECT_ID,
        createAnalyticsEvent,
      );

      setOptions([...options, ...newOpts]);
    },
    [options, createAnalyticsEvent],
  );

  const onEmailBlur = useCallback(
    (inputValue: any) => {
      const value = inputValue.target.value;
      onEmailCreate(value);
    },
    [onEmailCreate],
  );

  const getNewEmail = (prevEmails: string[], emails: string[]): string => {
    const newEmails = emails.filter(
      (email: string) => !prevEmails.includes(email),
    );
    return newEmails.shift() || '';
  };

  const onUserSelectionChange = useCallback(
    (value: Value) => {
      let values: OptionData[] = [];
      if (Array.isArray(value)) {
        values = value;
      } else if (value && value != null) {
        values = [value];
      }

      const emails = values
        .map((v) => {
          if (isUser(v)) {
            return v.email;
          }

          if (isEmail(v)) {
            return v.name;
          }
        })
        .filter((v) => v) as string[];

      setOptions((prevEmails) => {
        // Only fire analytics event if an email is added
        prevEmails.length < emails.length &&
          triggerAnalyticsForInviteeListItemAdded(
            {
              domains: [
                extractDomainFromEmail(
                  getNewEmail(
                    prevEmails.map((v) => v.value),
                    emails,
                  ),
                ) || '',
              ],
            },
            USER_PICKER_ID,
            createAnalyticsEvent,
          );
        return emails.map((e) => ({ label: e, value: e }));
      });
    },
    [createAnalyticsEvent],
  );

  // Validator
  useEffect(() => {
    if (validatorTimeout.current) {
      clearTimeout(validatorTimeout.current);
    }
    const lastAddr = trailingText.trim();
    if (options.length === 0 && lastAddr.length === 0) {
      onInviteeListChange([], []);
      return;
    }
    const validationState = determineValidationState(
      options,
      // Reduce options max length by 1 if there's a lastAddr.
      maxEmails - (lastAddr.length === 0 ? 0 : 1),
    );
    setValidationState(validationState);

    if (
      validationState.validationState !== 'error' &&
      lastAddr.length &&
      isValidEmail(lastAddr) !== 'VALID'
    ) {
      // If only the lastAddr is not valid, wait a bit for user input
      // before flagging it as invalid. Any user input will rerun the
      // validator effect, which clears the timeout callback.
      validatorTimeout.current = setTimeout(() => {
        validatorTimeout.current = null;
        setValidationState(VALIDATION_INVALID_EMAIL);
      }, 500);
    }

    // Finally, send back all entered email addresses to the parent component
    if (lastAddr.length > 0) {
      onInviteeListChange(
        [...options.map((o) => o.label), lastAddr],
        options
          .map((o) => o.label)
          .concat(lastAddr)
          .filter((email) => isValidEmail(email) === 'VALID'),
      );
    } else {
      onInviteeListChange(
        options.map((o) => o.label),
        options
          .map((o) => o.label)
          .filter((email) => isValidEmail(email) === 'VALID'),
      );
    }
  }, [options, trailingText, maxEmails, onInviteeListChange]);

  // This effect is used to make the "Enter up to 10 email addresses" an error if
  // the field is empty; EXCEPT on the very first component load.
  React.useEffect(() => {
    if (!firstRender.current || showEmptyError) {
      const emptyInput = options.length === 0 && trailingText.length === 0;
      setEmptyInput(emptyInput);
    }
  }, [showEmptyError, firstRender, options, trailingText]);

  // When a separator is entered, consume that email address.
  const handleKeyPress = React.useCallback(
    (event: any) => {
      if (!trailingText) {
        return;
      }
      switch (event.key) {
        case 'Enter':
        case 'Tab':
        case ',':
        case ' ':
        case ';':
          onEmailCreate(trailingText);
          setTrailingText('');
          event.preventDefault();
      }
    },
    [trailingText, onEmailCreate],
  );

  // Set firstRender to false as the very last effect, this is used to suppress a validation
  // error on first load with an empty InviteeList field.
  React.useEffect(() => {
    firstRender.current = false;
  }, []);

  const pickerThirdPartyPlaceholder = intl.formatMessage(
    messages.inviteeListUserPickerPlaceholder,
  );
  const pickerPlaceholder = intl.formatMessage(
    messages.inviteeListUserPickerEmailPlaceholder,
  );

  return (
    <InviteeListWrapper data-testid="testId-invite-people-invitee-list">
      <Label
        htmlFor={
          enableThirdPartyInvites ? 'invite-user-picker' : 'email-select'
        }
      >
        {intl.formatMessage(
          enableThirdPartyInvites
            ? thirdPartyIntegrations.length > 0
              ? messages.inviteeListLabelThirdParty
              : messages.inviteeListLabelThirdPartyNoIntegrations
            : messages.inviteeListLabel,
        )}
      </Label>
      {!enableThirdPartyInvites && (
        <CreatableSelect<SelectOption, true>
          onChange={onEmailChange}
          onCreateOption={onEmailCreate}
          onInputChange={(val) => setTrailingText(val)}
          onFocus={onFocusEventWithAnalytics(CREATEABLE_SELECT_ID)}
          onKeyDown={handleKeyPress}
          inputValue={trailingText}
          className="invitee-select"
          classNamePrefix="inviteeselect"
          onBlur={onEmailBlur}
          options={options}
          value={options}
          styles={{
            menu: (base) => ({ ...base, display: 'none' }),
            dropdownIndicator: (base) => ({ ...base, display: 'none' }),
            multiValue: (base, { data }) => {
              const isValid = isValidEmail(data.label) === 'VALID';
              return {
                ...base,
                backgroundColor: isValid ? base.backgroundColor : R50,
              };
            },
            multiValueLabel: (base, { data }) => {
              const isValid = isValidEmail(data.label) === 'VALID';
              return {
                ...base,
                color: isValid ? base.color : R500,
                backgroundColor: isValid ? base.backgroundColor : R50,
              };
            },
            multiValueRemove: (base, { data }) => {
              const isValid = isValidEmail(data.label) === 'VALID';
              return {
                ...base,
                backgroundColor: isValid ? base.backgroundColor : R50,
              };
            },
          }}
          validationState={validationState.validationState}
          isMulti
          isClearable
          backspaceRemovesValue
        />
      )}
      {enableThirdPartyInvites && (
        <>
          <UserPicker
            fieldId={'invite-user-picker'}
            inputId={'invite-user-picker'}
            onChange={onUserSelectionChange}
            loadOptions={queryThirdParty}
            onFocus={onFocusEventWithAnalytics(USER_PICKER_ID)}
            noOptionsMessage={() => null}
            placeholder={
              thirdPartyIntegrations.length > 0
                ? pickerThirdPartyPlaceholder
                : pickerPlaceholder
            }
            width={'100%'}
            isClearable
            isMulti
            allowEmail
            suggestEmailsForDomain={loggedInEmailDomain}
          />
          {enableThirdPartyInvites &&
            (validationState.validationState === 'error' &&
            validationState.errorMessage ? (
              <ErrorMessage>
                <FormattedMessage {...validationState.errorMessage} />
              </ErrorMessage>
            ) : isEmptyInput ? (
              <ErrorMessage>
                <FormattedMessage {...messages.inviteeListPickerNote} />
              </ErrorMessage>
            ) : undefined)}
          {thirdPartyIntegrations.length > 0 && (
            <ThirdPartyConnectedTo onManagePage={onManagePage} />
          )}
        </>
      )}
      {!enableThirdPartyInvites &&
        (validationState.validationState === 'error' &&
        validationState.errorMessage ? (
          <ErrorMessage>
            <FormattedMessage {...validationState.errorMessage} />
          </ErrorMessage>
        ) : isEmptyInput ? (
          <ErrorMessage>
            <FormattedMessage {...messages.inviteeListNote} />
          </ErrorMessage>
        ) : (
          <Warning>
            <FormattedMessage {...messages.inviteeListNote} />
          </Warning>
        ))}
    </InviteeListWrapper>
  );
};

export default injectIntl(InviteeList);
