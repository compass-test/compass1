import React from 'react';

import Button, { ButtonGroup } from '@atlaskit/button';
import AddCircle from '@atlaskit/icon/glyph/add-circle';
import Check from '@atlaskit/icon/glyph/check';
import Upload from '@atlaskit/icon/glyph/upload';
import Spinner from '@atlaskit/spinner/spinner';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  Body,
  ButtonContainer,
  Description,
  Heading,
  MainWrapper,
  SpinnerWrapper,
} from '../../../../../common/ui/wizard/styled';
import { useCsvImportContext } from '../../../../../controllers/csv-import-controller';
import { PreviewStep as PreviewStepState } from '../../../../../services/csv-import-reducer/types';

import messages from './messages';
import { IconAndSummary, MessageWrapper } from './styled';

type PreviewStepProps = { state: PreviewStepState };

// Exported for tests.
export const previewStepTestId = 'dragonfruit-csv-import-preview-step';

export const PreviewStep = ({ state }: PreviewStepProps) => {
  const { formatMessage } = useIntl();

  const { resetWizard, confirmPreview } = useCsvImportContext();

  const canContinue =
    !state.existingComponents.requestIsLoading &&
    !state.existingComponents.requestErrorMessage;

  let componentsToCreate = 0;
  let componentsToUpdate = 0;
  let componentsToSkip = 0;

  for (const key in state.importComponents) {
    const plan = state.importComponents[key].importPlan;

    if (plan.action === 'CREATE') {
      componentsToCreate += 1;
    }
    if (plan.action === 'UPDATE') {
      componentsToUpdate += 1;
    }
    if (plan.action === 'SKIP') {
      componentsToSkip += 1;
    }
  }

  return (
    <MainWrapper data-testid={previewStepTestId}>
      <Heading>{formatMessage(messages.heading)}</Heading>

      <Description>
        {state.existingComponents.requestIsLoading
          ? formatMessage(messages.descriptionLoading)
          : formatMessage(messages.description)}
      </Description>

      {state.existingComponents.requestIsLoading && (
        <SpinnerWrapper>
          <Spinner size="large" />
        </SpinnerWrapper>
      )}

      {canContinue && (
        <Body>
          <IconAndSummary>
            <AddCircle label={'add circle icon'} />
            <MessageWrapper>
              <b>{componentsToCreate}</b>{' '}
              {formatMessage(messages.componentsToCreate, {
                count: componentsToCreate,
              })}
            </MessageWrapper>
          </IconAndSummary>
          <IconAndSummary>
            <Upload label={'upload icon'} />
            <MessageWrapper>
              <b>{componentsToUpdate}</b>{' '}
              {formatMessage(messages.componentsToUpdate, {
                count: componentsToUpdate,
              })}
            </MessageWrapper>
          </IconAndSummary>
          <IconAndSummary>
            <Check label={'sync icon'} />
            <MessageWrapper>
              <b>{componentsToSkip}</b>{' '}
              {formatMessage(messages.componentsUnchanged, {
                count: componentsToSkip,
              })}
            </MessageWrapper>
          </IconAndSummary>
        </Body>
      )}

      <ButtonContainer>
        <ButtonGroup>
          <Button onClick={() => resetWizard()}>
            {formatMessage(messages.backButton)}
          </Button>
          <Button
            testId={'csv-import-preview-next-button'}
            appearance="primary"
            onClick={() => confirmPreview()}
            isDisabled={!canContinue}
          >
            {formatMessage(messages.nextButton)}
          </Button>
        </ButtonGroup>
      </ButtonContainer>
    </MainWrapper>
  );
};
