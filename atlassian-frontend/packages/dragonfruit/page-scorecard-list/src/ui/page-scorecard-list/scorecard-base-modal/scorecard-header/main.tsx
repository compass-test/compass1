import React, { useState } from 'react';

import { ErrorMessage as BaseErrorMessage, Field } from '@atlaskit/form';
import { ValueType } from '@atlaskit/select';
import TextArea from '@atlaskit/textarea';
import Textfield from '@atlaskit/textfield';
import { User as UserPickerUser } from '@atlaskit/user-picker';
import { CompassScorecardImportance } from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import ComponentTypeSelect, {
  GetComponentTypeOptionFromValue,
} from '../../../../common/ui/component-type-select';
import { OptionWithIcon } from '../../../../common/ui/icon-select/types';
import ImportanceSelect, {
  GetImportanceOptionFromValue,
} from '../../../../common/ui/importance-select';
import { OwnerPicker } from '../../../../common/ui/owner-picker';
import { useErrors } from '../../../../services/errors';
import { useValidations } from '../../../../services/validations';

import messages from './messages';
import {
  DescriptionWrapper,
  ErrorWrapper,
  NameWrapper,
  SettingsWrapper,
} from './styled';

interface Props {
  description: string | null | undefined;
  name: string | null | undefined;
  componentType?: string | null | undefined;
  importance?: string | null | undefined;
  owner?: any;
  styling?: 'dropdown' | undefined;
  testId: string;
}

interface ErrorMessageProps {
  testId: string;
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ testId, message }) => (
  <ErrorWrapper>
    <BaseErrorMessage testId={`${testId}-error`}>{message}</BaseErrorMessage>
  </ErrorWrapper>
);

const ScorecardHeader = (props: Props) => {
  const {
    name,
    description,
    owner,
    importance,
    componentType,
    styling,
    testId,
  } = props;

  const [descriptionValue, setDescriptionValue] = useState(description || '');

  const intl = useIntl();
  const { formatMessage } = intl;

  const { cloudId, isAdmin } = useTenantInfo();
  const [currentComponentType, setCurrentComponentType] = useState(
    componentType,
  );

  // Importance is set to the enum keys instead of option label, for example: USER_DEFINED.
  const [currentImportance, setCurrentImportance] = useState(importance);

  const calculatedComponentTypeOption = GetComponentTypeOptionFromValue(
    currentComponentType,
  );

  const calculatedImportanceOption = GetImportanceOptionFromValue(
    currentImportance,
  );

  const {
    handleIsInvalid,
    handleValidationState,
    formatScorecardNameError,
    formatScorecardDescriptionError,
    formatScorecardSelectError,
    formatScorecardOwnerPickerError,
  } = useErrors();

  const {
    nameValidator,
    descriptionValidator,
    componentTypeValidator,
    importanceValidator,
  } = useValidations();

  return (
    <>
      <NameWrapper>
        <Field
          label={formatMessage(messages.nameFieldLabel)}
          isRequired
          name="name"
          defaultValue={name || undefined}
          validate={nameValidator}
        >
          {({ fieldProps, error }) => {
            const fieldTestId = testId && `${testId}-name-field`;

            return (
              <>
                <Textfield
                  {...fieldProps}
                  testId={fieldTestId}
                  placeholder={formatMessage(messages.nameDefault)}
                  isInvalid={handleIsInvalid(error)}
                />
                {error && (
                  <ErrorMessage
                    testId={fieldTestId}
                    message={formatScorecardNameError(error)}
                  />
                )}
              </>
            );
          }}
        </Field>
      </NameWrapper>
      <DescriptionWrapper>
        <Field
          label={formatMessage(messages.descriptionFieldLabel)}
          name="description"
          isRequired
          defaultValue={descriptionValue}
          validate={descriptionValidator}
        >
          {({ fieldProps, error }) => {
            const fieldTestId = testId && `${testId}-description-field`;

            /**
             * The height of the description editor is set to 4 rows. Since the
             * maximum length of scorecard description is 330chars which takes 6
             * rows, we're setting the maxHeight to 16vh so that if user types in
             * more than 4 rows, the editor will grow vertically up to 6 rows,
             * after that the editor height is fixed, there will be a scrollbar
             * if user keeps typing.
             */
            return (
              <>
                <TextArea
                  {...fieldProps}
                  name="Description"
                  testId={fieldTestId}
                  onChange={(event) => setDescriptionValue(event.target.value)}
                  value={descriptionValue}
                  minimumRows={4}
                  maxHeight="16vh"
                  placeholder={formatMessage(messages.descriptionDefault)}
                  isInvalid={handleIsInvalid(error)}
                />
                {error && (
                  <ErrorMessage
                    testId={fieldTestId}
                    message={formatScorecardDescriptionError(error)}
                  />
                )}
              </>
            );
          }}
        </Field>
      </DescriptionWrapper>
      <SettingsWrapper>
        <Field<ValueType<UserPickerUser>>
          label={formatMessage(messages.ownerFieldLabel)}
          name="owner"
          defaultValue={
            owner ? { id: owner.accountId, name: owner.name } : owner
          }
        >
          {({ fieldProps, error }) => {
            const fieldTestId = testId && `${testId}-owner-picker`;
            const { onChange } = fieldProps;

            const handleOnChange = (option: ValueType<UserPickerUser>) => {
              onChange(option);
            };

            return (
              <>
                <OwnerPicker
                  {...fieldProps}
                  value={owner}
                  cloudId={cloudId}
                  onChange={handleOnChange}
                />
                {error && (
                  <ErrorMessage
                    testId={fieldTestId}
                    message={formatScorecardOwnerPickerError(error)}
                  />
                )}
              </>
            );
          }}
        </Field>

        <Field<ValueType<OptionWithIcon>>
          label={formatMessage(messages.componentTypeFieldLabel)}
          name="componentTypeSelection"
          isRequired
          //@ts-ignore
          defaultValue={calculatedComponentTypeOption?.value}
          validate={componentTypeValidator}
        >
          {({ fieldProps, error }) => {
            const fieldTestId = testId && `${testId}-component-type-select`;
            const { onChange } = fieldProps;

            const handleOnChange = (option: ValueType<OptionWithIcon>) => {
              setCurrentComponentType(option?.value as string);
              onChange(option);
            };

            return (
              <>
                <ComponentTypeSelect
                  {...fieldProps}
                  styling={styling}
                  onChange={handleOnChange}
                  value={calculatedComponentTypeOption}
                  validationState={handleValidationState(error)}
                />
                {error && (
                  <ErrorMessage
                    testId={fieldTestId}
                    message={formatScorecardSelectError(error)}
                  />
                )}
              </>
            );
          }}
        </Field>

        <Field<ValueType<OptionWithIcon>>
          label={formatMessage(messages.importanceFieldLabel)}
          name="importanceSelection"
          isRequired
          // @ts-ignore
          defaultValue={calculatedImportanceOption?.value}
          validate={importanceValidator}
        >
          {({ fieldProps, error }) => {
            const fieldTestId = testId && `${testId}-importance-select`;
            const { onChange } = fieldProps;

            const handleOnChange = (option: ValueType<OptionWithIcon>) => {
              const result = Object.keys(CompassScorecardImportance).find(
                (key) =>
                  CompassScorecardImportance[
                    key as keyof typeof CompassScorecardImportance
                  ] === option?.value,
              );
              setCurrentImportance(result);

              onChange(option);
            };

            return (
              <>
                <ImportanceSelect
                  {...fieldProps}
                  styling={styling}
                  onChange={handleOnChange}
                  value={calculatedImportanceOption}
                  isAdmin={isAdmin()}
                  validationState={handleValidationState(error)}
                />
                {error && (
                  <ErrorMessage
                    testId={fieldTestId}
                    message={formatScorecardSelectError(error)}
                  />
                )}
              </>
            );
          }}
        </Field>
      </SettingsWrapper>
    </>
  );
};

export default ScorecardHeader;
