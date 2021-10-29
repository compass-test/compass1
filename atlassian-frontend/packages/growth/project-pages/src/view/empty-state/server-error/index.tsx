import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import EmptyState from '@atlaskit/empty-state';
import { Props } from './types';
import messages from './messages';
import pagesEmptyStateIcon from '../icons/error.svg';
import mountTrackerFactory from '../../../common/analytics/mount-tracker-factory';
import TreeEmptyState from '../../../ui/project-pages-improvement/common/empty-page-tree';
import ContactSupport from '../../../ui/project-pages-improvement/common/contact-support';
import CrossJoin from '../../../ui/cross-join/connected';

const MountTracker = mountTrackerFactory('serverErrorEmptySpace');

const ServerError = ({ type = 'server', intl: { formatMessage } }: Props) => {
  if (type === 'access') {
    return (
      <>
        <CrossJoin />
        <MountTracker type={type} />
      </>
    );
  }
  return (
    <>
      <TreeEmptyState />
      <EmptyState
        size="wide"
        imageUrl={pagesEmptyStateIcon}
        maxImageWidth={82}
        header={formatMessage(messages.heading)}
        description={
          <FormattedMessage
            {...messages.description}
            values={{
              contactSupport: <ContactSupport />,
            }}
          />
        }
      />
      <MountTracker type={type} />
    </>
  );
};

export default injectIntl(ServerError);
