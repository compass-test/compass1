import { AnalyticsSource } from '../components/analytics';
import { Product } from '../types';

export interface OriginQuery {
  cloudId: string;
  product?: Product;
}

export function constructProductOriginParams(originQuery: OriginQuery): string {
  const product = (originQuery.product || '').toUpperCase();
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
  return product === 'confluence' ? '/wiki' : product === 'jira' ? '/jira' : '';
}
