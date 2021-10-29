import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import { N0, N500, P400 } from '@atlaskit/theme/colors';
import { h600 } from '@atlaskit/theme/typography';
import { e200 } from '@atlaskit/theme/elevation';

export const TitleRow = styled.div`
  color: ${N500};

  display: flex;
  align-items: center;
  margin: ${gridSize() * 2.5}px 0 ${gridSize()}px;
`;

export const HeaderCardContainer = styled.div`
  background: ${P400};
  ${e200};

  box-sizing: border-box;
  width: ${gridSize() * 40}px;
  height: 165px;
  padding: 0 ${gridSize() * 2}px;
  /* Hide the rocket image overflow */
  overflow: hidden;

  border-radius: 0 0 ${gridSize() * 2}px ${gridSize() * 2}px;
`;

export const Heading = styled.h3`
  ${h600};
  color: ${N0};

  flex-grow: 1;

  ${HeaderCardContainer} & {
    &,
    &:first-child {
      margin: 0;
    }
  }
`;

export const RocketContainer = styled.div`
  /* This needs to be set explicitly since OG uses border-box everywhere */
  box-sizing: content-box;

  /* This is the width and height specified in the Figma design */
  width: 139px;
  height: 139px;

  /* These values come from the Figma design where the svg is offset
   189px from the left of the header and 58px from the top */
  padding-left: 173px;
  padding-top: 6px;
`;
