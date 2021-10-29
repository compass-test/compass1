import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import { N0, N20, N60 } from '@atlaskit/theme/colors';
import { e100, e200 } from '@atlaskit/theme/elevation';

export const Card = styled.span`
  button,
  a {
    ${e100};

    box-sizing: border-box;
    width: 100%;
    height: ${gridSize() * 8}px;
    padding: ${(gridSize() / 2) * 3}px;
    margin: 0 0 ${(gridSize() / 2) * 3}px;
    background-color: ${N0};
    text-decoration: none;

    &:active {
      ${e200};
      background-color: ${N20};
    }

    &:hover {
      text-decoration: none;
      background-color: ${N20};
    }
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h3`
  text-align: left;
  font-weight: 600;
  font-size: 14px;

  ${CardContent} & {
    &,
    &:first-child {
      margin: 0;
      line-height: initial;
    }
  }
`;

export const CardDescription = styled.p`
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  color: ${N60};
  margin-top: 0px;
`;
