import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import EmptyState from '@atlaskit/empty-state';
import React, { useMemo } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import messages from '../messages';
import { getJoinProductUrl } from '../utils';
import OriginTracing from '@atlassiansox/origin-tracing';
import ViewTracker from '../../../common/analytics/view-tracker';
import { AnalyticsSource, ScreenTypes } from '../../../common/analytics/util';

interface OwnProps {
  isConnected: boolean;
  onClick: (e: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => void;
  origin: OriginTracing | null;
  renderHeroImage: () => React.ReactNode;
  projectKey: string;
  projectName: string;
  cloudId: string;
  accountId: string;
}

const JoinProduct = ({
  intl: { formatMessage },
  isConnected,
  onClick,
  origin,
  renderHeroImage,
  projectKey,
  projectName,
  accountId,
  cloudId,
}: OwnProps & InjectedIntlProps) => {
  const joinProductUrl = useMemo(
    () =>
      getJoinProductUrl({
        projectKey,
        projectName,
        origin,
        accountId,
        cloudId,
      }),
    [projectKey, projectName, origin, accountId, cloudId],
  );
  return (
    <>
      <EmptyState
        renderImage={renderHeroImage}
        header={formatMessage(
          isConnected
            ? messages.joinProductConnectedTitle
            : messages.joinProductNotConnectedTitle,
        )}
        description={formatMessage(
          isConnected
            ? messages.joinProductConnectedDescription
            : messages.joinProductNotConnectedDescription,
        )}
        primaryAction={
          <Button
            appearance="primary"
            href={joinProductUrl}
            target="_blank"
            onClick={onClick}
          >
            {formatMessage(messages.joinProductButton)}
          </Button>
        }
      />
      <ViewTracker />
    </>
  );
};

export default AnalyticsSource<OwnProps>(
  'projectPagesJoin',
  ScreenTypes.SCREEN,
)(injectIntl(JoinProduct));
