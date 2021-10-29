import BaseUnknownError from '../../project-pages-improvement/common/base-unknown-error';
import React, { FunctionComponent } from 'react';
import { AnalyticsSource, ScreenTypes } from '../../../common/analytics/util';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import ViewTracker from '../../../common/analytics/view-tracker';
import messages from './messages';

const UnknownError: FunctionComponent<InjectedIntlProps> = () => {
  return (
    <>
      <BaseUnknownError messages={messages} />
      <ViewTracker />
    </>
  );
};

export default AnalyticsSource<{}>(
  'projectPagesUnknownError',
  ScreenTypes.SCREEN,
)(injectIntl(UnknownError));
