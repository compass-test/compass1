import React, { useCallback, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Button, { ButtonGroup, LoadingButton } from '@atlaskit/button';
import { useFlags } from '@atlaskit/flag';
import Form, { ErrorMessage as BaseErrorMessage, Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';
import {
  NAME_MAX_LENGTH,
  useComponentValidations,
  useRecentComponents,
} from '@atlassian/dragonfruit-component-create-modal';
import {
  checkCompassMutationSuccess,
  CompassComponent,
  CompassComponentType,
  useCreateComponent,
} from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import ComponentTypeSelect, {
  GetComponentTypeOptionFromValue,
  OptionWithIcon,
} from './component-type-select';
import messages from './messages';
import {
  ButtonWrapper,
  ComponentNameFieldWrapper,
  ComponentTypeFieldWrapper,
  ErrorMessageWrapper,
  FormWrapper,
} from './styled';

type Props = {
  onCancel: () => void;
  onSuccess: () => void;
  teamId: CompassComponent['id'];
  formKey: number;
};

type FormData = Pick<CompassComponent, 'name'> & OptionWithIcon;

interface ErrorMessageProps {
  testId: string;
  message: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ testId, message }) => (
  <ErrorMessageWrapper>
    <BaseErrorMessage testId={`${testId}-error`}>{message}</BaseErrorMessage>
  </ErrorMessageWrapper>
);

export const CreateComponentForm = (props: Props) => {
  const { formatMessage } = useIntl();
  const { onCancel, onSuccess, teamId, formKey } = props;
  const { cloudId } = useTenantInfo();
  const { showFlag } = useFlags();
  const { validateName } = useComponentValidations();

  const [isNameValid, setNameValid] = useState(false);

  const nameValidator = useCallback(
    (name: string | undefined): string | undefined => {
      if (validateName(name)) {
        setNameValid(true);
      } else {
        setNameValid(false);
        return formatMessage(messages.errorComponentNameBlank);
      }
    },
    [validateName, setNameValid, formatMessage],
  );

  const [createComponent] = useCreateComponent();
  const [, { addComponent }] = useRecentComponents();

  const showCreateComponentErrorFlag = useCallback(
    (description: FormattedMessage.MessageDescriptor) => {
      showFlag({
        ...BaseErrorFlagProps,
        title: formatMessage(messages.createComponentErrorFlagTitle),
        description: formatMessage(description),
        testId:
          'dragonfruit.teams.team-create-component.create-component-form.error-flag',
      });
    },
    [formatMessage, showFlag],
  );

  const handleSubmit = useCallback(
    (data: FormData) => {
      // Callback to react when modal starts submitting
      const mutationData = {
        name: data.name,
        // Default type value should be Service
        type: data.type?.value ?? CompassComponentType.SERVICE,
        ownerId: teamId,
      };

      return createComponent(cloudId, mutationData)
        .then((res) => {
          const payload = res?.data?.compass?.createComponent;
          checkCompassMutationSuccess(payload);
          // add to local component list if successful
          if (res?.data?.compass?.createComponent?.componentDetails?.id) {
            addComponent({
              id: res?.data?.compass?.createComponent?.componentDetails?.id,
              type: mutationData.type,
              name: mutationData.name,
            });
          }
          onSuccess();
        })
        .catch(() => {
          showCreateComponentErrorFlag(
            messages.createComponentErrorFlagContent,
          );
        });
    },
    [
      cloudId,
      createComponent,
      onSuccess,
      showCreateComponentErrorFlag,
      teamId,
      addComponent,
    ],
  );

  return (
    <Form<FormData> onSubmit={handleSubmit} key={formKey}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormWrapper>
            <ComponentTypeFieldWrapper>
              <Field<CompassComponentType>
                name="type"
                label={formatMessage(CommonMessages.type)}
                isRequired
                isDisabled={submitting}
              >
                {({ fieldProps, error }) => (
                  <>
                    <ComponentTypeSelect
                      {...fieldProps}
                      defaultValue={GetComponentTypeOptionFromValue(
                        CompassComponentType.SERVICE,
                      )}
                    />
                    {error && (
                      <ErrorMessage
                        testId="dragonfruit.teams.team-create-component.component-type-field"
                        message={error}
                      />
                    )}
                  </>
                )}
              </Field>
            </ComponentTypeFieldWrapper>
            <ComponentNameFieldWrapper>
              <Field<CompassComponent['name']>
                name="name"
                label={formatMessage(CommonMessages.name)}
                isRequired
                isDisabled={submitting}
                validate={nameValidator}
              >
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      {...fieldProps}
                      maxLength={NAME_MAX_LENGTH}
                      placeholder={formatMessage(
                        messages.createComponentNamePlaceholder,
                      )}
                      autoComplete="off"
                      testId="dragonfruit.teams.team-create-component.name-field"
                    />
                    {error && (
                      <ErrorMessage
                        testId="dragonfruit.teams.team-create-component.name-field"
                        message={error}
                      />
                    )}
                  </>
                )}
              </Field>
            </ComponentNameFieldWrapper>
            <ButtonWrapper>
              <ButtonGroup>
                <Button
                  appearance="subtle"
                  onClick={onCancel}
                  isDisabled={submitting}
                  testId="dragonfruit.teams.team-create-component.cancel-button"
                >
                  {formatMessage(CommonMessages.cancel)}
                </Button>
                <LoadingButton
                  appearance="primary"
                  type="submit"
                  isLoading={submitting}
                  isDisabled={!isNameValid}
                  testId="dragonfruit.teams.team-create-component.submit-button"
                >
                  {formatMessage(CommonMessages.create)}
                </LoadingButton>
              </ButtonGroup>
            </ButtonWrapper>
          </FormWrapper>
        </form>
      )}
    </Form>
  );
};
