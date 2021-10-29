import styled from 'styled-components';

import { gridSizeTimes } from '../../../utils';

import type { EmptyStateContainerProps } from './types';

export const EmptyStateContainer = styled.div<EmptyStateContainerProps>`
  position: relative;
  padding: ${(props) => gridSizeTimes(props.py || 4)}px
    ${(props) => gridSizeTimes(props.px || 7)}px;
  transition: box-shadow 0.25s ease;
  overflow: hidden;

  display: flex;
  align-items: center;
`;

export const EmptyStateImageContainer = styled.div`
  display: flex;
  flex: 0 0 auto;
  width: ${gridSizeTimes(15)}px;
  max-height: ${gridSizeTimes(15)}px;
  margin-right: ${gridSizeTimes(4)}px;
  justify-content: center;
  align-items: center;

  svg {
    max-width: ${gridSizeTimes(15)}px;
    max-height: ${gridSizeTimes(15)}px;
  }
`;

export const EmptyStateImage = styled.img`
  max-width: ${gridSizeTimes(15)}px;
  max-height: ${gridSizeTimes(15)}px;
`;

export const EmptyStateBody = styled.div`
  min-width: 180px;
`;

export const EmptyStateTitle = styled.h3`
  margin-bottom: ${gridSizeTimes(2)}px;
`;

export const EmptyStateDescription = styled.p``;

export const EmptyStateActions = styled.div`
  margin-top: ${gridSizeTimes(2)}px;
`;
