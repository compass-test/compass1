import React, { FunctionComponent } from 'react';
import paperAeroplane from '../assets/paper-aeroplane.svg';
import EmptyState from '@atlaskit/empty-state';
import messages from '../messages';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import ViewTracker from '../../../common/analytics/view-tracker';
import { AnalyticsSource, ScreenTypes } from '../../../common/analytics/util';

const PendingRequest: FunctionComponent<InjectedIntlProps> = ({
  intl: { formatMessage },
}) => {
  return (
    <>
      <EmptyState
        imageUrl={paperAeroplane}
        imageHeight={95}
        imageWidth={124}
        header={formatMessage(messages.requestAccessPendingRequestTitle)}
        description={formatMessage(
          messages.requestAccessPendingRequestSubtitle,
        )}
      />
      <ViewTracker />
    </>
  );
};

export default AnalyticsSource<{}>(
  'projectPagesPendingRequest',
  ScreenTypes.SCREEN,
)(injectIntl(PendingRequest));
