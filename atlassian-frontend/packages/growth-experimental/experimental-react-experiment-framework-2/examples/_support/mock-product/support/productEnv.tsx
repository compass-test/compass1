import React from 'react';

type HostAnalyticsEvent = {
  type: 'ui' | 'track' | 'operational';
  action: string;
  actionSubject: string;
  actionSubjectId?: string;
  attributes?: { [attributeName: string]: any };
};

type HostAnalyticsScreenEvent = {
  type: 'screen';
  name: string;
  attributes?: { [attributeName: string]: any };
};

type HostAnalyticsEventType = HostAnalyticsEvent | HostAnalyticsScreenEvent;

export interface ProductEnv {
  locale: string;
  flags: { [key: string]: string | boolean };
  analyticsClient: {
    fireEvent: (event: HostAnalyticsEventType) => void;
    clear: () => void;
  };
  readonly analyticEventsLog: HostAnalyticsEventType[];
  featureFlag: {
    getFlag: (
      flagName: string,
      variants: Array<string | boolean>,
      defaultValue: string | boolean,
    ) => string | boolean;
  };
}

const defaults: ProductEnv = {
  locale: 'en-AU',
  flags: {},
  featureFlag: {
    getFlag: () => false,
  },
  analyticsClient: {
    fireEvent: (event: HostAnalyticsEventType) => {},
    clear: () => {},
  },
  analyticEventsLog: [],
};
export const ProductEnvContext = React.createContext(defaults);

export interface ProductEnvProps extends Partial<ProductEnv> {}

export const ProductEnvConsumer = ProductEnvContext.Consumer;

export const useProductAnalytics = () =>
  React.useContext(ProductEnvContext).analyticsClient;

export const ProductEnvProvider: React.FC<ProductEnvProps> = (props) => {
  const [events, setEvents] = React.useState<HostAnalyticsEventType[]>([]);
  const analyticsClient: ProductEnv['analyticsClient'] = React.useMemo(
    () => ({
      fireEvent(event) {
        setEvents((events) => [...events, event]);
      },
      clear() {
        setEvents([]);
      },
    }),
    [],
  );

  const featureFlag: ProductEnv['featureFlag'] = {
    getFlag: (flagName, variants, defaultValue) => {
      if (!props.flags) {
        return defaultValue;
      }

      const value = props.flags[flagName];

      if (!variants.includes(value)) {
        // eslint-disable-next-line no-console
        console.error(
          `Received flag value is not in the list of variants, value=${value}, variants=${variants}`,
        );
      }
      return value;
    },
  };

  const { children, ...otherProps } = props;
  const context: ProductEnv = {
    ...defaults,
    analyticsClient,
    analyticEventsLog: events,
    featureFlag,
    ...otherProps,
  };

  return (
    <ProductEnvContext.Provider value={context}>
      {children}
    </ProductEnvContext.Provider>
  );
};

export const withAnalytics = <P,>(
  ComponentToWrap: React.FC<
    P & Pick<ProductEnv, 'analyticsClient' | 'analyticEventsLog'>
  >,
): React.FC<P> => (props) => (
  <ProductEnvConsumer>
    {(hostEnv) => (
      <ComponentToWrap
        {...(props as P)}
        analyticsClient={hostEnv.analyticsClient}
        analyticEventsLog={hostEnv.analyticEventsLog}
      />
    )}
  </ProductEnvConsumer>
);
