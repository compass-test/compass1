import { ValueType } from '@atlaskit/select';

export const REQUIRED = 'REQUIRED';

export default function validateRequired(
  item: ValueType<Record<string, unknown>> | undefined,
) {
  return item ? undefined : REQUIRED;
}
