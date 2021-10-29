import React, { useContext, FunctionComponent } from 'react';
import { useJiraCurrentUser, useJiraSearchClientContext } from '../clients';

export interface JiraFeatures {
  hasSoftwareAccess: boolean;
  hasAdvancedRoadmapsAccess?: boolean;
  isMultiSite?: boolean;
}

export const DefaultFeatures: JiraFeatures = Object.freeze({
  hasSoftwareAccess: false,
  hasAdvancedRoadmapsAccess: false,
  isMultiSite: false,
});

const JiraFeatureContext = React.createContext<JiraFeatures>(DefaultFeatures);

interface WithFeaturesProps {
  features: JiraFeatures;
}

export const withJiraFeatures = <T extends WithFeaturesProps>(
  Component: React.ComponentType<T>,
) => {
  return (props: Omit<T, 'features'>) => (
    <JiraFeatureContext.Consumer>
      {(features) => {
        const composedProps = {
          ...props,
          features,
        } as T;

        return <Component {...composedProps} />;
      }}
    </JiraFeatureContext.Consumer>
  );
};

export type JiraFeaturesOverrides = Partial<JiraFeatures>;
interface JiraFeaturesProviderProps {
  features?: JiraFeaturesOverrides;
}

export const JiraFeaturesProvider: FunctionComponent<JiraFeaturesProviderProps> = ({
  features,
  children,
}) => {
  const { sites = [] } = useJiraSearchClientContext();
  const { hasSoftwareAccess } = useJiraCurrentUser();

  const value = {
    ...DefaultFeatures,
    ...features,
    ...{ isMultiSite: sites.length > 1 },
    hasSoftwareAccess:
      features?.hasSoftwareAccess || hasSoftwareAccess || false,
    hasAdvancedRoadmapsAccess: features?.hasAdvancedRoadmapsAccess,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoedValue = React.useMemo(() => value, [...Object.values(value)]);

  return (
    <JiraFeatureContext.Provider value={memoedValue}>
      {children}
    </JiraFeatureContext.Provider>
  );
};

export const useFeatures = (): JiraFeatures => {
  return useContext(JiraFeatureContext);
};
