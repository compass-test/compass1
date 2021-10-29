import type { GroupType, OptionsType } from '@atlaskit/select';

export type TcTagPickerProps = {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
};

export type BaseTagSelectOption = {
  label: string;
  value: string;
  usage?: TagUsage;
  __isNew__?: boolean;
};

export type TagUsage = {
  projects?: number;
  goals?: number;
  helpLinks?: number;
  question?: number;
};

export type TagSelectOption =
  | GroupType<BaseTagSelectOption>
  | BaseTagSelectOption;
export type TagSelectOptions = OptionsType<TagSelectOption>;

export type SelectCommonProps = {
  tags: TagSelectOptions;
  setTags: (tags: TagSelectOptions) => void;
  queryTagList: (inputValue: string) => Promise<TagSelectOptions>;
  createTag: (inputValue: string) => Promise<TagSelectOption | undefined>;
  testId?: string;
};
