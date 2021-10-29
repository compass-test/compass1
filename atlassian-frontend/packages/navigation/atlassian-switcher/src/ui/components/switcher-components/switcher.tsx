import React from 'react';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import isEqual from 'lodash/isEqual';
import { SwitcherWrapper, ManageButton, Skeleton } from '../../primitives';

import { SwitcherItemType, RecentItemType } from '../../../common/utils/links';
import { JoinableSiteItemType } from '../../../cross-join/utils/cross-join-links';
import {
  analyticsAttributes,
  NavigationAnalyticsContext,
  SWITCHER_SUBJECT,
  SWITCHER_JOINABLE_SITES,
  SWITCHER_AVAILABLE_PRODUCTS,
  RenderTracker,
  ViewedTracker,
  NotRenderedTracker,
  getJoinableSitesRenderTracker,
  getDiscoverSectionRenderTracker,
  getRecentContainersRenderTracker,
  getCustomLinksRenderTracker,
} from '../../../common/utils/analytics';
import { performanceNow } from '../../../common/utils/performance-now';
import { Appearance } from '../../theme/types';
import {
  TriggerXFlowCallback,
  DiscoverMoreCallback,
  JoinableSiteClickHandler,
  RenderAddOn,
  ProviderResults,
  SyntheticProviderResults,
  FeatureMap,
  GetExtendedAnalyticsAttributes,
  Product,
  WithConfluenceAutoProvisionedSiteFromTrello,
} from '../../../types';
import { CrossJoinSection } from '../../../cross-join/components/cross-join-section';
import { CrossFlowSection } from '../../../cross-flow/components/cross-flow-section';
import { SwitchToSection } from './switch-to-section';
import { RecentSection } from './recent-section';
import { CustomLinksSection } from './custom-links-section';
import ErrorBoundary from '../error-boundary';

export type SwitcherProps = {
  triggerXFlow: TriggerXFlowCallback;
  /**
   * Whether all the contents have been loaded
   */
  hasLoaded: boolean;
  /**
   * Whether contents considered critical path have been loaded
   */
  hasLoadedCritical: boolean;
  hasLoadedInstanceProviders?: boolean;
  onDiscoverMoreClicked: DiscoverMoreCallback;
  licensedProductLinks: SwitcherItemType[];
  suggestedProductLinks: SwitcherItemType[];
  fixedLinks: SwitcherItemType[];
  adminLinks: SwitcherItemType[];
  joinableSiteLinks?: JoinableSiteItemType[];
  recentLinks: RecentItemType[];
  customLinks: SwitcherItemType[];
  manageLink?: string;
  appearance?: Appearance;
  product?: Product;
  showStartLink: boolean;
  /**
   * Links for experimental "Discover" section
   * which is a variation of suggestedProductLinks and fixedLinks combined
   */
  discoverSectionLinks: SwitcherItemType[];
  onJoinableSiteClicked?: JoinableSiteClickHandler;
  highlightedJoinableItemHref?: string;
  defaultSignupEmail?: string;
  onClose?: () => void;
  renderAddOn?: RenderAddOn;
  rawProviderResults: ProviderResults & SyntheticProviderResults;
  features: FeatureMap;
  slackDiscoveryClickHandler?: DiscoverMoreCallback;
  getExtendedAnalyticsAttributes: GetExtendedAnalyticsAttributes;
  isDiscoverMoreClickable: boolean;
} & Partial<WithConfluenceAutoProvisionedSiteFromTrello>;

const getAnalyticsContext = (itemsCount: number) => ({
  ...analyticsAttributes({
    itemsCount,
  }),
});

export default class Switcher extends React.Component<SwitcherProps> {
  static defaultProps = {
    appearance: 'drawer',
  };
  mountedAt?: number;

  componentDidMount() {
    this.mountedAt = performanceNow();
  }

  shouldComponentUpdate(nextProps: SwitcherProps) {
    return !(isEqual(this.props, nextProps) as boolean);
  }

  timeSinceMounted(): number {
    return this.mountedAt !== undefined
      ? Math.round(performanceNow() - this.mountedAt)
      : 0;
  }

  /** https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/6522/issue-prst-13-adding-discover-more-button/
   * Currently Atlaskit's Item prioritises the usage of href over onClick in the case the href is a valid value.
   *
   *  The Discover more link is rendered with href=”” and onClick={actualImplementation}. Because the value of
   *  href is not valid for this case the item will instead call the onClick callback provided.
   *  */

  onDiscoverMoreClicked = (
    event: any,
    analyticsEvent: UIAnalyticsEvent,
    key?: string,
  ) => {
    const { onDiscoverMoreClicked } = this.props;
    onDiscoverMoreClicked(event, analyticsEvent, key);
  };

  render() {
    const {
      licensedProductLinks,
      suggestedProductLinks,
      fixedLinks,
      adminLinks,
      recentLinks,
      customLinks,
      manageLink,
      hasLoaded,
      hasLoadedCritical,
      hasLoadedInstanceProviders,
      appearance,
      discoverSectionLinks,
      renderAddOn,
      rawProviderResults,
      features,
      onClose,
      onJoinableSiteClicked,
      highlightedJoinableItemHref,
      triggerXFlow,
      slackDiscoveryClickHandler,
      getExtendedAnalyticsAttributes,
      product,
      isDiscoverMoreClickable,
    } = this.props;
    /**
     * It is essential that switchToLinks reflects the order corresponding nav items
     * are rendered below in the 'Switch to' section.
     */
    const switchToLinks = [
      ...licensedProductLinks,
      ...suggestedProductLinks,
      ...fixedLinks,
      ...adminLinks,
    ];

    const joinableSiteLinks = this.props.joinableSiteLinks || [];

    const itemsCount =
      switchToLinks.length +
      recentLinks.length +
      customLinks.length +
      discoverSectionLinks.length +
      joinableSiteLinks.length;

    const firstContentArrived = Boolean(licensedProductLinks.length);

    let numberOfSites = firstContentArrived ? 1 : 0;
    if (licensedProductLinks) {
      const uniqueSets: { [key: string]: boolean } = {};
      licensedProductLinks.forEach((link) => {
        (link.childItems || []).forEach((item) => {
          uniqueSets[item.label] = true;
        });
      });

      const numbberOfUniqueSites = Object.keys(uniqueSets).length;
      if (numbberOfUniqueSites > 0) {
        numberOfSites = numbberOfUniqueSites;
      }
    }

    return (
      <NavigationAnalyticsContext data={getAnalyticsContext(itemsCount)}>
        <SwitcherWrapper appearance={appearance}>
          {hasLoaded && (
            <React.Fragment>
              <ViewedTracker
                subject={SWITCHER_SUBJECT}
                data={{
                  licensedProducts: licensedProductLinks.map(
                    (item) => item.productType,
                  ),
                  suggestedProducts: suggestedProductLinks.map(
                    (item) => item.key,
                  ),
                  adminLinks: adminLinks.map((item) => item.key),
                  fixedLinks: fixedLinks.map((item) => item.key),
                  joinableSiteLinks: joinableSiteLinks.map((item) => item.key),
                  joinableSiteProductLinks: joinableSiteLinks.map((item) => ({
                    cloudId: item.key,
                    product: item.productType,
                  })),
                  numberOfSites,
                }}
              />
              {joinableSiteLinks.length > 0 && (
                <ViewedTracker
                  subject={SWITCHER_JOINABLE_SITES}
                  data={{ duration: this.timeSinceMounted() }}
                />
              )}
              {licensedProductLinks.length > 0 ? (
                <RenderTracker
                  subject={SWITCHER_AVAILABLE_PRODUCTS}
                  data={{ duration: this.timeSinceMounted() }}
                />
              ) : (
                <NotRenderedTracker
                  subject={SWITCHER_AVAILABLE_PRODUCTS}
                  data={{ duration: this.timeSinceMounted() }}
                />
              )}
            </React.Fragment>
          )}
          {hasLoadedInstanceProviders && (
            <React.Fragment>
              {getRecentContainersRenderTracker(
                features.enableRecentContainers,
                rawProviderResults.collaborationGraphRecentContainers,
                rawProviderResults.userSiteData,
                recentLinks,
                { duration: this.timeSinceMounted() },
              )}
              {getCustomLinksRenderTracker(
                rawProviderResults.customLinks,
                rawProviderResults.userSiteData,
                customLinks,
                { duration: this.timeSinceMounted() },
              )}
            </React.Fragment>
          )}
          {firstContentArrived && (
            <RenderTracker
              subject={SWITCHER_SUBJECT}
              data={{ duration: this.timeSinceMounted() }}
            />
          )}
          {renderAddOn &&
            renderAddOn({
              availableProducts: licensedProductLinks,
              joinableSiteLinks,
            })}
          {hasLoadedCritical && (
            <SwitchToSection
              adminLinks={adminLinks}
              appearance={appearance}
              fixedLinks={fixedLinks}
              licensedProductLinks={licensedProductLinks}
              showStartLink={this.props.showStartLink}
              onDiscoverMoreClicked={this.props.onDiscoverMoreClicked}
              getExtendedAnalyticsAttributes={getExtendedAnalyticsAttributes}
              confluenceAutoProvisionedSiteFromTrello={
                this.props.confluenceAutoProvisionedSiteFromTrello
              }
            />
          )}
          <ErrorBoundary
            product={product as Product}
            triggerSubject="crossJoinErrorBoundary"
            hideFallbackUI
          >
            <CrossJoinSection
              appearance={appearance}
              joinableSiteLinks={joinableSiteLinks}
              licensedProductLinks={licensedProductLinks}
              onJoinableSiteClicked={onJoinableSiteClicked}
              highlightedJoinableItemHref={highlightedJoinableItemHref}
              onClose={onClose}
              rawProviderResults={rawProviderResults}
            />
            {hasLoadedCritical &&
              getJoinableSitesRenderTracker(
                rawProviderResults.joinableSites,
                joinableSiteLinks,
                { duration: this.timeSinceMounted() },
              )}
          </ErrorBoundary>
          {isDiscoverMoreClickable && (
            <ErrorBoundary
              product={product as Product}
              triggerSubject="crossFlowErrorBoundary"
              hideFallbackUI
            >
              <CrossFlowSection
                appearance={appearance}
                onDiscoverMoreClicked={this.onDiscoverMoreClicked}
                triggerXFlow={triggerXFlow}
                discoverSectionLinks={discoverSectionLinks}
                suggestedProductLinks={suggestedProductLinks}
                rawProviderResults={rawProviderResults}
                isSlackDiscoveryEnabled={features.isSlackDiscoveryEnabled}
                slackDiscoveryClickHandler={slackDiscoveryClickHandler}
              />
              {getDiscoverSectionRenderTracker(
                rawProviderResults.isXFlowEnabled,
                rawProviderResults.provisionedProducts,
                rawProviderResults.joinableSites,
                rawProviderResults.productRecommendations,
                suggestedProductLinks,
                { duration: this.timeSinceMounted() },
              )}
            </ErrorBoundary>
          )}
          <ErrorBoundary
            product={product as Product}
            triggerSubject="recentSectionErrorBoundary"
            hideFallbackUI
          >
            <RecentSection appearance={appearance} recentLinks={recentLinks} />
          </ErrorBoundary>
          <ErrorBoundary
            product={product as Product}
            triggerSubject="customLinksErrorBoundary"
            hideFallbackUI
          >
            <CustomLinksSection
              appearance={appearance}
              customLinks={customLinks}
            />
            {!hasLoadedCritical && <Skeleton />}
            {manageLink && <ManageButton href={manageLink} />}
          </ErrorBoundary>
        </SwitcherWrapper>
      </NavigationAnalyticsContext>
    );
  }
}
