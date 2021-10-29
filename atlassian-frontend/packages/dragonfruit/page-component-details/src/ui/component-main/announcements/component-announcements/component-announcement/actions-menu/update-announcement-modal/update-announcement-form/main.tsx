import React, { useCallback, useState } from 'react';

import Button, {
  ButtonGroup,
  ButtonProps,
  LoadingButton,
} from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import { DatePicker } from '@atlaskit/datetime-picker';
import Form, { Field, HelperMessage } from '@atlaskit/form';
import TextArea from '@atlaskit/textarea';
import TextField from '@atlaskit/textfield';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { FormFieldWrapper } from '@atlassian/dragonfruit-common-ui';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import {
  checkCompassMutationSuccess,
  CompassAnnouncement,
  CompassComponent,
  CompassComponentOverviewFragment,
  CompassUpdateAnnouncementInput,
  useUpdateAnnouncement,
} from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { useAnnouncementUpdateErrorHandler } from './error-handling';
import { useAnnouncementUpdateMutationFlags } from './error-handling/flags';
import messages from './messages';
import {
  ClearAcknowledgementsField,
  ComponentFieldValueContainer,
  ComponentNameContainer,
  ComponentTypeIconContainer,
  Footer,
} from './styled';

const TITLE_MAX_LENGTH = 255;
const DESCRIPTION_MAX_LENGTH = 10000;

type FormData = CompassUpdateAnnouncementInput & {
  componentId: CompassComponent['id'];
};

export type UpdateAnnouncementFormProps = {
  component: CompassComponentOverviewFragment;
  announcement: CompassAnnouncement;
  onSubmit?: () => void;
  onSuccess?: () => void;
  onFailure?: () => void;
  onCancel?: ButtonProps['onClick'];
};

function UpdateAnnouncementForm(props: UpdateAnnouncementFormProps) {
  const {
    component,
    announcement,
    onSubmit,
    onSuccess,
    onFailure,
    onCancel,
  } = props;

  const intl = useIntl();
  const { cloudId } = useTenantInfo();
  const { formatMessage } = intl;
  const [updateAnnouncement] = useUpdateAnnouncement();
  const { handleAnnouncementUpdateError } = useAnnouncementUpdateErrorHandler();
  const {
    showAnnouncementUpdateSuccessFlag,
  } = useAnnouncementUpdateMutationFlags();

  const [isTitleValid, setIsTitleValid] = useState<boolean>(false);
  const [isTargetDateValid, setIsTargetDateValid] = useState<boolean>(false);
  const [
    isClearAcknowledgementsChecked,
    setIsClearAcknowledgementsChecked,
  ] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (data: FormData) => {
      if (onSubmit) {
        onSubmit();
      }

      const mutationInput = {
        cloudId,
        id: announcement.id,
        title: data.title,
        description: data.description,
        // `data.targetDate` contains just the date, but the API expects the time to be there as well
        targetDate: new Date(data.targetDate).toISOString(),
        clearAcknowledgements: isClearAcknowledgementsChecked,
      };

      return updateAnnouncement(mutationInput)
        .then((res) => {
          const payload = res?.data?.compass?.updateAnnouncement;
          checkCompassMutationSuccess(payload);

          showAnnouncementUpdateSuccessFlag();
          onSuccess?.();
        })
        .catch((error) => {
          handleAnnouncementUpdateError(error);
          onFailure?.();
        });
    },
    [
      onSubmit,
      cloudId,
      announcement.id,
      isClearAcknowledgementsChecked,
      updateAnnouncement,
      showAnnouncementUpdateSuccessFlag,
      onSuccess,
      handleAnnouncementUpdateError,
      onFailure,
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
              defaultValue={announcement.title as string}
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
              {({ fieldProps }) => (
                <>
                  <TextField
                    {...fieldProps}
                    maxLength={TITLE_MAX_LENGTH}
                    placeholder={formatMessage(messages.titleFieldPlaceholder)}
                    autoComplete="off"
                  />
                </>
              )}
            </Field>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <Field<string>
              name="description"
              label={formatMessage(CommonMessages.description)}
              defaultValue={announcement.description || ''}
              isDisabled={submitting}
            >
              {({ fieldProps }) => (
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
                </>
              )}
            </Field>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <Field<CompassAnnouncement['targetDate']>
              name="targetDate"
              label={formatMessage(messages.targetDateFieldLabel)}
              defaultValue={announcement.targetDate}
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
              {({ fieldProps }) => (
                <>
                  <DatePicker
                    {...fieldProps}
                    placeholder={formatMessage(
                      messages.targetDatePickerPlaceholder,
                    )}
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
            TODO: Move footer out of form and use ModalDialog's official <ModalFooter>
          */}
          <Footer>
            <ClearAcknowledgementsField>
              <Checkbox
                testId={
                  'component-announcement.edit-modal.clear-acknowledgments'
                }
                label={formatMessage(
                  messages.clearAcknowledgementsCheckboxLabel,
                )}
                isChecked={isClearAcknowledgementsChecked}
                onChange={() => {
                  setIsClearAcknowledgementsChecked((prevState) => !prevState);
                }}
              />
            </ClearAcknowledgementsField>

            <ButtonGroup>
              <Button
                appearance="subtle"
                onClick={onCancel}
                isDisabled={submitting}
              >
                {formatMessage(CommonMessages.cancel)}
              </Button>
              <LoadingButton
                testId={'component-announcement.edit-modal.save'}
                appearance="primary"
                type="submit"
                isLoading={submitting}
                isDisabled={!isTitleValid || !isTargetDateValid}
              >
                {formatMessage(CommonMessages.save)}
              </LoadingButton>
            </ButtonGroup>
          </Footer>
        </form>
      )}
    </Form>
  );
}

export default withErrorBoundary(UpdateAnnouncementForm, {
  componentName: 'updateAnnouncementForm',
});
