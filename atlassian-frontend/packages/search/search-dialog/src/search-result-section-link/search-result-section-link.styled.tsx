import Button from '@atlaskit/button';
import styled from '@emotion/styled';
import { grid } from '../style-utils';
import { B400 } from '@atlaskit/theme/colors';

// The margin is reduced to account for the Button component's 8px internal padding
// such that it aligns with the SearchResult icon.
// We need the `&&&` as Confluence has some CSS that overrides the styling otherwise
export const SectionLink = styled(Button)`
  margin-left: ${grid.half().px};
  color: ${B400};
  cursor: pointer !important;
  &:hover {
    text-decoration: underline !important;
  }
`;
