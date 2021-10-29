import React, { useCallback, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Button, {
  ButtonGroup,
  ButtonProps,
  LoadingButton,
} from '@atlaskit/button';
import { useFlags } from '@atlaskit/flag';
import Form, { ErrorMessage, Field } from '@atlaskit/form';
import EditorAddIcon from '@atlaskit/icon/glyph/editor/add';
import TextField from '@atlaskit/textfield';
import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  FormFieldWrapper,
} from '@atlassian/dragonfruit-common-ui';
import { ComponentTypeSelect } from '@atlassian/dragonfruit-components';
import {
  checkCompassMutationSuccess,
  CompassComponent,
  CompassComponentType,
  CompassMutationError,
  CreateComponentHandledErrors,
  useCreateComponent,
} from '@atlassian/dragonfruit-graphql';
import {
  TeamSelect,
  TeamSelectValue,
} from '@atlassian/dragonfruit-services-components';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ANALYTICS_PACKAGE_NAME } from '../../../../common/constants';
import { useCreateComponentModalControls } from '../../../../controllers/create-component-modal-controller';
import {
  NAME_MAX_LENGTH,
  useComponentValidations,
} from '../../../../services/get-component-validations';

import messages from './messages';
import { Footer, StartTeamButtonLabelWrapper, Wrapper } from './styled';

export type FormData = Pick<CompassComponent, 'name' | 'type'> & {
  owner: TeamSelectValue;
};

type ErrorData = Partial<Record<keyof FormData, string>> | undefined;

type Props = {
  onClick?: () => void;
  testId?: string;
};

const CreateTeamButton = (props: Props) => {
  const { onClick, testId } = props;
  const { formatMessage } = useIntl();

  const label = formatMessage(messages.startTeamButtonLabel);
  return (
    <Wrapper onClick={onClick} aria-label={label} data-testid={testId}>
      <Button
        appearance="subtle-link"
        spacing="none"
        iconBefore={<EditorAddIcon label="" />}
      >
        <StartTeamButtonLabelWrapper>{label}</StartTeamButtonLabelWrapper>
      </Button>
    </Wrapper>
  );
};

export type CreateComponentFormProps = {
  onSubmit?: () => void;
  // Returns the ID of the created component
  onSuccess?: (componentId: CompassComponent['id']) => void;
  onFailure?: () => void;
  onCancel?: ButtonProps['onClick'];
  testId?: string;
};

function CreateComponentForm(props: CreateComponentFormProps) {
  const { onSubmit, onSuccess, onFailure, onCancel } = props;

  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();
  const { cloudId, orgId } = useTenantInfo();
  const [createComponent] = useCreateComponent();
  const { validateName } = useComponentValidations();

  const [isNameValid, setIsNameValid] = useState(false);

  const [
    { selectedTeamId, componentType, componentName },
    { onClickCreateTeam, setComponentType, setComponentName },
  ] = useCreateComponentModalControls();

  const showCreateComponentErrorFlag = useCallback(
    (description: FormattedMessage.MessageDescriptor) => {
      showFlag({
        ...BaseErrorFlagProps,
        title: formatMessage(messages.createComponentErrorFlagTitle),
        description: formatMessage(description),
      });
    },
    [formatMessage, showFlag],
  );

  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();

  const handleSubmit = useCallback(
    (data: FormData) => {
      // Callback to react when modal starts submitting
      if (onSubmit) {
        onSubmit();
      }

      const mutationData = {
        name: componentName,
        type: data.type,
        ownerId: data.owner?.value,
      };

      // If the submission succeeded; we should return undefined.
      // If there was an error; should return an object with {field: errorMessage}
      return createComponent(cloudId, mutationData)
        .then((res) => {
          const payload = res?.data?.compass?.createComponent;
          checkCompassMutationSuccess(payload);

          const component = payload?.componentDetails;

          if (onSuccess && component) {
            onSuccess(component.id);
          }
        })
        .catch(
          (error): ErrorData => {
            // Callback to react on a failure
            if (onFailure) {
              onFailure();
            }

            if (error instanceof CompassMutationError) {
              const errorType = error.getFirstErrorType();
              switch (errorType) {
                case CreateComponentHandledErrors.COMPONENT_DESCRIPTION_TOO_LONG:
                  showCreateComponentErrorFlag(
                    messages.createComponentDescriptionTooLong,
                  );
                  return {};
                case CreateComponentHandledErrors.COMPONENT_NAME_BLANK:
                  showCreateComponentErrorFlag(
                    messages.createComponentNameBlank,
                  );
                  return {};
                case CreateComponentHandledErrors.COMPONENT_NAME_TOO_LONG:
                  showCreateComponentErrorFlag(
                    messages.createComponentNameTooLong,
                  );
                  return {};
                default:
                  fireCompassMutationErrorAnalytics({
                    error,
                    componentName: 'CreateComponentForm',
                    packageName: ANALYTICS_PACKAGE_NAME,
                  });
              }
            }
            showCreateComponentErrorFlag(
              messages.createComponentErrorFlagContent,
            );

            // Return an object to indicate that there were errors.
            return {};
          },
        );
    },
    [
      cloudId,
      createComponent,
      fireCompassMutationErrorAnalytics,
      onFailure,
      onSubmit,
      onSuccess,
      showCreateComponentErrorFlag,
      componentName,
    ],
  );

  return (
    <Form<FormData> onSubmit={handleSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormFieldWrapper>
            <Field<CompassComponentType>
              name="type"
              label={formatMessage(CommonMessages.type)}
              isRequired
              isDisabled={submitting}
              defaultValue={componentType ?? CompassComponentType.SERVICE}
            >
              {({ fieldProps, error }) => (
                <>
                  <ComponentTypeSelect
                    {...fieldProps}
                    autoFocus
                    menuPosition="fixed"
                    onChange={setComponentType}
                    placeHolder={formatMessage(
                      messages.componentTypePlaceHolder,
                    )}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </>
              )}
            </Field>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <Field<CompassComponent['name']>
              name="name"
              label={formatMessage(CommonMessages.name)}
              isRequired
              isDisabled={submitting}
              defaultValue={componentName ?? ''}
              // Here we're using the validate prop as an easy hook to fetch the
              // value onChange and update the isNameValid state.
              validate={(value) => {
                setIsNameValid(validateName(value));
              }}
            >
              {({ fieldProps, error }) => (
                <>
                  <TextField
                    {...fieldProps}
                    maxLength={NAME_MAX_LENGTH}
                    placeholder={formatMessage(messages.nameFieldPlaceholder)}
                    autoComplete="off"
                    onChange={(input) =>
                      setComponentName(input.currentTarget.value)
                    }
                    value={componentName}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </>
              )}
            </Field>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <Field<TeamSelectValue>
              name="owner"
              isDisabled={submitting}
              label={formatMessage(CommonMessages.ownerTeam)}
              defaultValue={
                selectedTeamId ? { value: selectedTeamId } : undefined
              }
            >
              {({ fieldProps, error }) => (
                <>
                  <TeamSelect
                    {...fieldProps}
                    isClearable
                    menuPosition="fixed"
                    data-test-id={`pollinator-create-modal-team-select`}
                    defaultTeamId={selectedTeamId ? selectedTeamId : undefined}
                    orgId={orgId}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </>
              )}
            </Field>
          </FormFieldWrapper>

          <CreateTeamButton
            onClick={onClickCreateTeam}
            testId={
              props.testId
                ? props.testId + '-create-team-button'
                : 'create-component-modal-create-team-button'
            }
          />

          {/*
            Footer has been included as a custom styled component here with the
            same padding as a ModalFooter. This is so that we can keep the
            footer within the <form> without having to hack the modal container,
            which has issues with re-renders and data persistence.

            It also extends the size of the modal body so that the "type" field
            doesn't clip behind the footer.
        */}
          <Footer>
            <ButtonGroup>
              <Button
                appearance="subtle"
                onClick={onCancel}
                isDisabled={submitting}
                testId="dragonfruit-create-component-modal.ui.cancel-button"
              >
                {formatMessage(CommonMessages.cancel)}
              </Button>
              <LoadingButton
                appearance="primary"
                type="submit"
                isLoading={submitting}
                isDisabled={!isNameValid}
                testId="dragonfruit-create-component-modal.ui.submit-button"
              >
                {formatMessage(CommonMessages.create)}
              </LoadingButton>
            </ButtonGroup>
          </Footer>
        </form>
      )}
    </Form>
  );
}

export default withErrorBoundary(CreateComponentForm, {
  componentName: 'createComponentForm',
});
