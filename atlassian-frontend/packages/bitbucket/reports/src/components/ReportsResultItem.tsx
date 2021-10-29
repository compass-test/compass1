import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { InjectedIntlProps, injectIntl } from 'react-intl';

import PassedStatusIcon from '@atlaskit/icon/glyph/check-circle';
import FailedStatusIcon from '@atlaskit/icon/glyph/jira/failed-build-status';
import PremiumIcon from '@atlaskit/icon/glyph/premium';
import PendingStatusIcon from '@atlaskit/icon/glyph/recent';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

import { Report, ReportResult } from '../types';

import messages from './i18n';
import { CardItemTitle, CardItemWrapper, UnknownIcon } from './styled';

type Props = {
  codeInsightsReport: Report;
  openDialogWithSelectedReport: () => void;
  isActive?: boolean;
  isModalView?: boolean;
};

export const ResultIcon = injectIntl(
  ({ report, intl }: { report: Report } & InjectedIntlProps) => {
    if (report.is_locked) {
      return (
        <PremiumIcon
          label={intl.formatMessage(messages.premiumResultIcon)}
          primaryColor={colors.B400}
          size="medium"
        />
      );
    }

    if (report.result === ReportResult.Passed) {
      return (
        <PassedStatusIcon
          label={intl.formatMessage(messages.passedResultIcon)}
          primaryColor={colors.G300}
          size="medium"
        />
      );
    }

    if (report.result === ReportResult.Failed) {
      return (
        <FailedStatusIcon
          label={intl.formatMessage(messages.failedResultIcon)}
          primaryColor={colors.R400}
          size="medium"
        />
      );
    }

    if (report.result === ReportResult.Pending) {
      return (
        <PendingStatusIcon
          label={intl.formatMessage(messages.pendingResultIcon)}
          primaryColor={colors.B300}
          size="medium"
        />
      );
    }

    return (
      <UnknownIcon title={intl.formatMessage(messages.unknownResultIcon)} />
    );
  },
);

const ReportsResultItem: React.FC<Props> = ({
  openDialogWithSelectedReport,
  codeInsightsReport,
  isActive,
  isModalView,
}) => {
  return (
    <CardItemWrapper
      onClick={openDialogWithSelectedReport}
      isModalView={isModalView}
      isActive={isActive}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          openDialogWithSelectedReport();
        }
      }}
    >
      {!isModalView && <ResultIcon report={codeInsightsReport} />}
      <CardItemTitle>{codeInsightsReport.title}</CardItemTitle>
      {isModalView && <ResultIcon report={codeInsightsReport} />}
    </CardItemWrapper>
  );
};

export default ReportsResultItem;
