import React from 'react';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import Button, { ButtonGroup, LoadingButton } from '@atlaskit/button';
import Form, { Field, FormFooter, FormHeader } from '@atlaskit/form';
import TextArea from '@atlaskit/textarea';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { FormFieldWrapper } from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { EmojiInput } from './emoji-input';
import { FormSection } from './form-section';
import messages from './messages';
import { FormData } from './types';

interface TeamCheckin {
  mood: string;
  response1?: string;
  response2?: string;
  response3?: string;
}

interface Props {
  onCancel: (
    e: React.MouseEvent<HTMLElement>,
    analyticsEvent?: UIAnalyticsEvent,
  ) => void;
  onSubmit: (data: FormData) => Promise<void>;
  mode?: 'create' | 'edit';
  teamCheckin?: TeamCheckin;
  testId?: string;
}

export const TeamCheckinForm: React.FC<Props> = ({
  onCancel,
  onSubmit,
  mode = 'create',
  teamCheckin = { mood: '3' } as TeamCheckin,
  testId,
}) => {
  const { formatMessage } = useIntl();

  const moodSelectorTestId = testId && `${testId}.mood-selector`;
  const cancelButtonTestId = testId && `${testId}.cancel`;
  const submitButtonTestId = testId && `${testId}.submit`;

  return (
    <Form<FormData> onSubmit={onSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps} data-testid={testId}>
          <FormHeader title={formatMessage(messages.headerTitle)} />
          <FormSection title={formatMessage(messages.moodHeading)}>
            <Field name="mood" defaultValue={teamCheckin.mood}>
              {({ fieldProps }) => (
                <EmojiInput {...fieldProps} testId={moodSelectorTestId} />
              )}
            </Field>
          </FormSection>
          <FormSection
            title={formatMessage(messages.musingsHeading)}
            description={formatMessage(messages.musingsDescription)}
          >
            <FormFieldWrapper>
              <Field
                name="response1"
                label={formatMessage(messages.response1Label)}
                defaultValue={teamCheckin.response1}
              >
                {({ fieldProps }) => (
                  <TextArea
                    {...fieldProps}
                    placeholder={formatMessage(messages.response1Placeholder)}
                    resize={'vertical'}
                    minimumRows={6}
                    // Overriding the `onChange` since `fieldProps` has a different function signature
                    // for it compared to what `TextArea` accepts as a prop
                    onChange={event => {
                      fieldProps.onChange(event.target.value);
                    }}
                    isDisabled={submitting}
                  />
                )}
              </Field>
            </FormFieldWrapper>
            <FormFieldWrapper>
              <Field
                name="response2"
                label={formatMessage(messages.response2Label)}
                defaultValue={teamCheckin.response2}
              >
                {({ fieldProps }) => (
                  <TextArea
                    {...fieldProps}
                    placeholder={formatMessage(messages.response2Placeholder)}
                    resize={'vertical'}
                    minimumRows={6}
                    // Overriding the `onChange` since `fieldProps` has a different function signature
                    // for it compared to what `TextArea` accepts as a prop
                    onChange={event => {
                      fieldProps.onChange(event.target.value);
                    }}
                    isDisabled={submitting}
                  />
                )}
              </Field>
            </FormFieldWrapper>
            <FormFieldWrapper>
              <Field
                name="response3"
                label={formatMessage(messages.response3Label)}
                defaultValue={teamCheckin.response3}
              >
                {({ fieldProps }) => (
                  <TextArea
                    {...fieldProps}
                    placeholder={formatMessage(messages.response3Placeholder)}
                    resize={'vertical'}
                    minimumRows={6}
                    // Overriding the `onChange` since `fieldProps` has a different function signature
                    // for it compared to what `TextArea` accepts as a prop
                    onChange={event => {
                      fieldProps.onChange(event.target.value);
                    }}
                    isDisabled={submitting}
                  />
                )}
              </Field>
            </FormFieldWrapper>
          </FormSection>
          <FormFooter>
            <ButtonGroup>
              <Button
                appearance="subtle"
                onClick={onCancel}
                isDisabled={submitting}
                testId={cancelButtonTestId}
              >
                {formatMessage(CommonMessages.cancel)}
              </Button>
              <LoadingButton
                appearance="primary"
                type="submit"
                isLoading={submitting}
                isDisabled={submitting}
                testId={submitButtonTestId}
              >
                {formatMessage(
                  mode === 'create'
                    ? CommonMessages.create
                    : CommonMessages.save,
                )}
              </LoadingButton>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  );
};
