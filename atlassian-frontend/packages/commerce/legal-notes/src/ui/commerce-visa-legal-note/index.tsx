import React from 'react';

import {
  LegalNote,
  LegalNoteBlack,
  LegalNoteGray,
} from '../../common/ui/commerce-legal-notes/styled';
import { commerceBilingStatement } from '../../common/ui/commerce-legal-notes/util';

interface Props {
  withPriceAbove?: boolean;
  style?: 'black' | 'gray' | 'regular';
}

const legalNoteStyledMap = {
  black: LegalNoteBlack,
  gray: LegalNoteGray,
  regular: LegalNote,
};

export const CommerceVisaLegalNote: React.FC<Props> = ({
  withPriceAbove,
  style = 'regular',
}) => {
  const LegalNoteWrapper = legalNoteStyledMap[style];
  return (
    <LegalNoteWrapper data-testid="commerce-legal-notes.legal-note">
      {commerceBilingStatement}
      <br />
      <br />
      {withPriceAbove ? (
        <>
          Your credit card issuer may charge foreign transaction or cross-border
          fees in addition to the total price above.
        </>
      ) : (
        <>
          Your credit card issuer may charge foreign transaction or cross-border
          fees in addition to the total price.
        </>
      )}
    </LegalNoteWrapper>
  );
};
