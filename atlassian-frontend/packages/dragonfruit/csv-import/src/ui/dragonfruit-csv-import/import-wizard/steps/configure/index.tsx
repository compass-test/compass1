import React from 'react';

import Button, { ButtonGroup } from '@atlaskit/button';
import CheckCircleIconGlyph from '@atlaskit/icon/glyph/check-circle';
import ErrorIconGlyph from '@atlaskit/icon/glyph/error';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  Body,
  ButtonContainer,
  Description,
  ErrorIconWrapper,
  Heading,
  MainWrapper,
  SuccessIconWrapper,
} from '../../../../../common/ui/wizard/styled';
import { useCsvImportContext } from '../../../../../controllers/csv-import-controller';
import { ConfigureStep as ConfigureStepState } from '../../../../../services/csv-import-reducer/types';

import messages from './messages';
import { ValidationList } from './styled';

type ConfigureStepProps = { state: ConfigureStepState };

const ErrorIcon = () => (
  <ErrorIconWrapper>
    <ErrorIconGlyph label={'Error'} size={'small'} />
  </ErrorIconWrapper>
);

const SuccessIcon = () => (
  <SuccessIconWrapper>
    <CheckCircleIconGlyph label={'Success'} size={'small'} />
  </SuccessIconWrapper>
);

// Exported for tests.
export const configureStepTestId = 'dragonfruit-csv-import-configure-step';

export const ConfigureStep = ({ state }: ConfigureStepProps) => {
  const { formatMessage } = useIntl();

  const { confirmConfiguration, resetWizard } = useCsvImportContext();

  const csvErrors = state.parsedCsv.errors;
  const errorsView =
    csvErrors.length > 0 ? (
      <div>
        {csvErrors.map(error => (
          <p key={error.row}>
            <ErrorIcon /> Row {error.row}: {error.message}
          </p>
        ))}
      </div>
    ) : undefined;

  // TODO: Support case-insensitive column names
  const expectedFields = ['name', 'type', 'description'];
  const foundFields = state.parsedCsv.meta.fields || [];
  const fieldChecklist = (
    <div>
      {expectedFields.map(expectedField => {
        const fieldFound = foundFields.includes(expectedField);
        return (
          <p key={expectedField}>
            {fieldFound ? (
              <>
                <SuccessIcon /> <strong>{expectedField}</strong> column found
              </>
            ) : (
              <>
                <ErrorIcon />
                <strong>{expectedField}</strong> column not found
              </>
            )}
          </p>
        );
      })}
    </div>
  );

  const missingExpectedFields = expectedFields.filter(
    expectedField => !foundFields.includes(expectedField),
  );

  const haveAllExpectedFields = missingExpectedFields.length === 0;
  const haveNoCsvErrors = csvErrors.length === 0;

  const csvIsValid = haveAllExpectedFields && haveNoCsvErrors;

  return (
    <MainWrapper data-testid={configureStepTestId}>
      <Heading>Validation</Heading>
      <Description>
        {csvIsValid
          ? formatMessage(messages.csvValid)
          : formatMessage(messages.csvInvalid)}
      </Description>
      <Body>
        <ValidationList>
          {errorsView}
          {fieldChecklist}
        </ValidationList>
      </Body>
      <ButtonContainer>
        <ButtonGroup>
          <Button
            onClick={() => {
              resetWizard();
            }}
          >
            {formatMessage(messages.backButton)}
          </Button>
          <Button
            testId={'csv-import-configure-next-button'}
            appearance="primary"
            onClick={() => confirmConfiguration()}
            isDisabled={!csvIsValid}
          >
            {formatMessage(messages.nextButton)}
          </Button>
        </ButtonGroup>
      </ButtonContainer>
    </MainWrapper>
  );
};
