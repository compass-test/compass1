import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
`;

export const Message = styled.span`
  * + & {
    margin-left: 8px;
  }
`;
