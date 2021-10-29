import { FieldProps } from '@atlaskit/form';
import { GroupType } from '@atlaskit/select/src/types';

export type GroupedOptionsType<D> = ReadonlyArray<GroupType<D>>;

export type Props<T> = {
  // Design decision to keep this as string[] because when we move and remove issue sources we cant compare by reference anymore
  fieldProps: FieldProps<string[]>;
  testId?: string;
  error?: JSX.Element | null;
  valid?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  noOptionsMessage?: string;
  optionsMap: GroupedOptionsType<T> | undefined;
  children: (selected: T[]) => string | undefined;
  renderSelectedOption: (option: T) => JSX.Element;
  noneExcludedMessage: string;
  searchPlaceholder?: string;
};
