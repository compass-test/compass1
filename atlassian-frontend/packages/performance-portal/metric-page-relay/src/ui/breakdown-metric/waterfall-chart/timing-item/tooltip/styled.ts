import styled from '@emotion/styled';

export const Diff = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

export const NumberContent = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const LegendColorContainer = styled.div`
  display: inline-block;
  margin-right: 4px;
`;
