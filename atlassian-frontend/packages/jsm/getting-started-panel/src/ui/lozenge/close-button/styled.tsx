import styled from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

export const StyledButtonWrapper = styled.div`
  display: flex;
  button:hover {
    background-color: ${colors.P500};
  }
  button:focus {
    background-color: ${colors.P500};
  }
  button:active {
    background-color: ${colors.P200};
  }
  button[data-firefox-is-active='true'] {
    background-color: ${colors.P200};
  }
`;
