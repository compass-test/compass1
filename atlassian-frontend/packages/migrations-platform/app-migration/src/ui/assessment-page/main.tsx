import React, { FC, ReactNode } from 'react';

import { AnalyticsScreen } from '@atlassian/mpt-analytics';
import { AnalyticsButton } from '@atlassian/mpt-elements';
import FocusPage from '@atlassian/mpt-focus-page';

import type { AssessmentApp } from '../../common/types';
import AssessmentTable, { Status } from '../../common/ui/app-assessment-table';
import ProgressStatus from '../../common/ui/progress-status';

import DownloadCsvButton from './download-csv-button';
import { FooterText, Wrapper } from './styled';
import { reduceAppsToAssessmentProgress } from './utils';

export type Props = {
  apps: AssessmentApp[];
  onClose: () => void;
  onContinue: () => void;
  onMigrationNotesChange: (appKey: string, value: string) => Promise<void>;
  onMigrationStatusChange: (appKey: string, value: Status) => Promise<void>;
  onHome?: () => void;
  automatedPathUrlForNonEap?: string;
  reliabilityAppUrl?: string;
  bannerAppearance?: 'warning' | 'error' | 'announcement';
  bannerMessage?: string | ReactNode;
  headerButtons?: ReactNode | ReactNode[];
  isLoading?: boolean;
  isUsageLoading?: boolean;
  progress?: ReactNode | ReactNode[];
  shouldShowUsage?: boolean;
};

const AppsAssessmentPage: FC<Props> = ({
  apps,
  onClose,
  onContinue,
  onMigrationNotesChange,
  onMigrationStatusChange,
  onHome,
  automatedPathUrlForNonEap,
  reliabilityAppUrl,
  bannerAppearance = 'announcement',
  bannerMessage,
  headerButtons,
  isLoading,
  isUsageLoading,
  progress,
  shouldShowUsage,
}) => {
  const { done, total } = reduceAppsToAssessmentProgress(apps);
  const hasAlternativeAppsBeenSelected =
    apps.filter((app) => {
      return app.migrationStatus === 'Alternative';
    }).length > 0;
  const isAppAssessmentComplete = done === total;
  const isButtonDisabled =
    isLoading || (!isAppAssessmentComplete && !hasAlternativeAppsBeenSelected);

  return (
    <AnalyticsScreen name="AppAssessment">
      <FocusPage
        title="Assess your apps"
        width="xlarge"
        progress={progress}
        headerButtons={headerButtons}
        bannerMessage={bannerMessage}
        bannerAppearance={bannerAppearance}
        onClose={onClose}
        subtitle={
          <span>
            The statuses you assign in this table guide your app migration. The
            Use Alternative status allows you to continue through the flow to
            select alternative apps to install.
          </span>
        }
        footer={
          <ProgressStatus
            done={done}
            total={total}
            label="apps assessed"
            title="Progress made through the assessment"
            isLoading={isLoading}
            loadingLabel="Loading your assessed apps"
          />
        }
        footerButtons={
          <>
            <FooterText>Last saved just now</FooterText>
            <DownloadCsvButton
              apps={apps}
              isLoading={isLoading}
              shouldShowUsage={shouldShowUsage}
            />
            <AnalyticsButton
              appearance={
                hasAlternativeAppsBeenSelected ? undefined : 'primary'
              }
              isDisabled={isButtonDisabled}
              onClick={onContinue}
              analyticsId={
                hasAlternativeAppsBeenSelected ? 'nextButton' : 'doneButton'
              }
            >
              {hasAlternativeAppsBeenSelected ? 'Next' : 'Done'}
            </AnalyticsButton>
          </>
        }
      >
        <Wrapper>
          <AssessmentTable
            apps={apps}
            automatedPathUrlForNonEap={automatedPathUrlForNonEap}
            reliabilityAppUrl={reliabilityAppUrl}
            isLoading={isLoading}
            isUsageLoading={isUsageLoading}
            onHome={onHome}
            onMigrationNotesChange={onMigrationNotesChange}
            onMigrationStatusChange={onMigrationStatusChange}
            shouldShowUsage={shouldShowUsage}
          />
        </Wrapper>
      </FocusPage>
    </AnalyticsScreen>
  );
};

export default AppsAssessmentPage;
