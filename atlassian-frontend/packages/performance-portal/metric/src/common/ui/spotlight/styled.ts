import styled from '@emotion/styled';

export const Container = styled.div<{ borderColor: string }>`
  height: 81px;
  border: 1px solid ${(props) => props.borderColor};
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  &:not(:first-child) {
    margin-left: 17px;
  }
  padding: 0 20px;
  max-width: 220px;
  flex: 1;
`;

export const DiffContainer = styled.div<{ textColor: string }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => props.textColor};
`;

export const DiffNumbers = styled.div`
  margin-left: 10px;
  white-space: pre;
`;

export const DiffPercentage = styled.div`
  font-size: 18px;
  white-space: pre;
`;

export const DiffAbsolute = styled.div`
  font-size: 14px;
  white-space: pre;
`;

export const NotApplicable = styled.div`
  font-size: 18px;
  white-space: pre;
`;
