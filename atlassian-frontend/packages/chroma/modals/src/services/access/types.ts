export interface setPermissionHook {
  jswResponse: number | undefined;
  confResponse: number | undefined;
  error: string | undefined;
}

export interface GroupIdHook {
  groupId: string | undefined;
  error: string | undefined;
}
