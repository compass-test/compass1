import type { ReactNode } from 'react';

import {
  ActionMeta,
  GroupType,
  OptionType,
  SelectProps,
} from '@atlaskit/select';

interface OptionBase extends OptionType {
  value: string;
  cursor?: string;
  aboveTheFold?: boolean;
  data?: Option;
  invalid?: boolean;
  icon?: string;
}

export interface Option extends OptionBase {
  optionType: 'option';
}

export interface AvatarOption extends OptionBase {
  optionType: 'avatar';
  avatar?: string | null;
  square?: boolean;
  hideAvatar?: boolean;
}

export interface LozengeOption extends OptionBase {
  optionType: 'lozenge';
  appearance?:
    | 'default'
    | 'inprogress'
    | 'moved'
    | 'new'
    | 'removed'
    | 'success';
  isBold?: boolean;
  maxWidth?: number | string;
}

export type SingleOption = Option | AvatarOption | LozengeOption;

export type SelectValues = readonly SingleOption[];

export interface OptionGroup extends GroupType<SingleOption> {
  optionType: 'group';
  label: string;
  options: readonly SingleOption[];
}

export type SelectOption = SingleOption | OptionGroup;

export type SelectOptions = readonly SelectOption[];

export interface ErrorOption {
  optionType: 'error';
  error: true | Error;
  onRetry: () => void;
}

export type SelectOrErrorOptions = readonly (SelectOption | ErrorOption)[];

export type SearchValue = string;

export type FilterValue = {
  label: string;
  value: string;
}[];

export interface FieldProps {
  isRemovable?: boolean;
  label: string;
  type: string;
  key?: string | null;
}

export type LoadOptions = (
  inputValue: string,
  cb: (a: SelectValues) => void,
) => void | Promise<void>;

export interface PaginationConfig {
  enableFullList: boolean;
  keywordValues?: string[];
  showKeywordValuesInFullList?: boolean;
}

export interface AsyncLoadOptionsData {
  totalCount: number | null;
  options: SelectOrErrorOptions;
}

export type AsyncLoadOptions = (
  search: string,
  enableFullList: boolean,
  showFullList: boolean,
  showMore: boolean,
  lastOption: SelectOption | undefined,
  cb: (data: AsyncLoadOptionsData) => void,
) => void;

export interface PaginatedAsyncSelectField extends FieldProps {
  pagination?: PaginationConfig;
  loadOptions?: AsyncLoadOptions;
  defaultOptionsLabel?: string;
  defaultOptions: SelectOption[] | boolean;
  cacheOptions: boolean;
  onInputChange?: () => void;
  inputValue?: string;
  onMenuScrollToBottom?: () => void;
  onMenuScrollToTop?: () => void;
  placeholder?: ReactNode;
  enableShowMore?: boolean;
  invalidLabel?: string;
}

export const MetaActions = {
  setValue: 'set-value',
  inputChange: 'input-change',
  inputBlur: 'input-blur',
  menuClose: 'menu-close',
  selectOption: 'select-option',
  deselectOption: 'deselect-option',
  removeValue: 'remove-value',
  popValue: 'pop-value',
  clear: 'clear',
  createOption: 'create-option',
  clearOptions: 'clear-options',
  add: 'add',
  remove: 'remove',
  update: 'update',
};

export interface FilterOption {
  label: string;
  value: string;
  data: Option;
}

export type FormatOptionLabel = (option: SelectOption) => ReactNode;

export type OnChangeWithData = (
  options: SelectValues,
  option: ActionMeta<SelectOption>,
  selectData?: {
    selectedIndex: number;
  },
) => void;

export interface BaseSelectProps extends SelectProps<SingleOption, true> {
  options?: SelectOptions;
  fieldKey?: string | null;
  fieldLabel?: string | null;
  fieldInvalidLabel?: string | null;
  menuListProps: {
    error: {
      isError: boolean;
      error: Error | null;
      onRetry: (() => void) | null;
    };
    type?: string | null;
    handleShowMore: () => void;
    isLoading: boolean;
    isPaginationLoading: boolean;
    showShowMoreButton: boolean;
  };
  cacheOptions: boolean;
  defaultOptions: SelectOption[] | boolean;
  defaultOptionsLabel?: string;
  loadOptions: LoadOptions;
  onReload?: (a: string) => void;
  onFilterOption?: (option: FilterOption, rawInput: string) => boolean;
  onClear?: () => void;
}

export interface ProxyBaseSelectProps extends BaseSelectProps {
  selectOptions?: SelectOptions;
}
