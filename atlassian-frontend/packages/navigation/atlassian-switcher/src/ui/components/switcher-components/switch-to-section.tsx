import React, { useCallback } from 'react';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import {
  FormattedMessage,
  SectionWithLinkItem,
  SwitcherItemWithDropdown,
  SwitcherThemedItemWithEvents,
} from '../../primitives';
import messages from '../../../common/utils/messages';
import { SwitcherItemType } from '../../../common/utils/links';
import {
  getItemAnalyticsContext,
  NavigationAnalyticsContext,
} from '../../../common/utils/analytics';
import { Appearance } from '../../theme/types';
import {
  AnalyticsItemType,
  DiscoverLinkItemKeys,
  DiscoverMoreCallback,
  GetExtendedAnalyticsAttributes,
  WithConfluenceAutoProvisionedSiteFromTrello,
} from '../../../types';
import { AdminSubsection } from '../../../admin/components/admin-subsection';
import { SwitchToSectionBannerNotification } from './switch-to-section-banner-notification';

const noop = () => void 0;

type SwitchToSectionProps = {
  adminLinks: SwitcherItemType[];
  appearance?: Appearance;
  showStartLink?: boolean;
  fixedLinks: SwitcherItemType[];
  licensedProductLinks: SwitcherItemType[];
  onDiscoverMoreClicked: DiscoverMoreCallback;
  getExtendedAnalyticsAttributes: GetExtendedAnalyticsAttributes;
};

const START_LINK_ITEM: SwitcherItemType = {
  key: 'atlassian-start',
  label: <FormattedMessage {...messages.atlassianStart} />,
  Icon: () => null,
  href: 'https://start.atlassian.com',
};

export const SwitchToSection = ({
  adminLinks,
  appearance,
  showStartLink,
  fixedLinks,
  licensedProductLinks,
  onDiscoverMoreClicked,
  getExtendedAnalyticsAttributes,
  confluenceAutoProvisionedSiteFromTrello,
}: SwitchToSectionProps &
  Partial<WithConfluenceAutoProvisionedSiteFromTrello>) => {
  /** https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/6522/issue-prst-13-adding-discover-more-button/
   * Currently Atlaskit's Item prioritises the usage of href over onClick in the case the href is a valid value.
   *
   *  The Discover more link is rendered with href=”” and onClick={actualImplementation}. Because the value of
   *  href is not valid for this case the item will instead call the onClick callback provided.
   *  */
  const onDiscoverMoreClickedCallback = useCallback(
    (event: any, analyticsEvent: UIAnalyticsEvent) => {
      onDiscoverMoreClicked(event, analyticsEvent);
    },
    [onDiscoverMoreClicked],
  );

  const renderChildren = () => {
    return [
      licensedProductLinks.map((item, groupIndex) => (
        <NavigationAnalyticsContext
          key={item.key}
          data={getItemAnalyticsContext(
            groupIndex,
            null,
            AnalyticsItemType.PRODUCT,
            item.productType,
            getExtendedAnalyticsAttributes(item.productType),
          )}
        >
          {/*
           * Experiment: Confluence Section Notification Banner Component.
           * See switch-to-section-banner-notification.tsx for more information
           */}
          <SwitchToSectionBannerNotification
            confluenceAutoProvisionedSiteFromTrello={
              confluenceAutoProvisionedSiteFromTrello
            }
            productType={item.productType}
          >
            <SwitcherItemWithDropdown
              icon={<item.Icon theme="product" />}
              childIcon={<item.Icon theme="subtle" />}
              description={item.description}
              href={item.href}
              childItems={item.childItems}
              tooltipContent={<FormattedMessage {...messages.showMoreSites} />}
              data-testid={`switcher-item__${item.key}`}
            >
              {item.label}
            </SwitcherItemWithDropdown>
          </SwitchToSectionBannerNotification>
        </NavigationAnalyticsContext>
      )),
      fixedLinks.map((item, groupIndex) => (
        <NavigationAnalyticsContext
          key={item.key}
          data={getItemAnalyticsContext(
            groupIndex,
            item.key,
            AnalyticsItemType.PRODUCT,
          )}
        >
          <SwitcherThemedItemWithEvents
            icon={<item.Icon theme="product" />}
            href={item.href}
            data-testid={`switcher-item__${item.key}`}
            onClick={
              item.key === DiscoverLinkItemKeys.DISCOVER_MORE
                ? onDiscoverMoreClickedCallback
                : noop
            }
          >
            {item.label}
          </SwitcherThemedItemWithEvents>
        </NavigationAnalyticsContext>
      )),
      adminLinks.length > 0 && (
        <AdminSubsection key="admin-item" adminLinks={adminLinks} />
      ),
    ];
  };
  const titleLink = showStartLink ? START_LINK_ITEM : undefined;
  return (
    <SectionWithLinkItem
      sectionId="switchTo"
      title={<FormattedMessage {...messages.switchTo} />}
      titleLink={titleLink}
      actionSubject="atlassianLink"
      appearance={appearance}
    >
      {renderChildren()}
    </SectionWithLinkItem>
  );
};
