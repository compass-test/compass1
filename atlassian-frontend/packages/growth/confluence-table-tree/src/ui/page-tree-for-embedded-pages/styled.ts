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

  .x-start > * {
    display: flex;
    width: 100%;
    overflow: visible;
  }
`;

export const HoverWrapper = styled.div`
  [role='row'] {
    :hover {
      background-color: ${N10A};
      .hoverShow {
        display: block;
      }
      .hoverHide {
        display: none;
      }
    }
    .hoverShow {
      display: none;
    }
  }
  .x-end {
    padding: 0 25px;
  }
`;
