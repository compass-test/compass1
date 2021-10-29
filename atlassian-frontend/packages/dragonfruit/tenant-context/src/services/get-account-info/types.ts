import { ServiceState } from '@atlassian/dragonfruit-utils';
export type AccountInfoData = {
  avatarUrl: string;
  name: string;
  email: string;
};

export type AccountInfoResponse = {
  picture: string;
  name: string;
  email: string;
};

export interface AccountInfoState extends ServiceState<AccountInfoData> {}
