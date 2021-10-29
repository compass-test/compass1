import styled from '@emotion/styled';

export const LegendContainer = styled.ul`
  padding: 0;
  margin-top: 20px;
  display: flex;
  list-style-type: none;
  justify-content: center;
`;

export const LegendItem = styled.li`
  margin: 0;
  display: flex;

  &:not(:first-of-type) {
    margin-left: 20px;
  }
`;

export const LegendText = styled.span`
  margin-left: 8px;
`;
