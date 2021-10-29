import React from 'react';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import EmptyState from '@atlaskit/empty-state';
import messages from './messages';
import confluenceActivatingEmptyStateIcon from '../icons/gears.svg';
import mountTrackerFactory from '../../../common/analytics/mount-tracker-factory';
import TreeEmptyState from '../../../ui/project-pages-improvement/common/empty-page-tree';
import ContactSupport from '../../../ui/project-pages-improvement/common/contact-support';

export interface OwnProps {}

interface Props extends OwnProps, InjectedIntlProps {}

const MountTracker = mountTrackerFactory('confluenceActivatingEmptyState');
const ConfluenceActivating = ({ intl: { formatMessage } }: Props) => {
  return (
    <div>
      <TreeEmptyState />
      <EmptyState
        size="wide"
        imageUrl={confluenceActivatingEmptyStateIcon}
        maxImageWidth={82}
        header={formatMessage(messages.heading)}
        description={
          <FormattedMessage
            {...messages.description}
            values={{ contactSupport: <ContactSupport /> }}
          />
        }
      />
      <MountTracker />
    </div>
  );
};

export default injectIntl(ConfluenceActivating);
