import { ProductSubscriptionChangeInfo } from '../../../../types';

export interface InContextState {
  cloudId: string;
  siteUrl: string;
  subscriptions: ProductSubscriptionChangeInfo[];
}
