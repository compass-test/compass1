/* eslint-disable import/prefer-default-export */
// General
import { action, computed, observable } from 'mobx';

// Models
import { PagedResults } from '../../models/PagedResults';

export abstract class SearchStore<ItemType> {
  @observable public loading = true;

  @observable public pageSize = 10;

  @observable public start = 0;

  @observable public total?: any;

  @observable public items: ItemType[] = [];

  @observable public nextCursor?: any;

  @observable public prevCursor?: any;

  @observable public sortKey?: string;

  @observable public sortOrder?: 'ASC' | 'DESC';

  @computed public get hasNextPage(): boolean {
    return !!this.nextCursor;
  }

  @computed public get hasPrevPage(): boolean {
    return !!this.prevCursor;
  }

  @computed public get end(): number {
    return this.start + this.items.length;
  }

  abstract doSearch(
    pageSize: number,
    cursor?: string,
    sortKey?: string,
    sortOrder?: string,
  ): Promise<PagedResults<ItemType>>;

  @action public startSearch(): void {
    this.clearSearch();
    this.search();
  }

  @action public refresh(): void {
    this.search();
  }

  @action public setPageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.clearSearch();
    this.search();
  }

  @action public nextPage(): void {
    if (this.hasNextPage) {
      this.search(this.nextCursor);
    }
  }

  @action public prevPage(): void {
    if (this.hasPrevPage) {
      this.search(this.prevCursor);
    }
  }

  @action public sortBy(sortDetails: any): void {
    this.clearSearch();
    this.sortKey = sortDetails ? sortDetails.key : null;
    this.sortOrder = sortDetails ? sortDetails.sortOrder : null;
    this.search();
  }

  @action private clearSearch(): void {
    this.prevCursor = null;
    this.nextCursor = null;
  }

  @action private search(cursor?: string): void {
    this.loading = true;
    this.items.length = 0;
    this.doSearch(this.pageSize, cursor, this.sortKey, this.sortOrder).then(
      results => {
        this.start = results.start;
        this.total = results.total;
        this.prevCursor = results.cursor.prev;
        this.nextCursor = results.cursor.next;
        results.results.forEach(item => {
          this.items.push(item);
        });
        this.loading = false;
      },
    );
  }
}
