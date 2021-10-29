// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import { Products } from '../';

export const generateMockSites = (numSites: number, product: Products) =>
  Array(numSites)
    .fill(0)
    .map(() => ({
      product: product,
      avatarUrl: 'https://i.imgur.com/0YmmsuX.jpg',
      cloudId: faker.random.uuid(),
      siteName: `${faker.random.word()}`,
      siteUrl: `https://${faker.random.word()}.atlassian.net`,
    }));

export const generateMockSitesWithAdvancedSearch = (
  numSites: number,
  product: Products,
) =>
  generateMockSites(numSites, product).map((s) => ({
    ...s,
    advancedSearchUrl: faker.internet.url(),
  }));
