import styled, { css } from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

const OUTLINE_WIDTH = 2;

type InlineReadViewProps = {
  faded?: boolean;
  truncate?: boolean;
};

export const InlineReadView = styled.div<InlineReadViewProps>`
  max-width: 100%;
  padding: ${gridSize() - OUTLINE_WIDTH}px;

  ${(props) =>
    props.truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}

  ${(props) =>
    !props.truncate &&
    css`
      word-break: break-word;
      white-space: pre-wrap;
    `}

  ${(props) =>
    props.faded &&
    css`
      color: ${colors.N200};
    `}
`;
