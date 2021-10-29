import React, { useState } from 'react';

import Button, { ButtonGroup, LoadingButton } from '@atlaskit/button';
import Form, { ErrorMessage as BaseErrorMessage } from '@atlaskit/form';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { FocusState } from '@atlassian/dragonfruit-common-ui';
import { CompassScorecard } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { AvailableFieldsProvider } from '../../../controllers/available-fields';
import { useErrors } from '../../../services/errors';

import messages from './messages';
import { ScorecardHeader } from './scorecard-header';
import {
  Divider,
  ErrorMessageWrapper,
  ScorecardFormHeading,
  ScorecardFormWrapper,
  StyledFooter,
} from './styled';
import TemplateFormBody from './template-form-body';
import { getInitialCriteriaData } from './utils';

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
  testId: string;
  mutationCallback: any;
  scorecard?: CompassScorecard;
  isModalOpen: boolean;
}

interface ErrorMessageProps {
  testId: string;
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ testId, message }) => (
  <ErrorMessageWrapper>
    <BaseErrorMessage testId={`${testId}-error`}>{message}</BaseErrorMessage>
  </ErrorMessageWrapper>
);

const ScorecardBaseModal: React.FC<Props> = ({
  onSubmit,
  onCancel,
  testId,
  mutationCallback,
  scorecard,
  isModalOpen,
}) => {
  const { formatMessage } = useIntl();
  const { handleBaseError, formatScorecardBaseError } = useErrors();
  const [isSavePending, setIsSavePending] = useState(false);

  const CustomFooter = ({ error }: { error: string | undefined }) => {
    return (
      <StyledFooter>
        {error && (
          <ErrorMessage
            testId="dragonfruit-scorecards.scorecard-form.form-base"
            message={formatScorecardBaseError(error)}
          />
        )}

        <ButtonGroup>
          <Button
            testId="dragonfruit-scorecards.scorecard-form.form-cancel"
            appearance="subtle"
            onClick={onCancel}
            isDisabled={isSavePending}
          >
            {formatMessage(CommonMessages.cancel)}
          </Button>
          <LoadingButton
            testId="dragonfruit-scorecards.scorecard-form.form-submit"
            type="submit"
            appearance="primary"
            isLoading={isSavePending}
          >
            {' '}
            {scorecard
              ? formatMessage(CommonMessages.save)
              : formatMessage(CommonMessages.create)}{' '}
          </LoadingButton>
        </ButtonGroup>
      </StyledFooter>
    );
  };

  const { initialClaims, criteriaAllInfo } = getInitialCriteriaData(
    scorecard?.criterias || [],
  );

  const headerText: string = scorecard
    ? formatMessage(messages.editScorecardHeader)
    : formatMessage(messages.createScorecardHeader);

  return (
    <FocusState onClose={onCancel} isOpen={isModalOpen}>
      <ScorecardFormWrapper>
        <Form
          onSubmit={async (formData) => {
            setIsSavePending(true); // Disable Cancel and Submit buttons

            try {
              // Validation errors to be displayed to the user
              const errors = await mutationCallback(formData);

              if (errors) {
                return errors; // Pass validation errors to the form below
              } else {
                onSubmit(); // No errors? Close the modal!
              }
            } finally {
              // Ensure the modal doesn't get stuck with disabled buttons if it throws
              setIsSavePending(false); // Enable Cancel and Submit buttons regardless of result
            }
          }}
        >
          {({ formProps, getState }) => (
            <form {...formProps} id="dragonfruit.scorecards.scorecard-form">
              {/* This stopPropagation is to prevent the InlineEditor component
                 submits from submitting the entire scorecard form */}
              <div onSubmit={(e) => e.stopPropagation()}>
                <ScorecardFormHeading>{headerText}</ScorecardFormHeading>
                <ScorecardHeader
                  description={scorecard?.description}
                  name={scorecard?.name}
                  testId={testId}
                  owner={scorecard?.owner}
                  importance={scorecard?.importance}
                  componentType={scorecard?.componentType}
                />

                <Divider />

                <AvailableFieldsProvider hookArgs={[initialClaims]}>
                  <TemplateFormBody initialCriteria={criteriaAllInfo} />
                </AvailableFieldsProvider>

                <Divider />
                <CustomFooter error={handleBaseError(getState)} />
              </div>
            </form>
          )}
        </Form>
      </ScorecardFormWrapper>
    </FocusState>
  );
};
export default ScorecardBaseModal;
