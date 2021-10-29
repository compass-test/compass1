export interface PermissionLevel {
  submit?: boolean;
  unlock?: boolean;
  reopen?: boolean;
  save?: boolean;
  create?: boolean;
  delete?: boolean;
  download?: boolean;
  addForm?: boolean;

  // Determines if a user can toggle a form between internal and external
  toggleAccess?: boolean;
}
