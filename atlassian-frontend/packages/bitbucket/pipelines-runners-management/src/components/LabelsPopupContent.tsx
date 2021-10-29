import React from 'react';

import CopyButton from './CopyButton';
import {
  CopyButtonWrapper,
  LabelPopupContainer,
  LabelPopupHeading,
  LabelWrapper,
} from './styled';

type Props = {
  labels: string[];
  index: number;
};

const LabelsPopupContent: React.FC<Props> = ({ labels, index }) => {
  const labelLines = labels.map((label) => `- ${label}`);
  return (
    <LabelPopupContainer id={`popup-content-${index}`}>
      <LabelPopupHeading>
        <p>ALL LABELS</p>
        <CopyButtonWrapper>
          <CopyButton name="labels" content={labelLines.join('\n')} />
        </CopyButtonWrapper>
      </LabelPopupHeading>
      <LabelWrapper>
        {labelLines.map((label, i) => (
          <p key={`runner-label-${i}`}>{label}</p>
        ))}
      </LabelWrapper>
    </LabelPopupContainer>
  );
};

export default React.memo(LabelsPopupContent);
