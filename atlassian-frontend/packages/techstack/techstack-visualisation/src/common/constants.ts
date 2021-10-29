import { Product } from './types';

export const availableProducts = [
  Product.ATLASSIAN,
  Product.JIRA,
  Product.OPSGENIE,
  Product.BITBUCKET,
];

export const productText: { [key in Product]: string } = {
  [Product.JIRA]: 'Jira',
  [Product.CONFLUENCE]: 'Confluence',
  [Product.BITBUCKET]: 'Bitbucket',
  [Product.TRELLO]: 'Trello',
  [Product.OPSGENIE]: 'Opsgenie',
  [Product.STATUSPAGE]: 'Statuspage',
  [Product.ATLASSIAN]: 'Atlassian',
};
