import type {
  FormatOptionLabel,
  OnChangeWithData,
  PaginatedAsyncSelectField,
  SelectValues,
} from '../../common/types';

export interface PaginatedAsyncSelectViewProps {
  field: PaginatedAsyncSelectField;
  value: SelectValues;
  formatOptionLabel?: FormatOptionLabel;
  onClear?: () => void;
  onChange: OnChangeWithData;
  initiallyAddSelectedFirst: boolean;
}

export interface IsError {
  isError: boolean;
  error: Error | null;
  onRetry: (() => void) | null;
}
