import { FieldProps } from '@atlaskit/form';

import { IssueStatusTypeMap } from '../../../common/types';

export type Props = {
  fieldProps: FieldProps<string[]>;
  error?: string;
  valid?: boolean;
  loading: boolean;
  statusTypeMap?: IssueStatusTypeMap;
};
