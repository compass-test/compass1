import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';

import { SectionContainer } from '../styled';
import { homeSectionScreenName } from '../../common/analytics/constants';
import { GspSectionKey } from '../../common/types';
import { Scrollable, TabContainerWrapper } from '../../common/ui/section';
import { getComponentTestId } from '../../common/util';
import HeaderCard from './header-card';
import NavigationCard from './navigation-card';
import { messages } from './messages';
import { useHasJsmProject } from '../../common/services/visibility';
import { useUrlData } from '../../common/ui/url-data';

const cardIds = {
  checklistCard: 'checklistCard',
  walkthroughsCard: 'walkthroughsCard',
  documentationCard: 'documentationCard',
  sampleProjectCard: 'sampleProjectCard',
};

interface Props {
  onClose: () => void;
  onSectionChange: (activeSection: GspSectionKey) => void;
}

export const HomeSection = ({
  intl,
  onClose,
  onSectionChange,
}: Props & InjectedIntlProps) => {
  const [hasJsmProject] = useHasJsmProject();
  const { serviceDeskBaseUrl } = useUrlData();
  return (
    <ContextualAnalyticsData
      sourceName={homeSectionScreenName}
      sourceType={SCREEN}
    >
      <SectionContainer>
        <HeaderCard onClose={onClose} />
        <Scrollable>
          <TabContainerWrapper
            data-testid={getComponentTestId('homeTabContainer')}
          >
            <NavigationCard
              icon={
                <ArrowRightIcon
                  label={intl.formatMessage(messages.checklistIconLabel)}
                />
              }
              title={intl.formatMessage(messages.checklistTitle)}
              description={intl.formatMessage(messages.checklistDescription)}
              cardId={cardIds.checklistCard}
              onClick={() => onSectionChange(GspSectionKey.Checklist)}
            />
            {hasJsmProject && (
              <NavigationCard
                icon={
                  <ArrowRightIcon
                    label={intl.formatMessage(messages.walkthroughsIconLabel)}
                  />
                }
                title={intl.formatMessage(messages.walkthroughsTitle)}
                description={intl.formatMessage(
                  messages.walkthroughsDescription,
                )}
                cardId={cardIds.walkthroughsCard}
                onClick={() => onSectionChange(GspSectionKey.ProductTours)}
              />
            )}
            <NavigationCard
              icon={
                <ShortcutIcon
                  label={intl.formatMessage(messages.documentationIconLabel)}
                />
              }
              title={intl.formatMessage(messages.documentationTitle)}
              description={intl.formatMessage(
                messages.documentationDescription,
              )}
              cardId={cardIds.documentationCard}
              link={
                hasJsmProject
                  ? 'https://support.atlassian.com/jira-service-management-cloud/docs/quick-reference-guide-for-starting-your-service-project/'
                  : 'https://docs.opsgenie.com/docs/opsgenie-quick-start-guide'
              }
            />
            {hasJsmProject && (
              <NavigationCard
                icon={
                  <ShortcutIcon
                    label={intl.formatMessage(messages.sampleProjectIconLabel)}
                  />
                }
                title={intl.formatMessage(messages.sampleProjectTitle)}
                description={intl.formatMessage(
                  messages.sampleProjectDescription,
                )}
                cardId={cardIds.sampleProjectCard}
                link={`${serviceDeskBaseUrl}/jira/servicedesk/itsm-sample-space`}
              />
            )}
          </TabContainerWrapper>
        </Scrollable>
        <FireScreenAnalytics />
      </SectionContainer>
    </ContextualAnalyticsData>
  );
};

export default injectIntl(HomeSection);
