import styled from '@emotion/styled';

export const DisabledCursorWrapper = styled.div<{ isDisabled: boolean }>`
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'default')};
`;
export const HelpPointerColorWrapper = styled.div<{ isDisabled: boolean }>`
  width: 100%;
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'default')};
  opacity: ${(props) => (props.isDisabled ? '0.5' : '1')};

  * {
    user-select: ${(props) => (props.isDisabled ? 'none' : 'default')};
  }
`;

export const SmileySpan = styled.span`
  display: inline-block;
  height: 33px;
  padding-right: 4px;

  > span {
    line-height: 24px;
    display: inline-block;
    vertical-align: center;
  }
`;

export const EmojiPickerDiv = styled.div`
  > div {
    margin-bottom: 0;
  }
`;
