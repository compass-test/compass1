import styled from '@emotion/styled';

import { N0, N200A, N30A, N500 } from '@atlaskit/theme/colors';

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  margin: 24px 18px 18px 24px;
`;

export const StickyHeader = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;

  display: flex;
  align-items: center;
  border-bottom: 2px solid ${N30A};
  padding: 18px 16px 3px 16px;
  background-color: ${N0};
`;

export const MarkAsReadWrapper = styled.div`
  margin-left: 8px;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  min-height: 32px;
`;

export const StickyHeaderText = styled.h1<{ mixin?: any }>`
  ${(props) => props.mixin};

  text-align: center;
  flex-grow: 1;
  margin-top: 0;
`;

export const GroupingText = styled.p<{ mixin?: any }>`
  ${(props) => props.mixin};

  flex: 1;
  text-transform: uppercase;
  color: ${N200A};
  margin-top: 0;
  margin-left: 8px;
`;

export const HeaderText = styled.h1<{ mixin?: any }>`
  ${(props) => props.mixin};

  flex-grow: 1;
  margin-top: 0;
`;

export const ToggleText = styled.label`
  font-size: 14px;
  line-height: 20px;
  color: ${N500};
  margin-right: 4px;
`;
