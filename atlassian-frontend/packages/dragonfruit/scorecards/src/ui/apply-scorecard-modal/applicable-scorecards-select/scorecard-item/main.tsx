import React from 'react';

import Icon, { CustomGlyphProps, GlyphProps } from '@atlaskit/icon';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';

import { ScorecardStandardIcon } from '../../../../common/ui/scorecard-standard-icon';
import { ScorecardOption } from '../../../../common/ui/types';

import {
  DescriptionText,
  EmptyScorecardIconWrapper,
  EmptyScorecardInfo,
  Header,
  LabelText,
  Option,
  ScorecardInfoWrapper,
} from './styled';

export default function ScorecardItem({
  testId,
  option,
}: {
  testId?: string;
  option: ScorecardOption;
}) {
  const { componentType, label, importance, description } = option;

  return (
    <Option data-testid={testId}>
      <div>
        <ComponentTypeIcon type={componentType} />
      </div>
      <ScorecardInfoWrapper>
        <Header>
          <LabelText>{label}</LabelText>
          <ScorecardStandardIcon importance={importance} size="small" />
        </Header>
        <DescriptionText>{description}</DescriptionText>
      </ScorecardInfoWrapper>
    </Option>
  );
}

function EmptyGlyph(props: CustomGlyphProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    />
  );
}

function EmptyScorecardIcon(props: GlyphProps) {
  return (
    <EmptyScorecardIconWrapper>
      <Icon glyph={EmptyGlyph} {...props} />
    </EmptyScorecardIconWrapper>
  );
}

export function ScorecardLoadingItem({
  testId = 'dragonfruit-scorecard-loading-item',
}: {
  testId?: string;
}) {
  return (
    <Option data-testid={testId}>
      <EmptyScorecardIcon label="loadingIcon" />
      <ScorecardInfoWrapper>
        <EmptyScorecardInfo />
      </ScorecardInfoWrapper>
    </Option>
  );
}
