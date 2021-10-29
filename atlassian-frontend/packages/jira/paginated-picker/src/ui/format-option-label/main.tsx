import React from 'react';

import type { FormatOptionLabel } from '../../common/types';

import AvatarOptionLabel from './avatar-option-label';
import IconOptionLabel from './icon-option-label';
import LozengeOptionLabel from './lozenge-option-label';

const formatOptionLabel: FormatOptionLabel = option => {
  if (option.optionType === 'option') {
    return <IconOptionLabel option={option} />;
  }
  if (option.optionType === 'avatar') {
    return option.hideAvatar === true ? (
      option.label
    ) : (
      <AvatarOptionLabel avatarOption={option} />
    );
  }
  if (option.optionType === 'lozenge') {
    return <LozengeOptionLabel lozengeOption={option} />;
  }
  // eslint-disable-next-line no-console
  console.error(
    '`formatOptionLabel` was passed an unsupported `SelectOption`:',
    option,
  );
  return <></>;
};

export default formatOptionLabel;
