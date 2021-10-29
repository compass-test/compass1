import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

const TRANSITION = '200ms ease';

// Ported from JFE src/packages/portfolio-3/common/src/icon/styles.css
export const IconButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  height: 18px !important;
`;

// Ported from JFE src/packages/portfolio-3/portfolio/src/app-simple-plans/view/main/tabs/roadmap/scope/header/search/styles.css
export const Container = styled.div`
  margin-right: 20px;
  width: 200px;
`;

export const SearchSummaryContainer = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 100px;
  padding-right: ${gridSize()}px;

  > * {
    opacity: ${(props) => (props.active ? 1 : 0)};
    transition: opacity ${TRANSITION};
  }

  > *:last-child {
    opacity: ${(props) => (props.active ? 0 : 1)};
    transition: opacity ${TRANSITION};
    position: absolute;
    pointer-events: none;
  }
`;

export const SummaryCount = styled.span<{ hasSearchQuery: boolean }>`
  color: ${colors.N200};
  font-size: 12px;
  padding: 0 ${gridSize() / 2}px;
  white-space: nowrap;
  min-width: ${gridSize() * 4}px;
  text-align: right;
  opacity: ${(props) => (props.hasSearchQuery ? 1 : 0)};
  transition: opacity ${TRANSITION};
`;

export const StepIcon = styled.div<{ hasSearchQuery: boolean }>`
  opacity: ${(props) => (props.hasSearchQuery ? 1 : 0)};
  transition: opacity ${TRANSITION};
`;

export const IconWrapper = styled.div<{ disabled?: boolean }>`
  cursor: pointer;
  width: 20px;
  display: flex;
  align-items: center;

  &:hover svg {
    color: ${(props) => (props.disabled ? colors.N90 : colors.N500)};
  }

  & button {
    height: 24px;
  }
`;
