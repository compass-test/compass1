export interface RetainMap {
  type: 'retain-map';
  map: {
    [key: string]: Delta;
  };
}

export interface RetainSeq {
  type: 'retain-seq';
  seq: Delta[];
}

export interface RetainRange {
  type: 'retain-range';
  length: number;
}

export interface DeleteRange {
  type: 'delete-range';
  length: number;
}

export interface InsertVals<T = unknown> {
  type: 'insert-vals';
  vals: T;
}

export interface Insert<T = unknown> {
  type: 'insert';
  val: T;
  retain: RetainMap | RetainSeq | RetainRange;
}

export type Delta =
  | RetainMap
  | RetainSeq
  | RetainRange
  | DeleteRange
  | Insert
  | InsertVals;

export interface TextNode {
  type: 'text';
  text: string;
}

export interface ADMark {
  type: string;
  attrs?: any;
}

export interface ADNode {
  type: string;
  attrs?: any;
  content?: ADNode[];
  marks?: ADMark[];
  text?: string;
}

export interface BasicNode {
  type: string;
  content?: (BasicNode | TextNode)[];
}

export type Node = TextNode | BasicNode | ADNode;

export interface Slice {
  content: TextNode[] | BasicNode[];
}

export interface ReplaceStep {
  stepType: 'replace';
  from: number;
  to: number;
  slice?: Slice;
}

export interface AddMarkStep {
  stepType: 'addMark';
  from: number;
  to: number;
  mark: {
    type: string;
  };
}

export type Step = ReplaceStep | AddMarkStep;

export type TestCase = {
  initialADF: Node;
  steps: Step[];
};
