import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import EmptyState from '@atlaskit/empty-state';
import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import messages from '../messages';
import { getRequestAccessUrl } from '../utils';
import OriginTracing from '@atlassiansox/origin-tracing';
import ViewTracker from '../../../common/analytics/view-tracker';
import { AnalyticsSource, ScreenTypes } from '../../../common/analytics/util';

interface OwnProps {
  isConnected: boolean;
  onClick: (e: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => void;
  origin: OriginTracing | null;
  cloudId: string;
  accountId: string;
  projectKey: string;
  renderHeroImage: () => React.ReactNode;
}

const RequestAccess = ({
  intl: { formatMessage },
  isConnected,
  onClick,
  origin,
  projectKey,
  renderHeroImage,
  cloudId,
  accountId,
}: OwnProps & InjectedIntlProps) => (
  <>
    <EmptyState
      renderImage={renderHeroImage}
      header={formatMessage(messages.requestAccessTitle)}
      description={formatMessage(
        isConnected
          ? messages.requestAccessConnectedDescription
          : messages.requestAccessNotConnectedDescription,
      )}
      primaryAction={
        <Button
          appearance="primary"
          href={getRequestAccessUrl({
            projectKey,
            origin,
            cloudId,
            accountId,
          })}
          target="_blank"
          onClick={onClick}
        >
          {formatMessage(messages.requestAccessButton)}
        </Button>
      }
    />
    <ViewTracker />
  </>
);

export default AnalyticsSource<OwnProps>(
  'projectPagesRequestAccess',
  ScreenTypes.SCREEN,
)(injectIntl(RequestAccess));
