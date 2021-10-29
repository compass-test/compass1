import React, { useContext, FunctionComponent } from 'react';
import { useClients } from '../clients';

export const FILTERS_EXPERIMENT_ID = 'filters-experiment';

export type ConfluenceFeaturesOverrides = Partial<ConfluenceFeatures>;

export type CurrentSpaceInfo = {
  id: string;
  spaceKey: string;
  spaceName: string;
  iconUrl: string;
};

export interface ConfluenceFeatures {
  isMultiSite?: boolean;
  isSmartUserPickerFFEnabled?: boolean;
  currentSpace?: CurrentSpaceInfo;
}

export const DefaultFeatures: ConfluenceFeatures = Object.freeze({
  isMultiSite: false,
  isSmartUserPickerFFEnabled: false,
});

const ConfluenceFeatureContext = React.createContext<ConfluenceFeatures>(
  DefaultFeatures,
);

interface ConfluenceFeaturesProviderProps {
  features?: ConfluenceFeaturesOverrides;
}

export const ConfluenceFeaturesProvider: FunctionComponent<ConfluenceFeaturesProviderProps> = ({
  children,
  features: featuresOverride,
}) => {
  const { sites = [] } = useClients();
  const value = {
    ...DefaultFeatures,
    ...{ isMultiSite: sites.length > 1 },
    ...featuresOverride,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoedValue = React.useMemo(() => value, [...Object.values(value)]);

  return (
    <ConfluenceFeatureContext.Provider value={memoedValue}>
      {children}
    </ConfluenceFeatureContext.Provider>
  );
};

export const useFeatures = (): ConfluenceFeatures => {
  return useContext(ConfluenceFeatureContext);
};
