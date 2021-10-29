import React from 'react';
import styled from 'styled-components';
import Avatar, { AvatarPropTypes } from '@atlaskit/avatar';

const NegativeMargin = styled.div`
  margin: -2px;
`;

export const ResultAvatar = (props: AvatarPropTypes) => (
  <NegativeMargin>
    <Avatar {...props} />
  </NegativeMargin>
);
