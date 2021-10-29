import React from 'react';

import { components } from '@atlaskit/select';

import { AvatarContent } from '../../../common/ui/avatar-content';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { ComponentProps } from '../types';

type Option = NonNullable<ComponentProps['Option']>;

/**
 * Style the selector option to have a avatar next to the team name.
 */
export const Option: Option = (props) => {
  const { children, ...forwardProps } = props;

  return (
    <components.Option {...forwardProps}>
      <AvatarContent avatarUrl={props.data?.avatarUrl}>
        {children}
      </AvatarContent>
    </components.Option>
  );
};
