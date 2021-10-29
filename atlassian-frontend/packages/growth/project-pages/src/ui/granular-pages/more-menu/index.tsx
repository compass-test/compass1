import React, { useEffect, useMemo } from 'react';
import { injectIntl } from 'react-intl';
import Tooltip from '@atlaskit/tooltip';
import Icon from '@atlaskit/icon';
import { ConnectedPageGlyph } from './assets/connected-page';
import Button, { Appearance } from '@atlaskit/button';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';
import {
  AnalyticsSource,
  ScreenTypes,
  connectUIAnalytics,
} from '../../../common/analytics/util';
import messages from './messages';
import { Props, AnalyticsProps } from './types';
import { Wrapper, PaddedIcon } from './styled';
import { useFeatureFlags } from '../../../controllers/feature-flags';
import { PageIcon, SpaceIcon } from '../common/styled';

const MoreMenuComponent = ({
  triggerShowConnectSpaceDialog,
  triggerFetchConnectedSpacePageTitle,
  onUpdateSpaceOrPageClick,
  onNavigateToConnectedSpaceOrPage,
  isSpaceConnected,
  spaceOrPageTitle,
  spaceOrPageLink,
  isConnectedToPage,
  spaceIcon,
  intl: { formatMessage },
}: Props) => {
  const handleUpdateSpaceOrPageClick = (analyticsEvent: UIAnalyticsEvent) => {
    triggerShowConnectSpaceDialog();
    onUpdateSpaceOrPageClick(isSpaceConnected, analyticsEvent);
  };

  const handleNavigateToConnectedSpaceOrPageClick = (
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    onNavigateToConnectedSpaceOrPage(isConnectedToPage, analyticsEvent);
  };

  useEffect(() => {
    if (isSpaceConnected) {
      triggerFetchConnectedSpacePageTitle();
    }
  }, [triggerFetchConnectedSpacePageTitle, isSpaceConnected]);

  const { isProjectPagesProductionisation } = useFeatureFlags();

  const {
    maxWidth,
    appearance,
  }: {
    maxWidth: string;
    appearance: Appearance;
  } = isProjectPagesProductionisation
    ? { maxWidth: '208px', appearance: 'default' }
    : { maxWidth: '100%', appearance: 'subtle' };

  const connectionIcon = useMemo((): React.ReactChild | undefined => {
    if (!isProjectPagesProductionisation) {
      return undefined;
    }
    if (isConnectedToPage) {
      return (
        <PaddedIcon>
          <PageIcon />
        </PaddedIcon>
      );
    }
    if (spaceIcon) {
      return (
        <PaddedIcon>
          <SpaceIcon iconPath={spaceIcon} />
        </PaddedIcon>
      );
    }
    return undefined;
  }, [isProjectPagesProductionisation, isConnectedToPage, spaceIcon]);

  return (
    <Wrapper>
      {spaceOrPageTitle && (
        <Tooltip
          content={formatMessage(
            isConnectedToPage
              ? messages.goToConnectedPageTooltip
              : messages.goToConnectedSpaceTooltip,
          )}
        >
          <Button
            appearance="subtle-link"
            style={{ maxWidth: maxWidth }}
            href={spaceOrPageLink || undefined}
            onClick={(_, analyticsEvent) =>
              handleNavigateToConnectedSpaceOrPageClick(analyticsEvent)
            }
            target="_blank"
            iconBefore={connectionIcon}
          >
            {spaceOrPageTitle}
          </Button>
        </Tooltip>
      )}
      <Tooltip
        content={
          spaceOrPageTitle
            ? formatMessage(messages.updateConnectedSpaceOrPageTooltip)
            : formatMessage(messages.connectedSpaceOrPageTooltip)
        }
      >
        <Button
          appearance={appearance}
          onClick={(_, analyticsEvent) =>
            handleUpdateSpaceOrPageClick(analyticsEvent)
          }
          iconAfter={
            <Icon
              label={formatMessage(messages.label)}
              glyph={ConnectedPageGlyph}
            />
          }
        />
      </Tooltip>
    </Wrapper>
  );
};

export default AnalyticsSource<Exclude<Props, AnalyticsProps>>(
  'moreMenu',
  ScreenTypes.DROPDOWN,
)(
  connectUIAnalytics<Exclude<Props, AnalyticsProps>>({
    onUpdateSpaceOrPageClick: (isSpaceConnected: boolean) => ({
      name: 'updateSpaceOrPage',
      isSpaceConnected,
    }),
    onNavigateToConnectedSpaceOrPage: (isConnectedToPage: boolean) => ({
      name: 'navigateToConnectedSpaceOrPage',
      isConnectedToPage,
    }),
  })(injectIntl(MoreMenuComponent)),
);
