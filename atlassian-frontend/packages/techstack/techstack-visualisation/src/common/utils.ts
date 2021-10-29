import {
  AtlassianIcon,
  AtlassianLogo,
  BitbucketIcon,
  BitbucketLogo,
  ConfluenceIcon,
  ConfluenceLogo,
  JiraIcon,
  JiraLogo,
  OpsgenieIcon,
  OpsgenieLogo,
  StatuspageIcon,
  StatuspageLogo,
  TrelloIcon,
  TrelloLogo,
} from '@atlaskit/logo';

import { Product } from './types';

export const getProductIcon = (product: Product) => {
  switch (product) {
    case Product.JIRA:
      return JiraIcon;
    case Product.CONFLUENCE:
      return ConfluenceIcon;
    case Product.BITBUCKET:
      return BitbucketIcon;
    case Product.TRELLO:
      return TrelloIcon;
    case Product.OPSGENIE:
      return OpsgenieIcon;
    case Product.STATUSPAGE:
      return StatuspageIcon;
    case Product.ATLASSIAN:
      return AtlassianIcon;
    default:
      throw new Error('Unidentified product type');
  }
};

export const getProductLogo = (product: Product) => {
  switch (product) {
    case Product.JIRA:
      return JiraLogo;
    case Product.CONFLUENCE:
      return ConfluenceLogo;
    case Product.BITBUCKET:
      return BitbucketLogo;
    case Product.TRELLO:
      return TrelloLogo;
    case Product.OPSGENIE:
      return OpsgenieLogo;
    case Product.STATUSPAGE:
      return StatuspageLogo;
    case Product.ATLASSIAN:
      return AtlassianLogo;
    default:
      throw new Error('Unidentified product type');
  }
};
