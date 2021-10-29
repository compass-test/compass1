import React from 'react';
import FormattedMessage from '../../ui/primitives/formatted-message';
import AddIcon from '@atlaskit/icon/glyph/add';
import { createIcon } from '../../common/utils/icon-themes';
import messages from '../../common/utils/messages';
import DiscoverFilledGlyph from '@atlaskit/icon/glyph/discover-filled';
import {
  ProvisionedProducts,
  RecommendationsEngineResponse,
  JoinableSite,
  SwitcherProductType,
  RecommendationsFeatureFlags,
  DiscoverLinkItemKeys,
  DiscoverMoreCallback,
  ProductConfigurationMap,
  AvailableProductDetails,
} from '../../types';
import { SwitcherItemType } from '../../common/utils/links';
import SlackIcon from '../../ui/primitives/SlackIcon';
import { mapLegacyProductKeyToSwitcherProductKey } from '../../common/utils/map-legacy-product-key-to-switcher-product-key';

export const getFixedProductLinks = (params: {}): SwitcherItemType[] => {
  return [getDiscoverMoreLink()];
};

const getDiscoverMoreLink = (
  customIcon?: React.ComponentType<any>,
): SwitcherItemType => {
  const icon = customIcon || AddIcon;
  return {
    // The discover more link href is intentionally empty to prioritise the onDiscoverMoreClicked callback
    key: DiscoverLinkItemKeys.DISCOVER_MORE,
    label: <FormattedMessage {...messages.moreAtlassianProductsLink} />,
    Icon: createIcon(icon, { size: 'medium' }),
    href: '',
  };
};

const getSlackIntegrationLink = (): SwitcherItemType => ({
  // The Slack integration link href is intentionally empty to prioritise the slackDiscoveryClickHandler callback
  key: DiscoverLinkItemKeys.SLACK_INTEGRATION,
  label: <FormattedMessage {...messages.slackIntegrationLink} />,
  description: (
    <FormattedMessage {...messages.slackIntegrationLinkDescription} />
  ),
  Icon: createIcon(SlackIcon, { size: 'medium' }),
  href: '',
});

export function getDiscoverSectionLinks({
  isSlackDiscoveryEnabled,
  slackDiscoveryClickHandler,
}: {
  recommendationsFeatureFlags?: RecommendationsFeatureFlags;
  isSlackDiscoveryEnabled?: boolean;
  slackDiscoveryClickHandler?: DiscoverMoreCallback;
}) {
  const discoverLinks: SwitcherItemType[] = [];
  const discoverMoreLink = getDiscoverMoreLink(DiscoverFilledGlyph);

  const slackIntegrationLink = getSlackIntegrationLink();

  if (isSlackDiscoveryEnabled && Boolean(slackDiscoveryClickHandler)) {
    discoverLinks.push(slackIntegrationLink);
  }

  if (discoverMoreLink) {
    discoverLinks.push(discoverMoreLink);
  }

  return discoverLinks;
}

export const getSuggestedProductLink = (
  provisionedProducts: ProvisionedProducts,
  productRecommendations: RecommendationsEngineResponse,
  joinableSites: JoinableSite[] | undefined,
  productConfigurationMap: ProductConfigurationMap,
): SwitcherItemType[] => {
  const collectedJoinableSites = joinableSites
    ? Object.keys(collectJoinableSites(joinableSites))
    : [];

  const legacyProductKeyMap = mapLegacyProductKeyToSwitcherProductKey(
    productConfigurationMap,
  );

  return productRecommendations
    .reduce<SwitcherItemType[]>((acc, legacyProduct) => {
      const switcherProductKey: SwitcherProductType | undefined =
        legacyProductKeyMap[legacyProduct.productKey];

      if (!switcherProductKey) {
        return acc;
      }

      const shouldHideOpsGenie =
        switcherProductKey === 'OPSGENIE' &&
        provisionedProducts['JIRA_SERVICE_DESK'];

      if (
        !(
          provisionedProducts[switcherProductKey] ||
          collectedJoinableSites.includes(legacyProduct.productKey) ||
          shouldHideOpsGenie
        )
      ) {
        const productConfig: AvailableProductDetails | undefined =
          productConfigurationMap[switcherProductKey];

        if (productConfig) {
          acc.push(productConfig);
        }
      }

      return acc;
    }, [])
    .slice(0, DISCOVER_PRODUCT_RECOMMENDATION_LIMIT);
};

const DISCOVER_PRODUCT_RECOMMENDATION_LIMIT = 3;

const collectJoinableSites = (joinableSites: JoinableSite[]) =>
  joinableSites.reduce(
    (joinable, sites) => ({ ...joinable, ...(sites.products || sites.users) }),
    {},
  );
