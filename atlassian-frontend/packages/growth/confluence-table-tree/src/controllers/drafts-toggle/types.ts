export interface DraftsToggleState {
  isDraftsShown: boolean | null;
  isTreeUpdatedForDrafts: boolean | null; // a tri-state: false = need to trigger an update; null = update in progress; true = updated
}
