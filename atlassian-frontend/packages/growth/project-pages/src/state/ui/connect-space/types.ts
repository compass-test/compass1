import { SpacesData } from '../../confluence/spaces/types';

export const CONNECT_ERROR = 'CONNECT_ERROR';
export const FETCH_ERROR = 'FETCH_ERROR';
export const NO_ERROR = 'NO_ERROR';

export type ConnectSpaceDialogError =
  | typeof CONNECT_ERROR
  | typeof FETCH_ERROR
  | typeof NO_ERROR;

export interface SelectedSpaceData extends SpacesData {
  isPage?: boolean;
  linkedPageId?: string;
  linkedPageTitle?: string;
  linkedPageUrl?: string;
}

export type ConnectSpaceDialogState = {
  selectedSpace: SelectedSpaceData | null | undefined;
  connectingSpace: boolean;
  connectSpaceDialogErrorState: ConnectSpaceDialogError;
  connectSpaceDialogOpen: boolean;
  disconnectedTemplatesClick: boolean;
};
