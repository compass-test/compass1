import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import InfoIcon from '@atlaskit/icon/glyph/info';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import ConfluenceFreeInfoModal from '@atlassiansox/confluence-free-plan-info-modal';
import messages from './messages';
import {
  InfoIconWrapper,
  LearnMoreBannerContainer,
  Body,
  TextContainer,
  CrossIconWrapper,
  Link,
} from './styled';
import {
  ScreenTypes,
  AnalyticsSource,
  connectUIAnalytics,
  ComponentWithAnalytics,
} from '../../common/analytics/util';
import ViewTracker from '../../common/analytics/view-tracker';
import { getBlankPageRedirectUrl } from '../../common/util/blank-page-redirect';
interface OwnProps {
  onClose: () => void;
  locale: string;
  cloudId: string;
  projectName: string;
  projectSpaceKey: string | null;
}

interface EventProps {
  fireOnCloseBannerEvent: (event: UIAnalyticsEvent) => void;
  fireOnLinkClickEvent: (event: UIAnalyticsEvent) => void;
  fireOnCloseModalEvent: (event: UIAnalyticsEvent) => void;
  fireOnExploreConfluenceClick: (event: UIAnalyticsEvent) => void;
  fireOnCreatePageClick: (event: UIAnalyticsEvent) => void;
  fireOnModalDismiss: (event: UIAnalyticsEvent) => void;
}

const LinkWithAnalytics = ComponentWithAnalytics('link', {
  onClick: 'clicked',
})(Link);

const CrossIconWrapperWithAnalytics = ComponentWithAnalytics('button', {
  onClick: 'clicked',
})(CrossIconWrapper);

const LearnMoreBanner = ({
  onClose,
  locale,
  cloudId,
  projectName,
  projectSpaceKey,
  fireOnCloseBannerEvent,
  fireOnLinkClickEvent,
  fireOnCloseModalEvent,
  fireOnExploreConfluenceClick,
  fireOnCreatePageClick,
}: OwnProps & EventProps) => {
  const [infoModalOpen, setInfoModelOpen] = useState(false);

  const handleLearnMoreClick = useCallback(
    (_: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => {
      analyticsEvent.update({ tags: ['growth'] });
      fireOnLinkClickEvent(analyticsEvent);
      setInfoModelOpen(true);
    },
    [fireOnLinkClickEvent, setInfoModelOpen],
  );

  const handleModalClose = useCallback(
    (analyticsEvent: UIAnalyticsEvent) => {
      analyticsEvent.update({ tags: ['growth'] });
      fireOnCloseModalEvent(analyticsEvent);
      setInfoModelOpen(false);
    },
    [fireOnCloseModalEvent, setInfoModelOpen],
  );

  const handleExploreConfluenceClick = useCallback(
    (analyticsEvent: UIAnalyticsEvent) => {
      analyticsEvent.update({ tags: ['growth'] });
      fireOnExploreConfluenceClick(analyticsEvent);
      window.open(`/wiki`, '_blank');
      setInfoModelOpen(false);
    },
    [fireOnExploreConfluenceClick, setInfoModelOpen],
  );

  const handleCreatePageClick = useCallback(
    (analyticsEvent: UIAnalyticsEvent) => {
      analyticsEvent.update({ tags: ['growth'] });
      fireOnCreatePageClick(analyticsEvent);

      const redirectURL = getBlankPageRedirectUrl({
        origin: window.location.href,
        cloudId,
        sourceContext: 'project-pages',
        sourceComponent: 'silent-bundling-banner',
        projectKey: projectSpaceKey,
        projectName: projectName,
      });

      window.open(redirectURL, '_blank');
      setInfoModelOpen(false);
    },
    [fireOnCreatePageClick, projectSpaceKey, projectName, cloudId],
  );

  const onBannerDismiss = useCallback(
    (_: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => {
      fireOnCloseBannerEvent(analyticsEvent);
      onClose();
    },
    [fireOnCloseBannerEvent, onClose],
  );

  return (
    <LearnMoreBannerContainer>
      <Body>
        <InfoIconWrapper>
          <InfoIcon label="Info icon" />
        </InfoIconWrapper>
        <TextContainer>
          <FormattedMessage {...messages.learnMoreBannerText} />
        </TextContainer>
        <LinkWithAnalytics onClick={handleLearnMoreClick}>
          <FormattedMessage {...messages.learnMore} />
        </LinkWithAnalytics>
      </Body>
      <CrossIconWrapperWithAnalytics onClick={onBannerDismiss}>
        <CrossIcon size="small" label="Close icon" />
      </CrossIconWrapperWithAnalytics>
      <ConfluenceFreeInfoModal
        locale={locale}
        isOpen={infoModalOpen}
        onClose={handleModalClose}
        onPrimaryActionClick={handleCreatePageClick}
        onSecondaryActionClick={handleExploreConfluenceClick}
      />
      <ViewTracker />
    </LearnMoreBannerContainer>
  );
};

export default AnalyticsSource<OwnProps>(
  'projectPagesLearnMore',
  ScreenTypes.BANNER,
)(
  connectUIAnalytics<OwnProps>({
    fireOnCloseBannerEvent: 'projectPagesLearnMoreClose',
    fireOnLinkClickEvent: 'projectPagesLearnMore',
    fireOnCloseModalEvent: 'close',
    fireOnExploreConfluenceClick: 'exploreConfluence',
    fireOnCreatePageClick: 'createPage',
  })(LearnMoreBanner),
);
