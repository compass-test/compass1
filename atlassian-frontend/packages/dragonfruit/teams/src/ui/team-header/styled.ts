import { Link } from 'react-resource-router';
import styled from 'styled-components';

import { text, textActive } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
interface TeamNameWrapperProps {
  inline?: boolean;
}

export const TeamNameWrapper = styled.div<TeamNameWrapperProps>`
  margin-right: ${(props) => (props.inline ? gridSize() * 2 : 0)}px;
  margin-bottom: ${(props) => (props.inline ? 0 : gridSize() * 2)}px;
`;

export const InlineAvatars = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Error = styled.div`
  color: red;
  display: flex;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${text};

  &:focus,
  &:hover {
    text-decoration: none;
    color: ${textActive};
  }
`;
