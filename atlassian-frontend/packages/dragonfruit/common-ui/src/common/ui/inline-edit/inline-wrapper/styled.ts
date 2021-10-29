import styled, { css } from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

type InlineWrapperProps = {
  alignText?: boolean;
};

export const InlineWrapper = styled.div<InlineWrapperProps>`
  ${(props) =>
    props.alignText &&
    css`
      // Offset to the sides so that the text inside lines up in read view
      margin-left: ${gridSize() * -1}px;
      margin-right: ${gridSize() * -1}px;
    `}

  // This removes the margin that comes built into the inline edit component
  // If we ever use the "label" prop we may want to consider removing this or making it configurable
  & > form {
    margin: 0;
    & > div {
      margin-top: 0;
    }
  }
`;
