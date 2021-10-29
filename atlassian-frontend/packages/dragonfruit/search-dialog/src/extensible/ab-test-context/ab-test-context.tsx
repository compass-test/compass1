import React, {
  useContext,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';
import {
  SearchDialogAnalyticsContext,
  useAnalytics,
} from '../../common/analytics';
import { ABTest, SharedClient } from '../../common/clients';
import { onExperimentLoaded } from '../../common/analytics/events';
import { Scope } from '../../search-client';

export const DEFAULT_AB_TEST: ABTest = {
  abTestId: 'default',
  controlId: 'default',
  experimentId: 'default',
};

interface ABTestContext {
  abTest: ABTest | null;
}

const ABTestContext = React.createContext<ABTestContext>({
  abTest: null,
});

interface Props {
  isMultiProduct?: boolean;
}

interface ContextProps {
  searchClient: SharedClient; // TODO: change this to generic client signature.
  scope: Scope;
}

const ABTestContextProviderStateless: FunctionComponent<
  Props & ContextProps
> = ({ isMultiProduct, searchClient, scope, children }) => {
  const [abTest, setAbTest] = useState<ABTest | null>(null);

  const { fireAnalyticsEvent } = useAnalytics();

  useEffect(() => {
    const now = Date.now();

    searchClient
      .getAbTestData() // TODO: change this to the method of genericClient which accepts the scope
      .then((abTestResponse) => {
        const duration = Date.now() - now;
        const abTestWithDefault = abTestResponse || DEFAULT_AB_TEST;
        setAbTest(abTestWithDefault);
        fireAnalyticsEvent(
          onExperimentLoaded(abTestWithDefault, duration, !!isMultiProduct),
        );
      })
      .catch((e) => {
        setAbTest(DEFAULT_AB_TEST);
      });
  }, [searchClient, fireAnalyticsEvent, isMultiProduct]);

  return (
    <ABTestContext.Provider value={{ abTest }}>
      <SearchDialogAnalyticsContext
        analyticContext={{ abTest: abTest || undefined }}
        nonPrivacySafeAnalyticContext={{}}
      >
        {children}
      </SearchDialogAnalyticsContext>
    </ABTestContext.Provider>
  );
};

export const ABTestContextProvider: FunctionComponent<Props> = (
  props: Props,
) => {
  // TODO: change this to consume primary product scope from product router
  // when generic client is added.
  const scope = Scope.ConfluencePageBlog;

  // TODO: Change this to generic client from the generic client context
  const searchClient = {
    getAbTestData: (): Promise<ABTest | null> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(DEFAULT_AB_TEST), 3000);
      });
    },
    getProductPermissions: null as any,
  };

  return (
    <ABTestContextProviderStateless
      {...props}
      scope={scope}
      searchClient={searchClient}
    />
  );
};

export const useABTest = () => {
  const { abTest } = useContext(ABTestContext);
  return abTest;
};
