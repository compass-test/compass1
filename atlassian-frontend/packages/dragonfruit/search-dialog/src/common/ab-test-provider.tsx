import React, {
  useContext,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';
import { ABTest, SharedClient } from './clients';
import { SearchDialogAnalyticsContext, useAnalytics } from './analytics';
import { onExperimentLoaded } from './analytics/events';
import { ProductSearchInputSkeleton } from './product-search-input-skeleton';

export const DEFAULT_AB_TEST: ABTest = {
  abTestId: 'default',
  controlId: 'default',
  experimentId: 'nav-v3',
};

const MISSING_PROVIDER_ERROR = new Error(
  'Experimentation data has not been initialised, please ensure that there is an ABTestContext.Provider available',
);
interface Props {
  searchClient: SharedClient;
  isMultiProduct?: boolean;
}

interface State {
  abTest: ABTest | null;
}

export const ABTestContext = React.createContext<State>({
  abTest: null,
});

export const ABTestProvider: FunctionComponent<Props> = ({
  searchClient,
  isMultiProduct,
  children,
}) => {
  const [abTest, setAbTest] = useState<ABTest | null>(null);
  const { fireAnalyticsEvent } = useAnalytics();

  useEffect(() => {
    const now = Date.now();

    searchClient
      .getAbTestData()
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

  if (!abTest) {
    return <ProductSearchInputSkeleton />;
  }

  return (
    <ABTestContext.Provider value={{ abTest }}>
      <SearchDialogAnalyticsContext
        analyticContext={{ abTest }}
        nonPrivacySafeAnalyticContext={{}}
      >
        {children}
      </SearchDialogAnalyticsContext>
    </ABTestContext.Provider>
  );
};

export const useABTest = () => {
  const { abTest } = useContext(ABTestContext);

  if (!abTest) {
    throw MISSING_PROVIDER_ERROR;
  }

  return abTest;
};
