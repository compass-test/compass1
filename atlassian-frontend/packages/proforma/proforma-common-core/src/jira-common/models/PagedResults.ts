export interface PagedResults<ItemType> {
  start: number;
  count: number;
  total?: number;
  cursor: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  results: ItemType[];
}
