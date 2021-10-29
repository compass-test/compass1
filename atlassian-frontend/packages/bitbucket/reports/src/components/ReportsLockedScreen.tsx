import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { InjectedIntlProps, injectIntl } from 'react-intl';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next'; // eslint-disable-line import/no-extraneous-dependencies
import Button from '@atlaskit/button/custom-theme-button';
import PremiumIcon from '@atlaskit/icon/glyph/premium';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

import LockIllustration from './assets/LockIllustration';
import messages from './i18n';
import {
  ReportLockedWrapper,
  UpgradeCardButtons,
  UpgradeCardContent,
  UpgradeCardIcon,
  UpgradeCardWrapper,
} from './styled';

export const DOCS_CODE_INSIGHTS_URL =
  'https://confluence.atlassian.com/display/BITBUCKET/Code+insights';
export const ADMIN_PLANS_URL = '/account/admin/plans/';

export const ReportsLockedScreen = injectIntl(
  ({
    onUpgradeClick,
    onSeePlansClick,
    intl,
  }: {
    onUpgradeClick?: () => void;
    onSeePlansClick?: () => void;
  } & InjectedIntlProps &
    WithAnalyticsEventsProps) => {
    return (
      <ReportLockedWrapper>
        <LockIllustration />
        <h3>{intl.formatMessage(messages.lockedReportHeading)}</h3>
        <UpgradeCardWrapper>
          <UpgradeCardIcon>
            <PremiumIcon
              label={intl.formatMessage(messages.premiumResultIcon)}
              primaryColor={colors.B400}
              size="medium"
            />
          </UpgradeCardIcon>
          <UpgradeCardContent>
            <h3>{intl.formatMessage(messages.lockedReportUpgradeHeading)}</h3>
            <p>{intl.formatMessage(messages.lockedReportUpgradeMessage)}</p>
          </UpgradeCardContent>
          <UpgradeCardButtons>
            <Button
              appearance="subtle"
              href={DOCS_CODE_INSIGHTS_URL}
              target="_blank"
              rel="nofollow"
              onClick={() => {
                if (onUpgradeClick) {
                  onUpgradeClick();
                }
              }}
            >
              {intl.formatMessage(messages.learnMore)}
            </Button>
            <Button
              appearance="primary"
              href={ADMIN_PLANS_URL}
              onClick={() => {
                if (onSeePlansClick) {
                  onSeePlansClick();
                }
              }}
            >
              {intl.formatMessage(messages.seePlans)}
            </Button>
          </UpgradeCardButtons>
        </UpgradeCardWrapper>
      </ReportLockedWrapper>
    );
  },
);

export { ReportsLockedScreen as ReportLockedWithoutAnalyticsScreen };
const createAndFireEventOnBitbucket = createAndFireEvent('bitbucket');

export default withAnalyticsContext({
  attributes: {
    componentName: 'reports',
    packageName,
    packageVersion,
  },
})(
  withAnalyticsEvents({
    onUpgradeClick: createAndFireEventOnBitbucket({
      action: 'clicked',
      actionSubject: 'button',
      actionSubjectId: 'upgradeLearnMoreButton',
    }),
    onSeePlansClick: createAndFireEventOnBitbucket({
      action: 'clicked',
      actionSubject: 'button',
      actionSubjectId: 'seePlansButton',
    }),
  })(ReportsLockedScreen),
);
