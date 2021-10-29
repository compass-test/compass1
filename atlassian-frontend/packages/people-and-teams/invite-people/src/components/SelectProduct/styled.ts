import styled from 'styled-components';
import { N20 } from '@atlaskit/theme/colors';

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const IconWrapper = styled.div`
  background-color: ${N20};
  width: 24px;
  height: 24px;
  border-radius: 3px;
  margin-left: 4px;
  margin-right: 8px;
  padding: 3px;
  box-sizing: content-box;
`;

export const LabelWrapper = styled.span`
  margin-right: 0;
  flex: 1 1 auto;
`;

export const SelectAllWrapper = styled.div`
  padding: 8px 12px 8px 21px;
`;

export const MAX_VISIBLE_PRODUCTS = 2;

// Value Container
export const ProductsWrapper = styled.span`
  flex: 1 1 auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  > span:nth-child(n + ${MAX_VISIBLE_PRODUCTS + 1}) {
    display: none;
  }
`;
export const ProductCounterWrapper = styled.span`
  flex: 0 0 auto;
`;
