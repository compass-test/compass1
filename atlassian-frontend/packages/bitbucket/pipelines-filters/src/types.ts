import { Branch, PipelineDefinition, User } from '@atlassian/pipelines-models';

export type PipelineFilter = {
  selectedStatus?: SelectedStatus;
  selectedTriggerType?: SelectedTriggerType;
  selectedPipelineType?: SelectedPipelineType;
  search?: Search;
  uuid?: Uuid;
};

export type SelectedStatus = string[] | null | undefined;
export type SelectedTriggerType = string | null | undefined;
export type SelectedPipelineType = string | null | undefined;
export type Search = string | null | undefined;
export type Uuid = string | null | undefined;

export type BranchesListProps = {
  getBranches: (search?: string) => Promise<Array<Branch>>;
  defaultBranchValue?: Branch;
  onBranchChange: (selectedOption: any) => void;
};

export type UserFilterProps = {
  users: Array<User>;
  selectedUser?: string | null;
  onUserAvatarClick: (uuid: string) => void;
};

export type FiltersProps = BranchesListProps & {
  onUpdateFilter: (...params: any) => void;
  url: string | undefined;
  statuses?: Array<any>;
  triggerTypes?: Array<any>;
  pipelineDefinitions: Array<PipelineDefinition> | undefined;
  parseFilterPathParam: (path: string) => PipelineFilter;
  getFilterQuery: (pathname: string) => string;
  users: Array<User>;
  showSearchFilter: boolean;
  showUsersFilter: boolean;
};

export type FiltersState = {
  filters: {
    selectedStatus: SelectedStatus;
    selectedTriggerType: SelectedTriggerType;
    selectedPipelineType: SelectedPipelineType;
    search: Search;
    uuid: Uuid;
  };
  defaultStatusItem: any;
  defaultTriggerTypeItem: any;
};

export type Status = {
  label: string;
  icon: string;
  value: Array<string>;
};

export type Trigger = {
  label: string;
  value: string;
};

export type PipelineType = {
  type: string;
  pattern?: string;
};

export type StateProps = {
  isFocused: boolean;
};
