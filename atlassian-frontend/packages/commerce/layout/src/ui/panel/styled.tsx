import styled from '@emotion/styled';

import { N40A } from '@atlaskit/theme/colors';

import { SpacingScale } from '../../common/constants';
import { insetFactory, InsetProps } from '../../common/ui/spacing/inset';

const { SMALL } = SpacingScale;
const PANEL_CORDER_RADIUS = 3;

export const Panel = styled.div<InsetProps>`
  ${({ size = 'LARGE', type }) => insetFactory({ size, type })}
  border: 1px solid ${N40A};
  border-radius: ${PANEL_CORDER_RADIUS}px;
`;

export const EditButtonWrapper = styled.div`
  float: right;
  margin-top: -${SMALL}px;
  margin-right: -${SMALL}px;
`;
