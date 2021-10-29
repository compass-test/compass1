import React from 'react';

import AKFlag, { AutoDismissFlag } from '@atlaskit/flag';

import { FlagPropsWithId } from '../../../../common/types';

import { iconMap } from './utils';

export type Props = FlagPropsWithId;

export const FlagContainer: React.FC<Props> = (props) => {
  const { isAutoDismiss, ...rest } = props;
  const Flag = isAutoDismiss ? AutoDismissFlag : AKFlag;
  return <Flag {...rest} icon={rest.icon || iconMap(rest.appearance)} />;
};
