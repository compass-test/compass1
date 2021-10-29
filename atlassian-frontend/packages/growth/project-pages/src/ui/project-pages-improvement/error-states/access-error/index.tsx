import React from 'react';
import EmptyState from '@atlaskit/empty-state';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import messages from './messages';
import errorImage from '../../../../view/empty-state/icons/error.svg';
import mountTrackerFactory from '../../../../common/analytics/mount-tracker-factory';

const MountTracker = mountTrackerFactory('AccessError');

const AccessError = ({ intl: { formatMessage } }: InjectedIntlProps) => (
  <>
    <EmptyState
      imageUrl={errorImage}
      imageWidth={71}
      header={formatMessage(messages.title)}
      description={formatMessage(messages.description)}
    />
    <MountTracker />
  </>
);

export default injectIntl(AccessError);
