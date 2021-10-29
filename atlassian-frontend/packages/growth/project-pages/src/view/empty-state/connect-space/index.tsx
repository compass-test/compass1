import React, { useCallback } from 'react';
import { injectIntl } from 'react-intl';
import Button from '@atlaskit/button/custom-theme-button';
import EmptyState from '@atlaskit/empty-state';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';
import { Props, OwnProps, DispatchProps } from './types';
import messages from './messages';
import connectSpaceEmptyStateIcon from '../icons/file-cabinet.svg';
import mountTrackerFactory from '../../../common/analytics/mount-tracker-factory';
import { connectUIAnalytics } from '../../../common/analytics/util';
import TreeEmptyState from '../../../ui/project-pages-improvement/common/empty-page-tree';

const MountTracker = mountTrackerFactory('connectSpaceEmptyState');

const ConnectSpace = ({
  intl: { formatMessage },
  isGranularPagesExperiment,
  onConnectSpaceClick,
  showConnectSpaceDialog,
}: Props) => {
  const handleConfirmClick = useCallback(
    (_: any, analyticsEvent: UIAnalyticsEvent) => {
      onConnectSpaceClick(analyticsEvent);
      showConnectSpaceDialog();
    },
    [onConnectSpaceClick, showConnectSpaceDialog],
  );

  let headingMessage = messages.connectSpaceHeading;

  if (isGranularPagesExperiment) {
    headingMessage = messages.granularPagesConnectSpaceHeading;
  }

  const description = isGranularPagesExperiment
    ? undefined
    : formatMessage(messages.connectSpaceDescription);

  const connectSpaceButtonMessage = isGranularPagesExperiment
    ? messages.granularPagesConnectSpaceButton
    : messages.connectSpaceButton;

  return (
    <div>
      <TreeEmptyState />
      <EmptyState
        size="wide"
        imageUrl={connectSpaceEmptyStateIcon}
        maxImageWidth={101}
        header={formatMessage(headingMessage)}
        description={description}
        primaryAction={
          <Button onClick={handleConfirmClick}>
            {formatMessage(connectSpaceButtonMessage)}
          </Button>
        }
      />
      <MountTracker />
    </div>
  );
};

export default connectUIAnalytics<OwnProps & DispatchProps>({
  onConnectSpaceClick: 'connectSpace',
})(injectIntl(ConnectSpace));
