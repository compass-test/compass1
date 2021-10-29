import React from 'react';
import AkEmptyState from '@atlaskit/empty-state';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import messages from './messages';
import emptyImage from '../../../view/empty-state/icons/pencil-and-paper.svg';
import Button from '@atlaskit/button';
import { DispatchProps, StateProps } from './types';
import EmptyPageTree from '../common/empty-page-tree';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { connectUIAnalytics } from '../../../common/analytics/util';

export interface AnalyticProps {
  onCreatePageClick: (analyticsEvent: UIAnalyticsEvent) => void;
}

const EmptyState = ({
  intl: { formatMessage },
  openTemplateSelectSideBar,
  onCreatePageClick,
  origin,
}: InjectedIntlProps & DispatchProps & AnalyticProps & StateProps) => {
  const handleClick = (
    _: React.MouseEvent,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    const orginAttributes = origin?.toAnalyticsAttributes({
      hasGeneratedId: true,
    });
    if (orginAttributes) {
      analyticsEvent.update(orginAttributes);
    }
    onCreatePageClick(analyticsEvent);
    openTemplateSelectSideBar();
  };
  return (
    <>
      {/* TODO EMBED-110 remove EmptyPageTree */}
      <EmptyPageTree />
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
    </>
  );
};

export default connectUIAnalytics<DispatchProps & StateProps>({
  onCreatePageClick: 'confluencePageTreeEmptyStateCreate',
})(injectIntl(EmptyState));
