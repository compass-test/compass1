import React from 'react';
import styled from 'styled-components';
import AkEditIcon from '@atlaskit/icon/glyph/edit';

export const Description = styled.p``;

export const NoteText = styled.p`
  margin-top: 0;
  padding-bottom: 12px;
`;

export const InstructionsContainer = styled.ol`
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding-bottom: 12px;
`;

export const Instruction = styled.li`
  margin-top: 17px;
`;

export const ItemCardContentWrapper = styled.div`
  padding: 16px 8px 0;
  cursor: default;
`;

const EditIconWrapper = styled.span`
  & svg {
    box-sizing: content-box;
    height: 20px;
    width: 20px;
    vertical-align: text-bottom;
  }
`;

type Props = JSX.LibraryManagedAttributes<
  typeof AkEditIcon,
  AkEditIcon['props']
>;
export const EditIcon = (props: Props) => (
  <EditIconWrapper>
    <AkEditIcon {...props} />
  </EditIconWrapper>
);
