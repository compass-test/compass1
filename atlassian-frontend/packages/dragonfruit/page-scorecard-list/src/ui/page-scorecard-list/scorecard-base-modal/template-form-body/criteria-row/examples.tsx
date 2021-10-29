import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { AvailableFieldsProvider } from '../../../../../controllers/available-fields';
import { useCriteriaController } from '../../../../../controllers/criteria-controller';
import { mockExistingCriteriaList } from '../../../../../controllers/criteria-controller/mocks';

import CriteriaRow from './main';

export const DefaultCriteriaRow = () => {
  const [, { removeCriteria }] = useCriteriaController(
    mockExistingCriteriaList,
  );
  return (
    <AvailableFieldsProvider>
      <CompassTestProvider>
        <CriteriaRow
          id="fakeid123"
          weight="66"
          field="PROJECT"
          onChange={(value) => value}
          onDelete={removeCriteria}
        />
      </CompassTestProvider>
    </AvailableFieldsProvider>
  );
};
