import React, {
  ComponentType,
  ComponentProps,
  useCallback,
  useMemo,
} from 'react';

import { AnalyticsListener as AKAnalyticsListener } from '@atlaskit/analytics-next';

import { getAnalyticsWebClient } from './analyticsWebClient';
import type { PageCommonProps } from '../page-common';

export const ANALYTICS_CHANNEL = 'embeddedConfluence';

const AnalyticsListener: React.FC<{
  hostname?: PageCommonProps['hostname'];
  parentProduct: string;
}> = ({ children, hostname, parentProduct }) => {
  const analyticsClient = useMemo(() => getAnalyticsWebClient({ hostname }), [
    hostname,
  ]);

  const onEvent = useCallback<
    ComponentProps<typeof AKAnalyticsListener>['onEvent']
  >(
    ({ payload }) => {
      analyticsClient.onEvent(ANALYTICS_CHANNEL, {
        ...payload,
        attributes: {
          ...payload?.attributes,
          parentProduct,
        },
      });
    },
    [analyticsClient, parentProduct],
  );

  return (
    <AKAnalyticsListener channel={ANALYTICS_CHANNEL} onEvent={onEvent}>
      {children}
    </AKAnalyticsListener>
  );
};

export const withAnalyticsListener = <
  P extends PageCommonProps & {
    contentId: string;
    parentProduct: string;
  }
>(
  WrappedComponent: ComponentType<P>,
) => (props: P) => (
  <AnalyticsListener
    hostname={props.hostname}
    parentProduct={props.parentProduct}
  >
    <WrappedComponent {...props} />
  </AnalyticsListener>
);
