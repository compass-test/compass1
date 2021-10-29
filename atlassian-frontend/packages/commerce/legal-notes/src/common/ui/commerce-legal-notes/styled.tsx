import styled from '@emotion/styled';

import { N500, N90, N900 } from '@atlaskit/theme/colors';
import { fontSize, gridSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

const { h200 } = headingSizes;

export const LegalNote = styled.p`
  font-size: ${h200.size / fontSize()}em;
  font-style: inherit;
  line-height: ${h200.lineHeight / h200.size};
  font-weight: normal;
  color: ${N500};

  margin-top: ${gridSize() * 2}px;
`;

export const LegalNoteBlack = styled(LegalNote)`
  color: ${N900};
`;

export const LegalNoteGray = styled(LegalNote)`
  color: ${N90};
`;

export const LegalCheckboxText = styled.span`
  font-size: ${h200.size / fontSize()}em;
  font-style: inherit;
  line-height: ${h200.lineHeight / h200.size};

  font-weight: normal;

  color: ${N500};
`;
