import React from 'react';

import { FormattedMessage } from 'react-intl';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Lozenge from '@atlaskit/lozenge';
import { isMPSDefinedFeature } from '@atlassian/chroma-modals';

import { Feature, Plan } from '../../../common/types';
import {
  StyledFeatureName,
  StyledFeatureRow,
  StyledFeatureRowCell,
  StyledFeatureRowCellIcon,
  StyledFeatureRowCellText,
} from '../../../common/ui/styled';

interface FeatureCellProps {
  feature: any;
  plan: Plan;
  highlightedPlan?: Plan;
  isLastRow?: boolean;
}

const FeatureCell: React.FC<FeatureCellProps> = ({
  feature,
  plan,
  highlightedPlan,
  isLastRow,
}) => {
  const isHighlighted = plan === highlightedPlan;

  let cellContents;

  if (typeof feature[plan] === 'boolean') {
    cellContents = (
      <StyledFeatureRowCellIcon isHighlighted={isHighlighted}>
        {feature[plan] ? (
          <CheckCircleIcon label="" size="medium" />
        ) : (
          <CrossIcon label="" size="medium" />
        )}
      </StyledFeatureRowCellIcon>
    );

    cellContents = (
      <StyledFeatureRowCellText isHighlighted={isHighlighted}>
        {cellContents}
      </StyledFeatureRowCellText>
    );
  } else if (typeof feature[plan].title !== 'undefined') {
    cellContents = [
      <StyledFeatureRowCellText key="title" isHighlighted={isHighlighted}>
        <FormattedMessage {...feature[plan].title} />
      </StyledFeatureRowCellText>,
    ];

    if (feature[plan].subTitle) {
      cellContents.push(
        <StyledFeatureRowCellText key="subtitle" isSmall>
          <FormattedMessage {...feature[plan].subTitle} />
        </StyledFeatureRowCellText>,
      );
    }
  } else {
    cellContents = (
      <StyledFeatureRowCellText isHighlighted={isHighlighted}>
        <FormattedMessage {...feature[plan]} />
      </StyledFeatureRowCellText>
    );
  }

  return (
    <StyledFeatureRowCell isHighlighted={isHighlighted} isLastRow={isLastRow}>
      {cellContents}
    </StyledFeatureRowCell>
  );
};

interface PlansRowProps {
  feature: Feature;
  highlightedPlan?: Plan;
  isLastRow?: boolean;
  onClick: () => void;
}

export const PlansRow: React.FC<PlansRowProps> = ({
  feature,
  highlightedPlan,
  isLastRow,
  onClick,
}) => {
  return (
    <StyledFeatureRow
      onClick={onClick}
      hasModal={isMPSDefinedFeature(feature.key)}
    >
      <StyledFeatureRowCell
        isHeader
        hasModal={isMPSDefinedFeature(feature.key)}
      >
        <StyledFeatureName>
          <FormattedMessage {...feature.name} />
        </StyledFeatureName>
        {feature.lozenge ? (
          <Lozenge>
            <FormattedMessage {...feature.lozenge} />
          </Lozenge>
        ) : null}
      </StyledFeatureRowCell>
      {Object.values(Plan).map(plan => (
        <FeatureCell
          feature={feature}
          plan={plan}
          highlightedPlan={highlightedPlan}
          isLastRow={isLastRow}
        />
      ))}
    </StyledFeatureRow>
  );
};

export default PlansRow;
