import React from 'react';

import { CompassLogo } from '@atlaskit/logo';
import { B200, B400, N700 } from '@atlaskit/theme/colors';
import { isInDevMode } from '@atlassian/dragonfruit-utils';

import { useCsvImportContext } from '../../../controllers/csv-import-controller';

import { WizardProgressTracker } from './progress-tracker';
import { ConfigureStep } from './steps/configure';
import { FinishedStep } from './steps/finished';
import { ImportStep } from './steps/import';
import { PreviewStep } from './steps/preview';
import { UploadStep } from './steps/upload';
import { LogoWrapper, Wrapper } from './styled';

// Exported for tests.
export const devModeTestId = 'dragonfruit-csv-import-dev-mode';

export const ImportWizard = () => {
  const { state } = useCsvImportContext();

  let stepComponent;

  switch (state.step) {
    case 'INITIAL':
      stepComponent = <UploadStep state={state} devMode={isInDevMode} />;
      break;
    case 'CONFIGURE':
      stepComponent = <ConfigureStep state={state} />;
      break;
    case 'PREVIEW':
      stepComponent = <PreviewStep state={state} />;
      break;
    case 'IMPORTING':
      stepComponent = <ImportStep state={state} />;
      break;
    case 'COMPLETE':
      stepComponent = <FinishedStep state={state} />;
      break;
    default:
      throw Error(`Unknown import wizard step`);
  }

  return (
    <Wrapper>
      <LogoWrapper>
        <CompassLogo
          textColor={N700}
          iconColor={B200}
          iconGradientStart={B400}
          iconGradientStop={B200}
        />
      </LogoWrapper>

      <WizardProgressTracker state={state} />

      {stepComponent}

      {isInDevMode && (
        <div data-testid={devModeTestId}>
          <br />
          <pre>state = {JSON.stringify(state, undefined, 2)}</pre>
        </div>
      )}
    </Wrapper>
  );
};
