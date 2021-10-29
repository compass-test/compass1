import React, { useCallback, useState } from 'react';

import Button, { ButtonGroup, LoadingButton } from '@atlaskit/button';
import Form, { Field } from '@atlaskit/form';
import ModalDialog, {
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { FormFieldWrapper } from '@atlassian/dragonfruit-common-ui';
import {
  ApplyScorecardToComponentHandledErrors,
  checkCompassMutationSuccess,
  CompassMutationError,
  useApplyScorecardToComponent,
} from '@atlassian/dragonfruit-graphql';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { SCORECARD_DAC_LINK } from '../../constants';

import { ApplicableScorecardsSelect } from './applicable-scorecards-select';
import ErrorBoundary from './error';
import { useApplyScorecardFlags } from './flags';
import messages from './messages';
import { Explanation, Footer, ModalContainer } from './styled';
import { ApplyScorecardModalProps, FormData } from './types';

function ApplyScorecardModal({
  testId = 'apply-scorecard-modal-test-id',
  componentId,
  onCancel,
  onClose,
}: ApplyScorecardModalProps) {
  const { formatMessage } = useIntl();

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const [inlineErrorMessage, setInlineErrorMessage] = useState<string | null>(
    null,
  );

  const [applyScorecardToComponentMutation] = useApplyScorecardToComponent();

  const {
    showApplyScorecardFailureFlag,
    showApplyScorecardSuccessFlag,
  } = useApplyScorecardFlags();

  const handleMutationError = useCallback(
    ({
      errorType,
      scorecardName,
    }: {
      errorType: string | null;
      scorecardName: string;
    }) => {
      switch (errorType) {
        // If the scorecard has already been applied to the component, show a success flag
        case ApplyScorecardToComponentHandledErrors.SCORECARD_ALREADY_APPLIED_TO_COMPONENT:
          showApplyScorecardSuccessFlag(scorecardName);
          onClose();
          break;
        case ApplyScorecardToComponentHandledErrors.SCORECARD_COMPONENT_APPLICATION_SCORECARD_NOT_FOUND:
          setInlineErrorMessage(
            formatMessage(messages.scorecardNotFoundErrorMessage),
          );
          break;
        case ApplyScorecardToComponentHandledErrors.SCORECARD_COMPONENT_APPLICATION_COMPONENT_NOT_FOUND:
          showApplyScorecardFailureFlag(scorecardName);
          onClose();
          break;
        case ApplyScorecardToComponentHandledErrors.SCORECARD_COMPONENT_TYPE_INCOMPATIBLE:
          setInlineErrorMessage(
            formatMessage(messages.wrongComponentTypeErrorMessage),
          );
          break;
        case ApplyScorecardToComponentHandledErrors.SCORECARD_REQUIRED_NOT_APPLICABLE:
          setInlineErrorMessage(
            formatMessage(messages.requiredScorecardNotApplicableErrorMessage),
          );
          break;
        default:
          // possible rare cases including but not limited to:
          // SCORECARD_COMPONENT_APPLICATION_LIMIT_REACHED
          // permission error
          onClose();
          showApplyScorecardFailureFlag(scorecardName);
          break;
      }
    },
    [
      formatMessage,
      showApplyScorecardSuccessFlag,
      showApplyScorecardFailureFlag,
      onClose,
    ],
  );

  const handleSubmit = useCallback(
    async (data: FormData) => {
      let scorecardId = '';
      let scorecardName = '';

      try {
        scorecardId = data.scorecard?.value as string;
        scorecardName = data.scorecard?.label as string;

        const mutationResult = await applyScorecardToComponentMutation(
          scorecardId,
          componentId,
        );

        checkCompassMutationSuccess(
          mutationResult?.data?.compass?.applyScorecardToComponent,
        );

        // If no error was caught, display successful response
        showApplyScorecardSuccessFlag(scorecardName);
        onClose();
      } catch (error) {
        if (error instanceof CompassMutationError) {
          const errorType = error.getFirstErrorType();
          handleMutationError({ errorType, scorecardName });
        } else {
          onClose();
          showApplyScorecardFailureFlag(scorecardName);
          throw error;
        }
      }
    },
    [
      handleMutationError,
      applyScorecardToComponentMutation,
      showApplyScorecardFailureFlag,
      showApplyScorecardSuccessFlag,
      onClose,
      componentId,
    ],
  );

  return (
    <ModalContainer data-testid={testId}>
      <ModalTransition>
        <ModalDialog onClose={onClose} autoFocus={false}>
          <ModalHeader>
            <ModalTitle>{formatMessage(messages.header)}</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Explanation>
              {formatMessage(messages.explanation)}{' '}
              <a href={SCORECARD_DAC_LINK} target="_blank">
                {formatMessage(messages.linkText)}
              </a>
            </Explanation>

            <Form<FormData> onSubmit={handleSubmit}>
              {({ formProps, submitting }) => (
                <form {...formProps}>
                  <FormFieldWrapper>
                    <Field
                      name="scorecard"
                      validate={(value: any) => {
                        if (value) {
                          setIsSubmitEnabled(true);
                        } else {
                          setIsSubmitEnabled(false);
                        }
                      }}
                    >
                      {({ fieldProps }) => (
                        <ApplicableScorecardsSelect
                          testId="dragonfruit-apply-scorecard-modal.ui.scorecards-select"
                          componentId={componentId}
                          inlineErrorMessage={inlineErrorMessage}
                          clearError={() => setInlineErrorMessage(null)}
                          {...fieldProps}
                        />
                      )}
                    </Field>
                  </FormFieldWrapper>

                  <Footer>
                    <ButtonGroup>
                      <Button
                        appearance="subtle"
                        onClick={onCancel}
                        isDisabled={submitting}
                        testId="dragonfruit-apply-scorecard-modal.ui.cancel-button"
                      >
                        {formatMessage(CommonMessages.cancel)}
                      </Button>
                      <LoadingButton
                        appearance="primary"
                        type="submit"
                        isLoading={submitting}
                        isDisabled={!isSubmitEnabled}
                        testId="dragonfruit-apply-scorecard-modal.ui.submit-button"
                      >
                        {formatMessage(CommonMessages.apply)}
                      </LoadingButton>
                    </ButtonGroup>
                  </Footer>
                </form>
              )}
            </Form>
          </ModalBody>
        </ModalDialog>
      </ModalTransition>
    </ModalContainer>
  );
}

export default withErrorBoundary(ApplyScorecardModal, {
  Fallback: ErrorBoundary,
  // componentName is used by the default SimpleErrorFallback component which we are not using,
  // so it is not strictly necessary
  componentName: 'applyScorecardModal',
});
