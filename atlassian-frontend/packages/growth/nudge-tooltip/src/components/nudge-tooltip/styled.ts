import styled from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import { TooltipPrimitive } from '@atlaskit/tooltip';

export const NudgeTooltipPrimitive = styled(TooltipPrimitive)`
  background-color: ${colors.P300};
  border-radius: 3px;
  box-sizing: border-box;
  color: white;
  max-width: 240px;
  padding: 8px 16px;
  word-wrap: break-word;
  overflow-wrap: break-word;

  &:empty {
    display: none;
  }
`;
