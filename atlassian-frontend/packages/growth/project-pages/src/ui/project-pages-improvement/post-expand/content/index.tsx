import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import React, { useCallback, useMemo } from 'react';
import { useFeatureFlags } from '../../../../controllers/feature-flags';
import PoweredByConfluence from '../../common/powered-by-confluence';
import { PostExpandContent, PostExpandFooter } from './styled';
import OriginTracing from '@atlassiansox/origin-tracing';
import { connectUIAnalytics } from '../../../../common/analytics/util';

interface OwnProps {
  isPostJoin: boolean;
  children: React.ReactNode;
}

interface AnalyticsProps {
  onPoweredByClick: (analyticsEvent: UIAnalyticsEvent) => void;
}

const Content = ({
  isPostJoin,
  onPoweredByClick,
  children,
}: OwnProps & AnalyticsProps) => {
  const { isProjectPagesProductionisation } = useFeatureFlags();
  const origin = useMemo(() => new OriginTracing({ product: 'jira' }), []);
  const handlePoweredByClick = useCallback(
    (_: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => {
      analyticsEvent.update(
        origin.toAnalyticsAttributes({
          hasGeneratedId: true,
        }),
      );
      onPoweredByClick(analyticsEvent);
    },
    [origin, onPoweredByClick],
  );
  if (!isProjectPagesProductionisation) {
    return <>{children}</>;
  }
  return (
    <>
      <PostExpandContent>{children}</PostExpandContent>
      {isPostJoin && (
        <PostExpandFooter>
          <PoweredByConfluence
            href={origin.addToUrl('/wiki')}
            onClick={handlePoweredByClick}
          />
        </PostExpandFooter>
      )}
    </>
  );
};

export default connectUIAnalytics<OwnProps>({
  onPoweredByClick: 'poweredByConfluence',
})(Content);
