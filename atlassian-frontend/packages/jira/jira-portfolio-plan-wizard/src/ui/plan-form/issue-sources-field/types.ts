import { IssueSource } from '../../../common/types';

export type IssueSourceRow = IssueSource & { rowId: string };

export type Props = {
  value: IssueSource[];
  onChange: (value: IssueSourceRow[]) => void;
  errorMessage?: React.ReactNode;
  hint?: React.ReactNode;
  isDisabled?: boolean;
  id?: string;
  showTeams?: boolean;
  confirmOnRemove?: boolean;
};

export type RemoveModal = {
  issueSourceName: string;
  submit: () => void;
  cancel: () => void;
};
