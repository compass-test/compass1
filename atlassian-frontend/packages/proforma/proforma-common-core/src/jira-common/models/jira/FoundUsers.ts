import { UserPickerUser } from './UserPickerUser';

export interface FoundUsers {
  users: UserPickerUser[];
  total: number; // The total number of users found in the search.
  header: string; // Header text indicating the number of users in the response and the total number of users found in the search.
}
