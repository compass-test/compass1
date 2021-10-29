import styled from 'styled-components';

import { N30 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h200 } from '@atlaskit/theme/typography';

import { AnnouncementListItem } from './list-item';

export const Container = styled.div`
  width: 100%;

  &:not(:last-of-type) {
    margin-bottom: ${gridSize() * 1.5}px;
  }
`;

export const Title = styled.h4`
  display: flex;
  align-items: center;

  margin-top: ${gridSize() * 2}px;
  margin-bottom: ${gridSize() * 2}px;

  text-transform: uppercase;
  ${h200()}

  &:before {
    display: block;
    content: '';
    flex-grow: 1;
    margin-right: ${gridSize()}px;
    border-bottom: 2px solid ${N30};
  }

  &:after {
    display: block;
    content: '';
    flex-grow: 1;
    margin-left: ${gridSize()}px;
    border-bottom: 2px solid ${N30};
  }
`;

export const List = styled.ul`
  /* ${AnnouncementListItem}:not(:last-child) {
    margin-bottom: ${gridSize() *
  2}px;
  } */

  // These styles remove default ul styles
  margin: 0;
  padding-left: 0;
  list-style-type: none;
`;
