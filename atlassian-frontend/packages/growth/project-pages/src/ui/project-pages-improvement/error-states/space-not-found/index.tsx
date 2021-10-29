import React, { MouseEvent } from 'react';
import EmptyState from '@atlaskit/empty-state';
import Button from '@atlaskit/button';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { injectIntl } from 'react-intl';
import messages from './messages';
import { Props, DispatchProps } from './types';
import { connectUIAnalytics } from '../../../../common/analytics/util';
import errorImage from '../../../../view/empty-state/icons/error.svg';
import EmptyPageTree from '../../common/empty-page-tree';
import mountTrackerFactory from '../../../../common/analytics/mount-tracker-factory';

const MountTracker = mountTrackerFactory('SpaceNotFound');

const SpaceNotFound = ({
  intl: { formatMessage },
  showConnectSpaceDialog,
  onClick,
}: Props) => {
  const handleClick = (_: MouseEvent, analyticsEvent: UIAnalyticsEvent) => {
    onClick(analyticsEvent);
    showConnectSpaceDialog();
  };
  return (
    <>
      {/* TODO EMBED-110 remove EmptyPageTree */}
      <EmptyPageTree />
      <EmptyState
        imageUrl={errorImage}
        imageWidth={71}
        header={formatMessage(messages.title)}
        description={formatMessage(messages.description)}
        primaryAction={
          <Button appearance="default" onClick={handleClick}>
            {formatMessage(messages.connectSpaceButton)}
          </Button>
        }
      />
      <MountTracker />
    </>
  );
};

export default connectUIAnalytics<DispatchProps>({
  onClick: 'spaceNotFoundCreate',
})(injectIntl(SpaceNotFound));
