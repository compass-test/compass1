import styled from '@emotion/styled';
import { N10A, N40 } from '@atlaskit/theme/colors';

export const TableTreeWrapper = styled.div`
  border-top: 1px solid ${N40};
  [role='row'] {
    border-bottom: 1px solid ${N40};
    :hover {
      background-color: ${N10A};
    }
  }
  .cell {
    align-items: center;
  }
  .x-end {
    justify-content: flex-end;
  }
`;
