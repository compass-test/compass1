import { BoardState } from './model/models/Board';

interface CanvasInteractionOpts {
  pan?: {
    enabled: boolean;
  };
  zoom?: {
    enabled: boolean;
  };
  drag?: {
    enabled: boolean;
  };
}

interface CanvasFeatureOpts {
  sticky?: {
    enabled: boolean;
  };
  text?: {
    enabled: boolean;
  };
  collab?: {
    enabled: boolean;
  };
  connectors?: {
    enabled: boolean;
  };
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface CanvasBoardRendererOpts {
  selector: string;
  interactions?: CanvasInteractionOpts;
  features?: CanvasFeatureOpts;
  board: BoardState;
}
