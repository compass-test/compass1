import { PagedResults } from '@atlassian/proforma-common-core/jira-common-models';

export class MockSearchHelper<ItemType> {
  constructor(private includeTotalInResult: boolean = true) {}

  search(
    getFilteredItems: () => ItemType[],
    pageSize: number,
    cursor?: string,
    sortKey?: string,
    sortOrder?: string,
  ): Promise<PagedResults<ItemType>> {
    return new Promise<PagedResults<ItemType>>(resolve => {
      let filteredItems = getFilteredItems();

      if (sortKey) {
        // eslint-disable-next-line no-console
        console.log('Sorting by: ', sortKey, sortOrder);
        filteredItems = filteredItems.sort((a, b) => {
          const result =
            // @ts-ignore
            a[sortKey] > b[sortKey] ? 1 : b[sortKey] > a[sortKey] ? -1 : 0;
          return sortOrder === 'DESC' ? -result : result;
        });
      }

      // eslint-disable-next-line no-console
      console.log(`Searching ${filteredItems.length} projects`);

      let page = 0;
      if (cursor) {
        page = parseInt(cursor.substring(2));
      }

      let start = page * pageSize;
      let end = Math.min(start + pageSize, filteredItems.length);
      let items = filteredItems.slice(start, end);

      let maxPages = filteredItems.length / pageSize;
      let prevCursor = page > 0 ? 'pg' + (page - 1) : '';
      let nextCursor = page < maxPages - 1 ? 'pg' + (page + 1) : '';

      setTimeout(() => {
        resolve({
          start: start,
          count: items.length,
          cursor: {
            first: 'pg0',
            last: 'pg' + maxPages,
            prev: prevCursor,
            next: nextCursor,
          },
          total: this.includeTotalInResult ? filteredItems.length : undefined,
          results: items,
        });
      }, 1000);
    });
  }

  searchAll(
    getFilteredItems: () => ItemType[],
  ): Promise<PagedResults<ItemType>> {
    return new Promise<PagedResults<ItemType>>(resolve => {
      let items = getFilteredItems();

      // eslint-disable-next-line no-console
      console.log(`Searching ${items.length} projects`);

      setTimeout(() => {
        resolve({
          start: 0,
          count: items.length,
          cursor: {
            first: 'pg0',
            last: 'pg0',
            prev: '',
            next: '',
          },
          total: this.includeTotalInResult ? items.length : undefined,
          results: items,
        });
      }, 500);
    });
  }
}
