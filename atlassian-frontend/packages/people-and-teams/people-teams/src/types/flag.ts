import { FlagProps } from '@atlaskit/flag';

export type Flag = Pick<
  FlagProps,
  'id' | 'title' | 'description' | 'appearance' | 'actions'
>;
