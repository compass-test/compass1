export type SyntaxLocation = {
  line: number;
  ch: number;
};

export type SyntaxRange = {
  start: SyntaxLocation;
  end: SyntaxLocation;
};

export type Options = {
  maxStepDuration?: number;
  environments?: Array<any>;
};

export interface INode {
  start: SyntaxLocation;
  end?: SyntaxLocation;
  children: INode[];
  kind?: 'scalar' | 'mapping' | 'sequence';
  result?: any;
}

type Pos = {
  line: number;
  ch: number;
};

export interface ILintError {
  from: Pos;
  to?: Pos;
  message: string;
  severity: 'error' | 'warning';
}
