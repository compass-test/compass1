import styled from 'styled-components';

import { N0, text } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { e200, e300 } from '@atlaskit/theme/elevation';
import { h300 } from '@atlaskit/theme/typography';
import { AnalyticsLink } from '@atlassian/mpt-elements';

const spacing = gridSize() * 2;
const imageWidth = 62;

export const Link = styled(AnalyticsLink)`
  ${e200()}
  display:block;
  background-color: ${N0};
  background-position: ${spacing}px center;
  background-repeat: no-repeat;
  background-size: ${imageWidth}px;
  min-width: 300px;
  border-radius: 3px;
  position: relative;
  padding: ${spacing * 1.5}px;
  padding-left: ${imageWidth + spacing * 2}px;
  cursor: pointer;

  &:hover {
    ${e300()}
    text-decoration: none;
  }
  &:active {
    ${e200()}
  }

  &:focus {
    text-decoration: none;
  }
  // TODO: legacy styled-components ref type is mismatch with the react
  // fix this when we remove the component - the linkcard has been deprecated already
` as any;

export const Title = styled.strong`
  ${h300()}
  display: block;
  color: inherit;
  margin: 0 0 ${spacing / 2}px 0;
`;

export const Text = styled.span`
  color: ${text};
  margin: ${spacing / 2}px 0 0;
`;
