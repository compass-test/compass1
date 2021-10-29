import { AnalyticsActionSubject } from '../components/analytics';
import { Product } from '../types';

export function trimLastForwardSlash(url: string = '') {
  if (url[url.length - 1] === '/') {
    return url.slice(0, -1);
  }

  return url;
}

export function getContextPathFromProduct(product: Product) {
  const mapProductToContextPath = {
    confluence: '/wiki',
    jira: '/jira',
    directory: '',
  };

  return mapProductToContextPath[product] || '';
}

export function getPeopleDirectoryHomePage(product: Product): string {
  return `${getContextPathFromProduct(product)}/people?ref=${product}&src=${
    AnalyticsActionSubject.PEOPLE_MENU
  }`;
}

export function getPeopleProfilePage(product: Product, id: string) {
  return `${getContextPathFromProduct(
    product,
  )}/people/${id}?ref=${product}&src=${AnalyticsActionSubject.PEOPLE_MENU}`;
}

export function getTeamProfilePage(product: Product, id: string) {
  return `${getContextPathFromProduct(
    product,
  )}/people/team/${id}?ref=${product}&src=${
    AnalyticsActionSubject.PEOPLE_MENU
  }`;
}
