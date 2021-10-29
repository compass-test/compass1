import React, { FunctionComponent } from 'react';
import {
  DEFAULT_GAS_CHANNEL,
  NonPrivacySafeContext,
  FiltersAnalyticsContext,
} from '../events';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { SupportedContext } from '../../../common/analytics';

interface SearchDialogAnalyticContextProps {
  /**
   * Either a map of additional attributes or a callback that returns a map of additional attributes.
   * This is called whenever a relevant event is fired. Adds the additional attributes or the output of the callback to the attributes of the event
   */
  analyticContext: SupportedContext | (() => SupportedContext);
  nonPrivacySafeAnalyticContext?: NonPrivacySafeContext | {};
  nonPrivacySafeAnalyticContextGenerator?: () => NonPrivacySafeContext | {};
  filterAnalyticsContext?: FiltersAnalyticsContext | {};
}

export const SearchDialogAnalyticsContext: FunctionComponent<SearchDialogAnalyticContextProps> = ({
  analyticContext,
  nonPrivacySafeAnalyticContext = {},
  filterAnalyticsContext = {},
  nonPrivacySafeAnalyticContextGenerator,
  children,
}) => {
  return (
    <AnalyticsListener
      channel={DEFAULT_GAS_CHANNEL}
      onEvent={(event) => {
        const additionalAttributes: SupportedContext =
          typeof analyticContext === 'function'
            ? analyticContext()
            : analyticContext;

        const nonPrivacySafeAttributes: NonPrivacySafeContext | {} =
          nonPrivacySafeAnalyticContextGenerator !== undefined
            ? nonPrivacySafeAnalyticContextGenerator()
            : nonPrivacySafeAnalyticContext;

        event.update((payload) => {
          const filters = {
            ...payload.attributes?.filters,
            ...filterAnalyticsContext,
          };
          return {
            ...payload,
            attributes: {
              ...payload.attributes,
              ...additionalAttributes,
              filters: Object.keys(filters).length > 0 ? filters : undefined,
            },
            nonPrivacySafeAttributes: {
              ...payload?.nonPrivacySafeAttributes,
              ...nonPrivacySafeAttributes,
            },
          };
        });
      }}
    >
      {children}
    </AnalyticsListener>
  );
};
