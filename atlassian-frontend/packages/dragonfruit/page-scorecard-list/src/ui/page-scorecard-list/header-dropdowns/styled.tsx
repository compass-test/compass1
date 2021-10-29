import styled from 'styled-components';
export const RowWrapper = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 16px;
  }
`;
