import styled from 'styled-components';

import { N0 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const Card = styled.div<{ shadowOnHover?: boolean }>`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  border-radius: 3px;
  background-color: ${N0};
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;

  ${({ shadowOnHover }) =>
    shadowOnHover
      ? `
      &:hover {
        box-shadow: rgba(9, 30, 66, 0.25) 0px 3px 3px, rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
      }
        `
      : ''};
`;

Card.defaultProps = {
  shadowOnHover: false,
};

export const CardBody = styled.div`
  padding: ${gridSize() * 2}px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
