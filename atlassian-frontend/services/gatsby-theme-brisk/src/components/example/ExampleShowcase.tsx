import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/core';
import { gridSize } from '@atlaskit/theme';
import { N0, N40, B400 } from '@atlaskit/theme/colors';

export type Background = 'white' | 'blue' | 'neutral' | 'checkered';

const getBackgroundColor = (code: Background): SerializedStyles => {
  switch (code) {
    case 'white':
      return css`
        background-color: ${N0};
      `;

    case 'blue':
      return css`
        background-color: ${B400};
      `;

    case 'neutral':
      return css`
        background-color: ${N40};
      `;

    default:
    case 'checkered':
      return css`
        background-color: ${N0};
        background-image: linear-gradient(45deg, #f9f9fa 25%, transparent 25%),
          linear-gradient(135deg, #f9f9fa 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #f9f9fa 75%),
          linear-gradient(135deg, transparent 75%, #f9f9fa 75%);
      `;
  }
};

export type ExampleShowcaseProps = {
  backgroundColor?: Background;
};

const ExampleShowcase = styled.div<ExampleShowcaseProps>`
  padding: ${gridSize() * 3}px;
  ${({ backgroundColor }) => getBackgroundColor(backgroundColor)}
  background-size: 20px 20px;
  background-position: 0 0, 10px 0, 10px -10px, 0px 10px;
  border-radius: 3px 3px 0 0;
`;

export default ExampleShowcase;
