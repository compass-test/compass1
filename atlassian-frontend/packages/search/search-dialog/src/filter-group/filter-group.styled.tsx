import styled from '@emotion/styled';
import { N200 } from '@atlaskit/theme/colors';
import { grid } from '../style-utils';

export const FilterGroupTitle = styled.div`
  font-size: 11px;
  line-height: ${grid.multiple(2).px};
  font-weight: 600;
  text-transform: uppercase;
  color: ${N200};
  padding-bottom: ${grid.multiple(0.5).px};
`;

export const SkeletonContainer = styled.div`
  width: 100%;
`;

export const FilterGroupContainer = styled.div`
  padding-bottom: ${grid.multiple(3.5).px};
`;

export const FilterResultRowContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-bottom: ${grid.multiple(3.5).px};
`;
