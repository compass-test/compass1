import styled from '@emotion/styled';

export const HEADING_FONT_WEIGHT = 800;
export const HIGHLIGHT_FONT_WEIGHT = 700;

export const Highlight = styled.span<{ fontWeight: number }>`
  font-weight: ${(props) => props.fontWeight};
`;
