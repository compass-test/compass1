import React from 'react';

import {
  LegalNote,
  LegalNoteBlack,
  LegalNoteGray,
} from '../../common/ui/commerce-legal-notes/styled';
import { commerceBilingStatement } from '../../common/ui/commerce-legal-notes/util';

interface Props {
  style?: 'black' | 'gray' | 'regular';
}

const legalNoteStyledMap = {
  black: LegalNoteBlack,
  gray: LegalNoteGray,
  regular: LegalNote,
};

export const CommerceLegalNoteStatement: React.FC<Props> = ({
  style = 'regular',
}) => {
  const LegalNoteWrapper = legalNoteStyledMap[style];
  return (
    <LegalNoteWrapper data-testid="commerce-legal-notes.legal-note">
      {commerceBilingStatement}
    </LegalNoteWrapper>
  );
};
