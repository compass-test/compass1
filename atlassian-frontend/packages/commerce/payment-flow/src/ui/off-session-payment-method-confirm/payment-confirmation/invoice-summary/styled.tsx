import css from '@emotion/css';
import styled from '@emotion/styled';

import { N400, N60, N800 } from '@atlaskit/theme/colors';
import { fontSize, gridSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

const fontDimensions = (size: number, lineHeight: number) => `
  font-size: ${size / fontSize()}em;
  font-style: inherit;
  line-height: ${lineHeight / size};
  letter-spacing: -0.01em;
`;

const spaceBetweenPanel = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Strong = styled.strong`
  font-weight: 600;
  display: block;
`;

export const InvoiceItemsContainer = styled.ul`
  padding: 0;
  padding-bottom: ${gridSize()}px;
  margin-bottom: ${gridSize()}px;
  border-bottom: 1px solid ${N60};
  color: ${N800};
`;

export const ItemDescription = styled(Strong)`
  ${fontDimensions(headingSizes.h500.size, headingSizes.h500.lineHeight)}
  margin-bottom: ${gridSize() / 2}px;
  display: block;
  color: ${N800};
`;

export const ItemPeriod = styled.div`
  ${fontDimensions(headingSizes.h200.size, headingSizes.h200.lineHeight)}
  letter-spacing: -0.01em;
  color: ${N400};
`;

export const InvoiceItemPanel = styled.li`
  ${spaceBetweenPanel}
  list-style: none;
`;
export const TotalsRow = styled.div`
  ${spaceBetweenPanel};
`;
