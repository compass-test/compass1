import styled from 'styled-components';

import { R400 } from '@atlaskit/theme/colors';
import { fontFamily, gridSize } from '@atlaskit/theme/constants';
import { h200 } from '@atlaskit/theme/typography';

export const FieldWrapper = styled.div`
  margin-top: ${gridSize}px;
`;

export const Label = styled.label`
  ${h200()} display: inline-block;
  font-family: ${fontFamily()};
  margin-bottom: ${gridSize() / 2}px;
  margin-top: 0;
`;

export const RequiredIndicator = styled.span`
  color: ${R400};
  font-family: ${fontFamily()};
  padding-left: ${gridSize() / 4}px;
`;

export const ModalTitleContainer = styled.span`
  h1,
  h1 > span {
    font-size: 20px;
    font-weight: 500;
    line-height: 1;
  }
`;
