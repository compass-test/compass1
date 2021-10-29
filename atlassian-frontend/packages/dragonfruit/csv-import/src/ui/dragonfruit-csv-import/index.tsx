import React from 'react';

import { useRouterActions } from 'react-resource-router';

import { Content, Main } from '@atlaskit/page-layout';
import { FocusState, MainContainer } from '@atlassian/dragonfruit-common-ui';
import { routes } from '@atlassian/dragonfruit-routes';

import { CsvImportController } from '../../controllers/csv-import-controller';

import { ImportWizard } from './import-wizard';
import { DragonfruitCsvImportProps } from './types';

export default function DragonfruitCsvImport({
  testId,
}: DragonfruitCsvImportProps) {
  const { replace } = useRouterActions();

  return (
    <Content testId={testId}>
      <Main>
        <FocusState isOpen onClose={() => replace(routes.COMPONENTS())}>
          <MainContainer>
            <CsvImportController>
              <ImportWizard />
            </CsvImportController>
          </MainContainer>
        </FocusState>
      </Main>
    </Content>
  );
}
