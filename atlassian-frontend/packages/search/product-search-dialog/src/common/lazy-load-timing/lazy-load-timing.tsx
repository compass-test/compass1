import React, { useEffect } from 'react';
import { useAnalytics } from '../../common/analytics';
import { onPaneLoadComplete } from '../../common/analytics/events';

export const TimeLazyLoad: React.FunctionComponent<{ product: string }> = ({
  children,
  product,
}) => {
  const { fireAnalyticsEvent } = useAnalytics();

  useEffect(() => {
    const start = Date.now();

    return () => {
      fireAnalyticsEvent(onPaneLoadComplete(product, Date.now() - start));
    };
  }, [fireAnalyticsEvent, product]);

  return <>{children}</>;
};
