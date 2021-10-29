import React from 'react';
import { FormattedMessage as FormattedMessageNamespace } from 'react-intl';
import WorldIcon from '@atlaskit/icon/glyph/world';

import {
  AvailableProductsResponse,
  AvailableProduct,
  SwitcherProductType,
  ProvisionedProducts,
  CurrentSite,
  CollaborationGraphRecentContainer,
  CollaborationGraphRecentContainerType,
  MapUrl,
  ProductConfigurationMap,
  ProductConfigurationResponse,
  AvailableProductDetails,
} from '../../types';
import messages from './messages';
import { CustomLink, SwitcherChildItem } from '../../types';
import { createIcon, createImageIcon, IconType } from './icon-themes';
import { getProductDataWithJwmRebrandFF } from './map-to-switcher-props-with-jwm-rebrand-ff';

interface MessagesDict {
  [index: string]: FormattedMessageNamespace.MessageDescriptor;
}

export type SwitcherItemType = {
  key: string;
  label: JSX.Element | string;
  Icon: IconType;
  href: string;
  productType?: SwitcherProductType;
  description?: JSX.Element | string | null;
  iconUrl?: string;
  childItems?: SwitcherChildItem[];
  analyticsAttributes?: { [key: string]: string };
};

export type ProductSwitcherItemType = SwitcherItemType & {
  ordinal: number;
  productType: SwitcherProductType;
};

export type RecentItemType = SwitcherItemType & {
  type: string;
};

export const OBJECT_TYPE_TO_LABEL_MAP: MessagesDict = {
  // pf-activity specific object types. To be removed when pf-activity is deprecated
  'jira-project': messages.jiraProject,
  'confluence-space': messages.confluenceSpace,
  jiraProject: messages.jiraProject,
  confluenceSpace: messages.confluenceSpace,
};

export const getObjectTypeLabel = (type: string): JSX.Element | string => {
  return OBJECT_TYPE_TO_LABEL_MAP[type] ? (
    <FormattedMessageNamespace {...OBJECT_TYPE_TO_LABEL_MAP[type]} />
  ) : (
    type
  );
};

export interface ConnectedSite {
  avatar: string | null;
  product: AvailableProduct;
  isCurrentSite: boolean;
  siteName: string;
  siteUrl: string;
}

export const getProductSiteUrl = (
  availableProductMap: ProductConfigurationMap,
  connectedSite: ConnectedSite,
): string => {
  const { product, siteUrl } = connectedSite;

  if (product.url) {
    return product.url;
  }

  return siteUrl + availableProductMap[product.productType].href;
};

const getAvailableProductLinkFromSiteProduct = (
  productConfigurationMap: ProductConfigurationMap,
  connectedSites: ConnectedSite[],
  mapUrl: MapUrl,
  jwmRebrandEnabled: boolean,
): ProductSwitcherItemType | null => {
  const topSite =
    connectedSites.find((site) => site.isCurrentSite) ||
    connectedSites.sort((a, b) => a.siteName.localeCompare(b.siteName))[0];
  const productType = topSite.product.productType;
  const productLinkProperties:
    | AvailableProductDetails
    | undefined = jwmRebrandEnabled
    ? getProductDataWithJwmRebrandFF(
        productConfigurationMap,
        productType,
        jwmRebrandEnabled,
      )
    : productConfigurationMap[productType];

  if (!productLinkProperties) {
    return null;
  }

  return {
    ...productLinkProperties,
    key: productType + topSite.siteName,
    href: mapUrl(
      getProductSiteUrl(productConfigurationMap, topSite),
      productType,
    ),
    iconUrl: productLinkProperties.iconUrl,
    description: topSite.siteName,
    productType,
    childItems:
      connectedSites.length > 1
        ? connectedSites
            .map((site) => ({
              href: mapUrl(
                getProductSiteUrl(productConfigurationMap, site),
                productType,
              ),
              label: site.siteName,
              avatar: site.avatar,
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
        : [],
  };
};

export const getAvailableProductLinks = (
  productConfiguration: ProductConfigurationResponse,
  availableProducts: AvailableProductsResponse,
  cloudId: string | null | undefined,
  mapUrl: MapUrl,
  features: {
    jwmRebrandEnabled: boolean;
  },
): ProductSwitcherItemType[] => {
  const productsMap: { [key: string]: ConnectedSite[] } = {};
  availableProducts.sites.forEach((site) => {
    const { availableProducts, avatar, displayName, url } = site;
    availableProducts.forEach((product) => {
      const { productType } = product;

      if (!productsMap[productType]) {
        productsMap[productType] = [];
      }

      productsMap[productType].push({
        product,
        isCurrentSite:
          Boolean(cloudId) &&
          site.cloudId?.toLowerCase() === cloudId?.toLowerCase(),
        siteName: displayName,
        siteUrl: url,
        avatar,
      });
    });
  });

  return Object.values(productsMap)
    .reduce<ProductSwitcherItemType[]>((acc, connectedSites) => {
      const link: ProductSwitcherItemType | null = getAvailableProductLinkFromSiteProduct(
        productConfiguration.products,
        connectedSites,
        mapUrl,
        features.jwmRebrandEnabled,
      );

      if (link) {
        acc.push(link);
      }

      return acc;
    }, [])
    .sort((a, b) => {
      return a.ordinal - b.ordinal;
    });
};

export const getProvisionedProducts = (
  availableProducts: AvailableProductsResponse,
): ProvisionedProducts => {
  const provisionedProducts = {} as ProvisionedProducts;
  availableProducts.sites.forEach((site) =>
    site.availableProducts.forEach(
      (product) => (provisionedProducts[product.productType] = true),
    ),
  );
  return provisionedProducts;
};

export const getCustomLinkItems = (
  list: Array<CustomLink>,
  currentSite: CurrentSite,
): SwitcherItemType[] => {
  const defaultProductCustomLinks = [
    `${currentSite.url}/secure/MyJiraHome.jspa`,
    `${currentSite.url}/wiki/`,
  ];
  return list
    .filter(
      (customLink) => defaultProductCustomLinks.indexOf(customLink.link) === -1,
    )
    .map((customLink) => ({
      key: customLink.key,
      label: customLink.label,
      Icon: createIcon(WorldIcon),
      href: customLink.link,
      analyticsAttributes: {
        linkType: customLink.local ? 'customLink' : 'applink',
      },
    }));
};

export const getRecentLinkItemsCollaborationGraph = (
  list: Array<CollaborationGraphRecentContainer>,
  currentSite: CurrentSite,
): RecentItemType[] => {
  const isAnyJiraProductActive = Boolean(
    currentSite.products.find(
      (product) =>
        product.productType === 'JIRA_BUSINESS' ||
        product.productType === 'JIRA_SERVICE_DESK' ||
        product.productType === 'JIRA_SOFTWARE',
    ),
  );
  const isConfluenceActive = Boolean(
    currentSite.products.find(
      (product) => product.productType === 'CONFLUENCE',
    ),
  );

  return list
    .filter((recent: CollaborationGraphRecentContainer) => {
      return (
        (recent.containerType ===
          CollaborationGraphRecentContainerType.JIRA_PROJECT &&
          isAnyJiraProductActive) ||
        (recent.containerType ===
          CollaborationGraphRecentContainerType.CONFLUENCE_SPACE &&
          isConfluenceActive) ||
        [
          CollaborationGraphRecentContainerType.JIRA_PROJECT.toString(),
          CollaborationGraphRecentContainerType.CONFLUENCE_SPACE.toString(),
        ].indexOf(recent.containerType) === -1
      );
    })
    .slice(0, 6)
    .map((recentLink) => ({
      key: recentLink.id,
      label: recentLink.containerDetails.name,
      Icon: createImageIcon(recentLink.containerDetails.iconUrl),
      href: recentLink.containerDetails.url,
      type: recentLink.containerType,
      description: getObjectTypeLabel(recentLink.containerType),
    }));
};
