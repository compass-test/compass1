import styled from 'styled-components';

import { N200 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h300 } from '@atlaskit/theme/typography';

const spacing = gridSize() * 2;

export const Main = styled.main`
  display: flex;
  margin-top: ${spacing * 2}px;
  padding-right: ${spacing * 3}px;
`;

export const MainCards = styled.div`
  padding-right: 94px;
  > * {
    margin-bottom: ${spacing * 1.5}px;
  }
`;

export const MainSide = styled.aside`
  flex: 0 0 280px;
  & > section {
    margin-bottom: ${spacing * 2}px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${spacing}px;
  > * {
    margin-left: ${spacing}px;
  }
`;

export const H1 = styled.h1`
  font-size: 28px;
  font-weight: 400;
  margin: 0;
  margin-bottom: ${spacing / 2}px;
`;

export const H2 = styled.h2`
  margin: 0;
  padding: ${spacing}px 0;
  color: ${N200};
  font-size: 11px;
  text-transform: uppercase;
`;

export const LinksList = styled.dl`
  margin: 0;
  dt {
    ${h300()}
    margin: 0;
    line-height: 2em;
    white-space: nowrap;
    text-transform: none;
    font-size: 14px;
  }
  dd {
    line-height: 1.5em;
    color: ${N200};
    margin: 0 0 ${spacing}px 0;
  }
`;
