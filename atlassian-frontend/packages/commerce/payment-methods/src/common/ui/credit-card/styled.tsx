import styled from '@emotion/styled';

export const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`;

export const CardText = styled.p`
  line-height: 1.3;
  margin: 8px 0 0;
  overflow-wrap: break-word;
  hyphens: auto;
`;

export const CardIcon = styled.div`
  line-height: 0;
`;

export const CardNumber = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 1;
`;
