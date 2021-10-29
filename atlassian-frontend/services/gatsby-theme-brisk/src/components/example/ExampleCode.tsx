import styled from '@emotion/styled';
import { gridSize } from '@atlaskit/theme';
import { N30, N20 } from '@atlaskit/theme/colors';

const GRADIENT_PERCENTAGE = 75;

export type ExampleCodeProps = {
  collapsed: boolean;
  hintHeight?: number;
};

const ExampleCode = styled.div<ExampleCodeProps>`
  padding-bottom: 2px;
  background-color: ${N20};
  position: relative;
  border-top: 1px solid ${N30};
  z-index: 0;

  code {
    padding: ${gridSize() * 3}px ${gridSize() * 3}px !important;
    white-space: pre-wrap !important;
  }

  [id^='example-'] {
    --mask: linear-gradient(
      to bottom,
      black ${100 - GRADIENT_PERCENTAGE}%,
      transparent
    );
    mask: ${(p) => (p.collapsed ? 'var(--mask)' : 'none')};
    position: relative;
    max-height: ${(p) => (p.collapsed ? `${p.hintHeight}px` : 'none')};
    overflow: hidden;
    box-sizing: border-box;
  }
`;

export default ExampleCode;
