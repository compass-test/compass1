import { ActivityItem, ActivityProvider } from '@atlaskit/activity-provider';

export class MockActivityProvider implements ActivityProvider {
  private promisedItems: Promise<ActivityItem[]>;
  constructor(readonly items: Array<ActivityItem>) {
    this.items = items;
    this.promisedItems = Promise.resolve(this.items);
  }

  getRecentItems(): Promise<ActivityItem[]> {
    return this.promisedItems;
  }

  searchRecent(query: string): Promise<Array<ActivityItem>> {
    return this.promisedItems;
  }
}

export function activityProviderFactory(items: Array<ActivityItem>) {
  return Promise.resolve(new MockActivityProvider(items));
}
