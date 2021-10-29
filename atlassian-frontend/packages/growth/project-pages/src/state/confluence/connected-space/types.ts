export const OK = 'OK';
export const LOADING = 'LOADING';
export const FORBIDDEN = 'FORBIDDEN';
export const DELETED = 'DELETED';
export const ERROR = 'ERROR';
export const CONNECTED = 'CONNECTED';
export const NOT_CONNECTED = 'NOT_CONNECTED';
export const UNKNOWN = 'UNKNOWN';

export type BlueprintsState =
  | typeof LOADING
  | typeof OK
  | typeof FORBIDDEN
  | typeof DELETED
  | typeof ERROR
  | typeof UNKNOWN;

export type ConnectionState =
  | typeof LOADING
  | typeof CONNECTED
  | typeof NOT_CONNECTED
  | typeof ERROR
  | typeof UNKNOWN;

export type BlueprintData = Partial<{
  name: string;
  itemModuleCompleteKey: string;
  blueprintModuleCompleteKey: string;
  contentBlueprintId: string;
  skipHowToUse: boolean;
}>;

export type ConnectedSpaceState = {
  blueprintsState: BlueprintsState;
  blueprints: BlueprintData[] | null | undefined;
  connectionState: ConnectionState;
  projectSpaceKey: string | null;
  projectSpacePageId: string | null;
  projectPageLinkedId: string | null;
  projectSpacePageTitle: string | null;
  projectSpacePageUrl: string | null;
  projectIsConnectedToPage: boolean;
  projectSpacePageTitleHasBeenFetched: boolean;
  projectSpaceIcon: string | null;
};
