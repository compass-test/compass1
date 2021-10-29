export const UNKNOWN = 'UNKNOWN';
export const LOADING = 'LOADING';
export const OK = 'OK';
export const FORBIDDEN = 'FORBIDDEN';

export type ConfluenceUserAccessState =
  | typeof UNKNOWN // initial state
  | typeof LOADING // fetching the user access state
  | typeof OK
  | typeof FORBIDDEN;

export type ConfluenceUserState = Partial<{
  access: ConfluenceUserAccessState;
}>;
