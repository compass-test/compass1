import { AnalyticsSource } from '../components/analytics';
import { Product } from '../types';

export interface OriginQuery {
  cloudId: string;
  product?: Product;
}

export function constructProductOriginParams(originQuery: OriginQuery): string {
  let product;
  if (originQuery.product === 'compass') {
    product = 'jira';
  } else {
    product = originQuery.product || '';
  }
  product = product.toUpperCase();
  const queries: string[] = [
    `origin.cloudId=${encodeURIComponent(originQuery.cloudId)}`,
  ];
  if (product) {
    queries.push(`origin.product=${encodeURIComponent(product)}`);
  }

  return queries.join('&');
}

export function getTeamUrl(
  teamId: string,
  product: Product | string = '',
): string {
  return `${getContextPath(product)}/people/team/${teamId}?ref=${product}&src=${
    AnalyticsSource.PEOPLE_TEAMS
  }`;
}

export function getContextPath(product: Product | string): string {
  switch (product) {
    case 'confluence':
      return '/wiki';
    case 'jira':
      return '/jira';
    case 'compass':
      return '/compass';
    default:
      return '';
  }
}
