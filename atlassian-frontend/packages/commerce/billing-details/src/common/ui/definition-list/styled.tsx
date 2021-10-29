import styled from '@emotion/styled';

import { N200, N800 } from '@atlaskit/theme/colors';
import { headingSizes } from '@atlaskit/theme/typography';
import {
  stackLayoutFactory,
  UIScaleExtendedIncrements,
} from '@atlassian/commerce-layout';

const { h200 } = headingSizes;

export const DefinitionListContainer = styled.dl<{
  size?: UIScaleExtendedIncrements;
}>`
  ${({ size }) => stackLayoutFactory({ size })}

  padding-left: 0;
  margin-left: 0;
  margin-top: 0;
`;

export const DefinitionTerm = styled.dt`
  color: ${N200};
  font-weight: 600;
  font-size: ${h200.size}px;
  line-height: ${h200.lineHeight}px;
  letter-spacing: 0;
  margin: 0;
`;

export const DefinitionDescription = styled.dd`
  color: ${N800};
  margin-inline-start: 0;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
`;
