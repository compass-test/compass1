export interface UserPickerUser {
  accountId: string; // The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, 5b10ac8d82e05b22cc7d4ef5.
  displayName: string | null; // The display name of the user. Depending on the user’s privacy setting, this may be returned as null.
  html: string; // The display name, email address, and key of the user with the matched query string highlighted with the HTML bold tag.
  avatarUrl: string; // The avatar URL of the user.
}
