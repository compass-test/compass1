import { FieldProps } from '@atlaskit/form';

import { IssueTypeMap } from '../../../common/types';

export type Props = {
  fieldProps: FieldProps<string[]>;
  error?: string;
  valid?: boolean;
  loading: boolean;
  issueTypeMap?: IssueTypeMap;
};
