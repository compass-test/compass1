import React, { useCallback, useState } from 'react';

import Button, {
  ButtonGroup,
  ButtonProps,
  LoadingButton,
} from '@atlaskit/button';
import { DatePicker } from '@atlaskit/datetime-picker';
import { useFlags } from '@atlaskit/flag';
import Form, { ErrorMessage, Field, HelperMessage } from '@atlaskit/form';
import TextArea from '@atlaskit/textarea';
import TextField from '@atlaskit/textfield';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
  FormFieldWrapper,
} from '@atlassian/dragonfruit-common-ui';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import {
  checkCompassMutationSuccess,
  CompassAnnouncement,
  CompassComponent,
  CompassComponentOverviewFragment,
  CompassCreateAnnouncementInput,
  useCreateAnnouncement,
} from '@atlassian/dragonfruit-graphql';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import {
  ComponentFieldValueContainer,
  ComponentNameContainer,
  ComponentTypeIconContainer,
  Footer,
} from './styled';

const TITLE_MAX_LENGTH = 255;
const DESCRIPTION_MAX_LENGTH = 10000;

type FormData = CompassCreateAnnouncementInput & {
  componentId: CompassComponent['id'];
};
type ErrorData = Partial<Record<keyof FormData, string>> | undefined;

export type CreateAnnouncementFormProps = {
  component: CompassComponentOverviewFragment;
  onSubmit?: () => void;
  onSuccess?: () => void;
  onFailure?: () => void;
  onCancel?: ButtonProps['onClick'];
};

function CreateAnnouncementForm(props: CreateAnnouncementFormProps) {
  const { component, onSubmit, onSuccess, onFailure, onCancel } = props;

  const { showFlag } = useFlags();
  const intl = useIntl();
  const { formatMessage } = intl;
  const [createAnnouncement] = useCreateAnnouncement();

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isTargetDateValid, setIsTargetDateValid] = useState(false);

  // Today's date in YYYY-MM-DD format
  const todayDate = new Date().toISOString();

  const handleSubmit = useCallback(
    (data: FormData) => {
      // Callback to react when modal starts submitting
      if (onSubmit) {
        onSubmit();
      }

      const mutationInput = {
        componentId: component.id,
        title: data.title,
        description: data.description,
        // data.targetDate contains just the date, but the backend expects the time to be there as well
        targetDate: new Date(data.targetDate).toISOString(),
      };

      // If the submission succeeded; we should return undefined.
      // If there was an error, should return an object
      return createAnnouncement(mutationInput)
        .then((res) => {
          const payload = res?.data?.compass?.createAnnouncement;
          checkCompassMutationSuccess(payload);

          showFlag({
            ...BaseSuccessFlagProps,
            id: 'dragonfruit-component-announcements.ui.create-success',
            title: formatMessage(messages.createAnnouncementSuccessFlagTitle),
          });

          if (onSuccess) {
            onSuccess();
          }
        })
        .catch(
          (error): ErrorData => {
            // Callback to react on a failure
            if (onFailure) {
              onFailure();
            }

            // Show generic error flag
            showFlag({
              ...BaseErrorFlagProps,
              title: formatMessage(messages.createAnnouncementErrorFlagTitle),
              description: formatMessage(
                messages.createAnnouncementErrorFlagDescription,
              ),
            });

            // Return an object to indicate that there were errors.
            return {};
          },
        );
    },
    [
      component.id,
      createAnnouncement,
      formatMessage,
      onFailure,
      onSubmit,
      onSuccess,
      showFlag,
    ],
  );

  return (
    <Form<FormData> onSubmit={handleSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormFieldWrapper>
            <Field<CompassComponent['id']>
              name="component"
              label={formatMessage(messages.componentFieldLabel)}
              defaultValue={component.id}
            >
              {() => (
                <ComponentFieldValueContainer>
                  <ComponentTypeIconContainer>
                    <ComponentTypeIcon type={component.type} size="small" />
                  </ComponentTypeIconContainer>
                  <ComponentNameContainer>
                    {component.name}
                  </ComponentNameContainer>
                </ComponentFieldValueContainer>
              )}
            </Field>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <Field<string>
              name="title"
              label={formatMessage(messages.announcementTitleFieldLabel)}
              isRequired
              isDisabled={submitting}
              validate={(value) => {
                if (!value || value.trim().length === 0) {
                  setIsTitleValid(false);
                } else {
                  setIsTitleValid(true);
                }
              }}
            >
              {({ fieldProps, error }) => (
                <>
                  <TextField
                    {...fieldProps}
                    maxLength={TITLE_MAX_LENGTH}
                    placeholder={formatMessage(messages.titleFieldPlaceholder)}
                    autoComplete="off"
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </>
              )}
            </Field>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <Field<string>
              name="description"
              label={formatMessage(CommonMessages.description)}
              isDisabled={submitting}
            >
              {({ fieldProps, error }) => (
                <>
                  <TextArea
                    {...fieldProps}
                    placeholder={formatMessage(
                      messages.descriptionFieldPlaceholder,
                    )}
                    minimumRows={12}
                    // Overriding the `onChange` since `fieldProps` has a different function signature
                    // for it compared to what `TextArea` accepts as a prop
                    onChange={(event) => {
                      fieldProps.onChange(event.target.value);
                    }}
                    // @ts-ignore - `maxLength` doesn't exist as a prop on TextArea?? It should though.. and it works..
                    // see `packages/help/help/src/components/Article/HelpArticle/WasHelpfulForm/index.tsx` as an example
                    maxLength={DESCRIPTION_MAX_LENGTH}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </>
              )}
            </Field>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <Field<CompassAnnouncement['targetDate']>
              name="targetDate"
              label={formatMessage(messages.targetDateFieldLabel)}
              validate={(value?: string) => {
                if (!value) {
                  setIsTargetDateValid(false);
                } else {
                  setIsTargetDateValid(true);
                }
              }}
              isDisabled={submitting}
              isRequired
            >
              {({ fieldProps, error }) => (
                <>
                  <DatePicker
                    {...fieldProps}
                    placeholder={formatMessage(
                      messages.targetDatePickerPlaceholder,
                    )}
                    minDate={todayDate}
                    locale={intl && intl.locale ? intl.locale : 'en-US'}
                  />
                  <HelperMessage>
                    {formatMessage(messages.targetDateFieldHelperMessage)}
                  </HelperMessage>
                </>
              )}
            </Field>
          </FormFieldWrapper>

          {/*
            Footer has been included as a custom styled component here with the
            same padding as a ModalFooter. This is so that we can keep the
            footer within the <form> without having to hack the modal container,
            which has issues with re-renders and data persistence.

            It also extends the size of the modal body so that the "type" field
            doesn't clip behind the footer.
          */}
          {/*
            TODO: Move footer out of form and use ModalDialog's official <ModalFooter>
          */}
          <Footer>
            <ButtonGroup>
              <Button
                appearance="subtle"
                onClick={onCancel}
                isDisabled={submitting}
              >
                {formatMessage(CommonMessages.cancel)}
              </Button>
              <LoadingButton
                appearance="primary"
                type="submit"
                isLoading={submitting}
                isDisabled={!isTitleValid || !isTargetDateValid}
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

export default withErrorBoundary(CreateAnnouncementForm, {
  componentName: 'createAnnouncementForm',
});
