import React, { FC, ReactNode, useMemo } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import Tooltip from '@atlaskit/tooltip';
import { AnalyticsScreen } from '@atlassian/mpt-analytics';
import { AnalyticsButton, ExternalLink } from '@atlassian/mpt-elements';
import FocusPage from '@atlassian/mpt-focus-page';

import sharedMessages from '../../common/messages';
import type { ConsentApp } from '../../common/types';
import AppConsentTable from '../../common/ui/app-consent-table';
import ProgressStatus from '../../common/ui/progress-status';
import useConsentAppsController from '../../controllers/use-consent-apps-controller';
import useConsentController from '../../controllers/use-consent-controller';

import ConsentModal from './consent-modal';
import messages from './messages';
import { Subtitle, Wrapper } from './styled';
export type Props = {
  apps: ConsentApp[];
  onClose: () => void;
  onConsent: (appKey: string, consentGiven: boolean) => void;
  onBack: () => void;
  onContinue: () => void;
  onNavigateToAssessment: () => void;
  headerButtons?: ReactNode | ReactNode[];
  progress?: ReactNode | ReactNode[];
  isLoading?: boolean;
  bannerMessage?: string | ReactNode;
  bannerAppearance?: 'warning' | 'error' | 'announcement';
  isAppAssessmentComplete: boolean;
};

const AppConsentPage: FC<InjectedIntlProps & Props> = ({
  apps,
  onClose,
  onConsent,
  onBack,
  onContinue,
  onNavigateToAssessment,
  isLoading = false,
  headerButtons,
  progress,
  intl,
  bannerMessage,
  bannerAppearance = 'announcement',
  isAppAssessmentComplete,
}) => {
  const { done, total, hasCompleted } = useConsentAppsController(apps);
  const [
    appKey,
    { grantConsent, revokeConsent, showConsentModal, hideConsentModal },
  ] = useConsentController(onConsent);

  // Resolving the selected app data needed to display in modal
  const app = useMemo<ConsentApp | undefined>(() => {
    return apps.find(({ key }) => {
      return appKey === key;
    });
  }, [apps, appKey]);

  const isDoneButtonDisabled =
    isLoading || !hasCompleted || !isAppAssessmentComplete;

  return (
    <AnalyticsScreen name="AppConsent">
      {app && (
        <ConsentModal
          {...app}
          testId="modalViewPolicy"
          appKey={app.key}
          onClose={hideConsentModal}
          onConsent={grantConsent}
        />
      )}
      <FocusPage
        width="xlarge"
        headerButtons={headerButtons}
        progress={progress}
        onClose={onClose}
        bannerMessage={bannerMessage}
        bannerAppearance={bannerAppearance}
        title={intl.formatMessage(messages.title)}
        subtitle={
          <Subtitle>
            <FormattedMessage
              {...messages.description}
              values={{
                link: (
                  <ExternalLink
                    analyticsId="appConsentScreenAppAssessment"
                    testId="buttonAssess"
                    onClick={onNavigateToAssessment}
                  >
                    <FormattedMessage {...messages.appAssessmentLink} />
                  </ExternalLink>
                ),
              }}
            />
          </Subtitle>
        }
        footer={
          <ProgressStatus
            done={done}
            total={total}
            isLoading={isLoading}
            label={intl.formatMessage(messages.progressStatusLabel)}
          />
        }
        footerButtons={
          <>
            <AnalyticsButton
              analyticsId="buttonCancel"
              testId="buttonCancel"
              onClick={onBack}
            >
              <FormattedMessage {...sharedMessages.back} />
            </AnalyticsButton>
            <Tooltip
              content={
                isDoneButtonDisabled
                  ? intl.formatMessage(messages.doneButtonDisabledText)
                  : ''
              }
            >
              <AnalyticsButton
                analyticsId="buttonConfirm"
                testId="buttonConfirm"
                onClick={onContinue}
                isDisabled={isDoneButtonDisabled}
                appearance="primary"
              >
                <FormattedMessage {...sharedMessages.done} />
              </AnalyticsButton>
            </Tooltip>
          </>
        }
      >
        <Wrapper>
          <AppConsentTable
            apps={apps}
            onRevokeConsent={revokeConsent}
            onShowConsentModal={showConsentModal}
            isLoading={isLoading}
          />
        </Wrapper>
      </FocusPage>
    </AnalyticsScreen>
  );
};

export default injectIntl(AppConsentPage);
