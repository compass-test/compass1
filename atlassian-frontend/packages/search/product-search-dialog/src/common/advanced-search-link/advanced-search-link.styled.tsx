import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';
import { N900, N20, N0, B75, B100 } from '@atlaskit/theme/colors';
import { Link, LinkComponentProps } from '@atlassian/search-dialog';
import { themed } from '@atlaskit/theme/components';

const outlineColor = themed({ light: B100, dark: B75 });

export const CenteredAdvancedSearchGroup = styled.div`
  display: flex;
  align-items: center;
`;

const outlineWidth = 2;
const outlineRemovedFromPaddingWidth = outlineWidth / 2;

export const StyledAdvancedSearch = styled(Link)<
  LinkComponentProps & {
    onClick?: (e: React.MouseEvent | KeyboardEvent) => any;
  }
>`
  align-items: center;
  color: ${N900};
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: ${gridSize() - outlineRemovedFromPaddingWidth}px
    ${2 * gridSize() - outlineRemovedFromPaddingWidth}px;

  border: ${outlineWidth}px solid transparent;

  &:hover {
    color: ${N900};
    background-color: ${N20};
    text-decoration: none;
  }

  :visited {
    color: ${N900};
  }

  :focus {
    outline: none;
    border: ${outlineWidth}px solid ${outlineColor};
  }

  background-color: ${(props) => (props.isKeyboardHighlighted ? N20 : N0)};
`;

export const AdvancedSearchContent = styled.span`
  font-size: 14px;
  line-height: ${gridSize() * 2}px;
  padding-left: ${gridSize() * 2}px;
`;
