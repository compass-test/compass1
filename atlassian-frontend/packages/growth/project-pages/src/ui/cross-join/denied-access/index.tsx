import React, { FunctionComponent } from 'react';
import lockRed from '../assets/lock-red.svg';
import EmptyState from '@atlaskit/empty-state';
import messages from '../messages';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import ViewTracker from '../../../common/analytics/view-tracker';
import { AnalyticsSource, ScreenTypes } from '../../../common/analytics/util';

const DeniedAccess: FunctionComponent<InjectedIntlProps> = ({
  intl: { formatMessage },
}) => {
  return (
    <>
      <EmptyState
        imageUrl={lockRed}
        imageHeight={126}
        imageWidth={96}
        header={formatMessage(messages.requestDeniedAccessRequestTitle)}
        description={formatMessage(messages.requestDeniedAccessRequestSubtitle)}
      />
      <ViewTracker />
    </>
  );
};

export default AnalyticsSource<{}>(
  'projectPagesAccessDenied',
  ScreenTypes.SCREEN,
)(injectIntl(DeniedAccess));
