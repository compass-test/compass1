import React from 'react';

import { G400 } from '@atlaskit/theme/colors';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';

import { css } from '@emotion/core';

const checkWrapperStyles = css({
  display: 'grid',
  placeItems: 'center',
});

const Check = () => (
  <div css={checkWrapperStyles}>
    <CheckCircleIcon primaryColor={G400} label="complete" />
  </div>
);

export default Check;
