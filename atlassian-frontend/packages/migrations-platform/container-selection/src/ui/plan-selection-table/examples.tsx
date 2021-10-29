import React, { FC, useCallback, useState } from 'react';

import { IntlProvider } from 'react-intl';

import {
  AdvancedRoadmapsPlan,
  PlansQuery,
  PlansResult,
} from '../../common/types';

import { default as PlanSelectionTable } from './index';

export const PlanSelectionTableBase: FC<{
  selectedPlans: AdvancedRoadmapsPlan[];
  plansProvider: (query: PlansQuery) => Promise<PlansResult>;
  onSelectedPlansChanged: (newSelection: AdvancedRoadmapsPlan[]) => void;
}> = ({ selectedPlans, plansProvider, onSelectedPlansChanged }) => {
  const [selection, setSelection] = useState(selectedPlans);

  const handleSelectedPlansChanged = useCallback(
    (newSelection: AdvancedRoadmapsPlan[]) => {
      setSelection(newSelection);
      onSelectedPlansChanged(newSelection);
    },
    [onSelectedPlansChanged],
  );

  return (
    <IntlProvider locale="en">
      <PlanSelectionTable
        plansProvider={plansProvider}
        selectedPlans={selection}
        onSelectedPlansChanged={handleSelectedPlansChanged}
        onTotalCountChanged={() => {}}
      />
    </IntlProvider>
  );
};
