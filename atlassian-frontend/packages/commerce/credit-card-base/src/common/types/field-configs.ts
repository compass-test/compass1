import { FieldName } from '../constants/field-names';

export type FieldConfig = Partial<{
  onChange: any;
  onFocus: any;
  onBlur: any;
}>;

export type FieldConfigs = Partial<Record<FieldName, FieldConfig>>;
