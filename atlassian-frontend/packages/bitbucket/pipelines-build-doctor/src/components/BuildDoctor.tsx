import React, { useCallback, useEffect, useState } from 'react';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { CustomThemeButton } from '@atlaskit/button';
import BulbIcon from '@atlaskit/icon/glyph/lightbulb-filled';
import InlineDialog from '@atlaskit/inline-dialog';
import DeprecatedThemeProvider from '@atlaskit/theme/deprecated-provider-please-do-not-use';
import { Diagnosis } from '@atlassian/pipelines-models';

import customButtonTheme from '../utils/customButtonTheme';
import getDiagnoses from '../utils/getDiagnoses';
import logMatches from '../utils/logMatches';

import DiagnosisDialog from './DiagnosisDialog';
import { HighlightButton } from './styled';

type Props = {
  logLines: string[];
  defaultDiagnosis?: Diagnosis;
};

const BuildDoctor: React.FC<Props> = ({ logLines, defaultDiagnosis }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | undefined>(
    defaultDiagnosis,
  );

  const toggleDialog = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  useEffect(() => {
    if (diagnosis) {
      return;
    }
    setIsLoading(true);
    getDiagnoses()
      .then((diagnoses: Diagnosis[]) => {
        setIsLoading(false);
        diagnoses?.some((d) => {
          if (logMatches(logLines.join(' '), d.logMatches)) {
            setDiagnosis(d);
            return true;
          }
        });
      })
      .catch(() => setIsLoading(false));
  }, [diagnosis, logLines]);

  return (
    <DeprecatedThemeProvider mode={'dark'} provider={StyledThemeProvider}>
      <InlineDialog
        onClose={() => setIsOpen(false)}
        content={<DiagnosisDialog diagnosis={diagnosis} />}
        isOpen={isOpen}
        placement="top-end"
      >
        <CustomThemeButton
          appearance="subtle"
          onClick={toggleDialog}
          iconBefore={<BulbIcon label="build doctor" size="medium" />}
          isLoading={isLoading}
          isSelected={isOpen}
          theme={diagnosis ? customButtonTheme(HighlightButton) : undefined}
        />
      </InlineDialog>
    </DeprecatedThemeProvider>
  );
};

export default React.memo(BuildDoctor);
