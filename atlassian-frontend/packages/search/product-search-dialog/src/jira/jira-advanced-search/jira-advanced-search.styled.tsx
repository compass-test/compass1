import styled from '@emotion/styled';
import { gridSize } from '@atlaskit/theme/constants';
import { N900 } from '@atlaskit/theme/colors';
import Button from '@atlaskit/button';

export const AdvancedSearchContainer = styled.div`
  padding: ${1.5 * gridSize()}px ${2 * gridSize()}px;
`;

export const LabelContainer = styled.span`
  margin-right: ${gridSize()}px;
  color: ${N900};

  &:hover {
    color: ${N900};
  }

  :visited {
    color: ${N900};
  }
`;

export const StyledButton = styled(Button)`
  margin-right: ${0.5 * gridSize()}px;
`;
