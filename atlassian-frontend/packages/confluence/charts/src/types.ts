export type ParseNumber = (num: string) => number | null;
type Attrs = {
  [key: string]: any;
};

export type ADFNode = {
  attrs?: Attrs;
  type: string;
  content?: ADFNode[];
  text?: string;
};

export type TableRow = {
  type: 'tableHeader' | 'tableRow';
  attrs?: Attrs;
  content: (ADFNode | undefined)[];
};

export type TableData = {
  type: 'table';
  attrs?: Attrs;
  content: TableRow[];
};
