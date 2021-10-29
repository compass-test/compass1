/* this is a copy of ../project-pages-improvement/empty-state for embedded pages purposes */
import React, { useCallback } from 'react';
import AkEmptyState from '@atlaskit/empty-state';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import messages from './messages';
import emptyImage from '../../view/empty-state/icons/pencil-and-paper.svg';
import Button from '@atlaskit/button';
import { StateProps } from './types';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { connectUIAnalytics } from '../../common/analytics/util';
import { useCreateEmbeddedPage } from '../../controllers/embedded-page/utils';

export interface AnalyticProps {
  onCreatePageClick: (analyticsEvent: UIAnalyticsEvent) => void;
}

const EmptyState = ({
  intl: { formatMessage },
  spaceKey,
  contentId,
  onCreatePageClick,
}: InjectedIntlProps & AnalyticProps & StateProps) => {
  const createChildPage = useCreateEmbeddedPage(spaceKey);
  const handleClick = useCallback(
    async (_: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => {
      onCreatePageClick(analyticsEvent);
      await createChildPage(contentId || undefined, true);
    },
    [contentId, createChildPage, onCreatePageClick],
  );
  return (
    <AkEmptyState
      imageUrl={emptyImage}
      imageWidth={78}
      header={formatMessage(messages.title)}
      description={formatMessage(messages.description)}
      primaryAction={
        <Button appearance="default" onClick={handleClick}>
          {formatMessage(messages.createPageButton)}
        </Button>
      }
    />
  );
};

// TODO analytics
export default connectUIAnalytics<StateProps>({
  onCreatePageClick: 'confluencePageTreeEmptyStateCreate',
})(injectIntl(EmptyState));
