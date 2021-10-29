import React, { useCallback, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { UIAnalyticsEvent, useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button, { ButtonGroup, LoadingButton } from '@atlaskit/button';
import { useFlags } from '@atlaskit/flag';
import Form, { ErrorMessage as BaseErrorMessage, Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { ErrorFlagIcon } from '@atlassian/dragonfruit-common-ui';
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
import {
  TeamSelect,
  TeamSelectValue,
} from '@atlassian/dragonfruit-services-components';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import {
  ButtonWrapper,
  ComponentDescriptionFieldWrapper,
  ComponentNameFieldWrapper,
  ComponentOwnerSelectWrapper,
  ErrorMessageWrapper,
  FormWrapper,
} from './styled';

type Props = {
  onCancel: (
    event: React.MouseEvent<HTMLElement>,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
  onSuccess: () => void;
  componentType: CompassComponentType;
};

type FormData = Pick<CompassComponent, 'name' | 'description'> & {
  owner: TeamSelectValue;
};

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
  const { onCancel, onSuccess, componentType } = props;
  const { cloudId, orgId } = useTenantInfo();
  const { showFlag } = useFlags();
  const { validateName } = useComponentValidations();
  const { createAnalyticsEvent } = useAnalyticsEvents();

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
    [setNameValid, formatMessage, validateName],
  );

  const [createComponent] = useCreateComponent();
  const [, { addComponent }] = useRecentComponents();

  const showCreateComponentErrorFlag = useCallback(
    (description: FormattedMessage.MessageDescriptor) => {
      showFlag({
        icon: ErrorFlagIcon,
        isAutoDismiss: true,
        title: formatMessage(messages.createComponentErrorFlagTitle),
        description: formatMessage(description),
        testId: 'dragonfruit.component-list.inline-create-component.error-flag',
      });
    },
    [formatMessage, showFlag],
  );

  const handleSubmit = useCallback(
    (data: FormData) => {
      fireUIAnalytics(
        createAnalyticsEvent({}),
        'createButton clicked',
        'inlineCreateComponent',
        {
          componentType,
        },
      );

      // Callback to react when modal starts submitting
      const mutationData = {
        name: data.name,
        description: data.description,
        type: componentType,
        ownerId: data.owner?.value,
      };

      return createComponent(cloudId, mutationData)
        .then((res) => {
          const payload = res?.data?.compass?.createComponent;
          checkCompassMutationSuccess(payload);
          if (res?.data?.compass?.createComponent?.componentDetails?.id) {
            addComponent({
              id: res?.data?.compass?.createComponent?.componentDetails?.id,
              type: mutationData.type,
              name: mutationData.name,
              description: mutationData.description,
              ownerId: mutationData.ownerId || undefined,
              ownerName: data.owner?.label || undefined,
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
      componentType,
      createComponent,
      createAnalyticsEvent,
      onSuccess,
      showCreateComponentErrorFlag,
      addComponent,
    ],
  );

  return (
    <Form<FormData> onSubmit={handleSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormWrapper>
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
                      testId="dragonfruit.component-list.inline-create-component.name-field"
                    />
                    {error && (
                      <ErrorMessage
                        testId="dragonfruit.component-list.inline-create-component.name-field"
                        message={error}
                      />
                    )}
                  </>
                )}
              </Field>
            </ComponentNameFieldWrapper>
            <ComponentDescriptionFieldWrapper>
              <Field<string | undefined>
                name="description"
                label={formatMessage(CommonMessages.description)}
                isDisabled={submitting}
              >
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      {...fieldProps}
                      placeholder={formatMessage(
                        messages.createComponentDescriptionPlaceholder,
                      )}
                      autoComplete="off"
                      testId="dragonfruit.component-list.inline-create-component.description-field"
                    />
                    {error && (
                      <ErrorMessage
                        testId="dragonfruit.component-list.inline-create-component.description-field"
                        message={error}
                      />
                    )}
                  </>
                )}
              </Field>
            </ComponentDescriptionFieldWrapper>
            <ComponentOwnerSelectWrapper>
              <Field<TeamSelectValue>
                name="owner"
                label={formatMessage(CommonMessages.ownerTeam)}
                isDisabled={submitting}
              >
                {({ fieldProps, error }) => (
                  <>
                    <TeamSelect
                      {...fieldProps}
                      placeholder={formatMessage(
                        messages.createComponentOwnerPlaceholder,
                      )}
                      orgId={orgId}
                      testId="dragonfruit.component-list.inline-create-component.owner-select"
                    />
                    {error && (
                      <ErrorMessage
                        testId="dragonfruit.component-list.inline-create-component.owner-select"
                        message={error}
                      />
                    )}
                  </>
                )}
              </Field>
            </ComponentOwnerSelectWrapper>
            <ButtonWrapper>
              <ButtonGroup>
                <Button
                  appearance="subtle"
                  onClick={onCancel}
                  isDisabled={submitting}
                  testId="dragonfruit.component-list.inline-create-component.cancel-button"
                >
                  {formatMessage(CommonMessages.cancel)}
                </Button>
                <LoadingButton
                  appearance="primary"
                  type="submit"
                  isLoading={submitting}
                  isDisabled={!isNameValid}
                  testId="dragonfruit.component-list.inline-create-component.submit-button"
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
