import styled from '@emotion/styled';
import { N200 } from '@atlaskit/theme/colors';
import { grid } from '../style-utils';

export const SearchResultSectionContainer = styled.div`
  padding: ${grid.multiple(1).px} 0;
`;

export const SearchResultSectionHeading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
  max-height: ${grid.multiple(4).px};
`;

export const SearchResultsSectionTitle = styled.span`
  font-size: 11px;
  line-height: ${grid.twice().px};
  font-weight: 600;
  text-transform: uppercase;
  margin: 0 ${grid.twice().px};
  color: ${N200};
`;
