import { OptionData, User as UserPickerUser } from '@atlaskit/user-picker';

import { InvitedUser } from '../../types/user';

export interface MemberPickerProps {
  // tenant id
  cloudId: string;
  // team id
  teamId?: string;
  // Max number of items that can be selected. Default value is 10
  maxSelectedMembers?: number;
  // initial selected values
  initialValues?: InvitedUser[];
  // handler when selection changes
  onChange?: (
    users: UserPickerUser[],
    data: { hasError: boolean; isDisabled: boolean },
  ) => void;
  // Used to filter users from the dropdown select
  filterUsers?: (users: OptionData[]) => OptionData[];
}
