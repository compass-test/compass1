import React from 'react';

import Flag from '@atlaskit/flag';

type AkFlagProps = React.ComponentProps<typeof Flag>;

export type FlagId = string | number;

export interface FlagProps extends Partial<AkFlagProps> {
  id?: FlagId;
  title: React.ReactNode;
  isAutoDismiss?: boolean;
  icon?: AkFlagProps['icon'];
  testId?: string;
}

export interface FlagPropsWithId extends FlagProps {
  id: FlagId;
}
