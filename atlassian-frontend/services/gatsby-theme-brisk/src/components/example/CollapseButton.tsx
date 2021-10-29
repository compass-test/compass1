import styled from '@emotion/styled';
import { gridSize } from '@atlaskit/theme';
import { N500, N400, N300, N40, N30, N20 } from '@atlaskit/theme/colors';

const TRANSITION_DURATION = '200ms';

export type CollapseButtonProps = {
  collapsed: boolean;
};

const CollapseButton = styled.button<CollapseButtonProps>`
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${gridSize() * 4}px;
  position: relative; // Otherwise the outline gets clipped by the position: relative; codeblock

  /* Color and borders */
  background-color: ${N20};
  border-radius: 0 0 4px 4px;
  border-width: 0px;
  transition: background ${TRANSITION_DURATION},
    box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);
  outline: none;

  /* Button properties */
  cursor: pointer;

  /* Text */
  font-family: 'Charlie Display', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${N300};

  :hover {
    background: ${N30};
    color: ${N400};
  }

  :active {
    background: ${N40};
    color: ${N500};
  }

  :focus {
    box-shadow: 0 0 0 2px rgba(38, 132, 255, 0.6);
  }
`;

export default CollapseButton;
