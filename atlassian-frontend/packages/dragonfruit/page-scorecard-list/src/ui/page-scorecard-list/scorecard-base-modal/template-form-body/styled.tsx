import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';

export const AddCriteriaActionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  span.add-criteria {
    margin-left: 7px;
  }

  button {
    color: ${colors.N500} !important;
    padding: 0 6px 0 0;
    &:hover {
      background-color: ${colors.N30};
    }
  }
`;

export const FormBodyWrapper = styled.div`
  color: ${colors.N500} !important;
`;

export const CriteriaHeading = styled.div`
  ${h400}
  margin-top: ${gridSize() * 3}px;
`;

export const CriteriaInstructions = styled.p`
  font-size: 11px;
  line-height: 14px;
  margin-top: ${gridSize() * 0.5}px;
  margin-bottom: ${gridSize() * 3.5}px;
  color: ${colors.N600};
`;
