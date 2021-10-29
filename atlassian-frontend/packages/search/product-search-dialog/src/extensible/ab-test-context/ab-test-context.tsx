import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  SearchDialogAnalyticsContext,
  useAnalytics,
} from '../../common/analytics';
import { ABTest } from '../../common/clients';
import { onExperimentLoaded } from '../../common/analytics/events';
import {
  GenericAggregatorClient,
  PLACEHOLDER_EXPERIENCE,
  useAggregatorClient,
} from '../aggregator-client-context';
import { useProductContext } from '../product-router/product-router';

export const DEFAULT_AB_TEST: ABTest = {
  abTestId: 'default',
  controlId: 'default',
  experimentId: 'default',
};

export interface ABTestContext {
  abTest: ABTest | null;
}

const ABTestContext = React.createContext<ABTestContext>({
  abTest: null,
});

interface Props {
  isMultiProduct?: boolean;
}

interface ContextProps {
  searchClient?: GenericAggregatorClient;
  scope?: string;
}

const ABTestContextProviderStateless: FunctionComponent<
  Props & ContextProps
> = ({ isMultiProduct, searchClient, scope, children }) => {
  const [abTest, setAbTest] = useState<ABTest | null>(null);

  const { fireAnalyticsEvent } = useAnalytics();

  useEffect(() => {
    const now = Date.now();

    if (!searchClient || !scope || !(abTest === null)) {
      return;
    }

    searchClient
      // TODO: Remove PLACEHOLDER_EXPERIENCE
      .getAbTestData(scope, PLACEHOLDER_EXPERIENCE)
      .then((abTestResponse: ABTest | null) => {
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
  }, [searchClient, fireAnalyticsEvent, isMultiProduct, scope, abTest]);

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
  const { getPrimaryProduct } = useProductContext();
  const searchClient = useAggregatorClient();

  const { sectionIds } = getPrimaryProduct() || {};
  const scope = useMemo(
    () => (sectionIds && sectionIds.length > 0 ? sectionIds[0] : undefined),
    [sectionIds],
  );

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

export const withABTestContext = <Props,>(
  WrappedComponent: React.ComponentType<Props & ABTestContext>,
): React.ComponentType<Props> => {
  return (props: Props) => (
    <WrappedComponent {...props} {...useContext(ABTestContext)} />
  );
};
