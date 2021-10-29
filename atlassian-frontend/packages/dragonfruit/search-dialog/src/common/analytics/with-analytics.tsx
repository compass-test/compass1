import React from 'react';
import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import {
  DEFAULT_GAS_CHANNEL,
  LimitedGasPayload,
  LimitedGasScreenEventPayload,
} from './events';

type Callback = (
  ...args: any[]
) => LimitedGasPayload | LimitedGasScreenEventPayload;

export function withAnalytics<T extends Record<string, Callback>>(
  analytics: T,
) {
  type AnalyticsType = typeof analytics;

  return <U extends {}>(Component: React.ComponentType<U & AnalyticsType>) => {
    type WrapperComponentProps = Omit<U, keyof AnalyticsType> &
      WithAnalyticsEventsProps;

    class WrappedComponent extends React.Component<WrapperComponentProps> {
      wrappedAnalyticsCallback = Object.keys(analytics).reduce(
        (acc, key) => ({
          ...acc,
          // We forward all args to the corresponding callback regardless of type
          [key]: (...args: any[]) => {
            this.props.createAnalyticsEvent &&
              this.props
                .createAnalyticsEvent(analytics[key](...args))
                .fire(DEFAULT_GAS_CHANNEL);
          },
        }),
        {} as Record<string, (...args: any[]) => void>,
      );

      render() {
        const { createAnalyticsEvent, ...rest } = this.props;

        // There is NOT typesafety for the next line as typescript cannot infer types correctly with spread operators.
        // This is just going to have to go without type safety for the next line.
        return (
          <Component {...rest} {...(this.wrappedAnalyticsCallback as any)} />
        );
      }
    }

    return withAnalyticsEvents()(WrappedComponent);
  };
}
