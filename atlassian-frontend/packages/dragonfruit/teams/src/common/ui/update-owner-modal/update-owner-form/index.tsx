import React, { useCallback, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Button, { ButtonGroup, LoadingButton } from '@atlaskit/button';
import { useFlags } from '@atlaskit/flag';
import Form, { ErrorMessage, Field } from '@atlaskit/form';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  BaseSuccessFlagProps,
  FormFieldWrapper,
} from '@atlassian/dragonfruit-common-ui';
import {
  TeamSelect,
  TeamSelectValue,
} from '@atlassian/dragonfruit-services-components';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { Footer } from './styled';
import { FormData, UpdateOwnerModalProps } from './types';

function UpdateOwnerForm(props: UpdateOwnerModalProps) {
  const { onCancel, componentId, defaultValues, updateOwner } = props;

  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();
  const { orgId } = useTenantInfo();

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const showErrorFlag = useCallback(() => {
    showFlag({
      ...BaseErrorFlagProps,
      id: 'dragonfruit-update-component-owner-modal.ui.update-error',
      title: formatMessage(messages.updateOwnerErrorFlagTitle),
      description: formatMessage(messages.updateOwnerErrorFlagContent),
    });
  }, [showFlag, formatMessage]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        const mutationResult = await updateOwner(
          componentId,
          data.owner?.value,
        );

        if (mutationResult) {
          showFlag({
            ...BaseSuccessFlagProps,
            id: 'dragonfruit-update-component-owner-modal.ui.update-success',
            title: formatMessage(messages.updateOwnerSuccessFlagTitle),
            description: (
              <FormattedMessage
                {...messages.updateOwnerSuccessFlagContent}
                values={{ team: data.owner?.label }}
              />
            ),
          });
        } else {
          showErrorFlag();
        }
      } catch (error) {
        showErrorFlag();
        throw error;
      }
    },
    [updateOwner, showFlag, componentId, formatMessage, showErrorFlag],
  );

  return (
    <Form<FormData> onSubmit={handleSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormFieldWrapper>
            <Field<TeamSelectValue>
              name="owner"
              validate={(value: TeamSelectValue | undefined) => {
                if (value) {
                  setIsSubmitEnabled(true);
                } else {
                  setIsSubmitEnabled(false);
                }
              }}
            >
              {({ fieldProps, error }) => (
                <>
                  <TeamSelect
                    {...fieldProps}
                    orgId={orgId}
                    menuPosition="fixed"
                    defaultTeamId={defaultValues?.id}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </>
              )}
            </Field>
          </FormFieldWrapper>
          <Footer>
            <ButtonGroup>
              <Button
                appearance="subtle"
                onClick={onCancel}
                isDisabled={submitting}
                testId="dragonfruit-update-component-owner-modal.ui.cancel-button"
              >
                {formatMessage(CommonMessages.cancel)}
              </Button>
              <LoadingButton
                appearance="primary"
                type="submit"
                isLoading={submitting}
                isDisabled={!isSubmitEnabled}
                testId="dragonfruit-update-component-owner-modal.ui.submit-button"
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

export default UpdateOwnerForm;
