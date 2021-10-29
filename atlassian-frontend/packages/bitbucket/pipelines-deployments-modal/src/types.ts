export enum ModalType {
  PREVIEW = 'preview',
  SUMMARY = 'summary',
  REDEPLOY = 'redploy',
  STEP_SUMMARY = 'step_summary',
  STEP_PREVIEW = 'step_preview',
  STEP_REDEPLOY = 'step_redploy',
}

export type Line = {
  oldLine?: number;
  newLine?: number;
  type: 'normal' | 'add' | 'del' | 'empty' | 'loaded';
  content: string;
  wordDiff?: string;
  position?: number;
  conflictType: 'marker' | 'content';
};

export type ChunkEntry = {
  id: string;
  newStart: number;
  oldStart: number;
  newLines: number;
  oldLines: number;
  content: string;
  changes: Line[];
};

export type Diff = {
  chunks: ChunkEntry[];
  from: string;
  to: string;
};

export type DiffContent = {
  lineFrom?: number;
  lineTo?: number;
  content: string;
};

export type ChunkReducerAccumulator = {
  before: ChunkEntry;
  after: ChunkEntry;
};

export type ChangeReducerAccumulator = {
  before: Line[];
  after: Line[];
};

export type GroupChangeAccumulator = {
  loadedBefore: Line[];
  loadedAfter: Line[];
  rest: Line[];
};
