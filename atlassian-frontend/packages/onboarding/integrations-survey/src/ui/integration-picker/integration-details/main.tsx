import React from 'react';

import Tooltip from '@atlaskit/tooltip';

import { integrations } from '../../../common/constants';

import {
  IntegrationDetailsDisplayName,
  IntegrationDetailsLogo,
  IntegrationDetailsWrapper,
} from './styled';
import { IntegrationDetailsProps } from './types';

export const IntegrationDetails = ({
  id,
  withTooltip = true,
}: IntegrationDetailsProps) => {
  const { name, fullName, imgSrc } = integrations[id];
  const content = (
    <IntegrationDetailsWrapper>
      <IntegrationDetailsLogo alt={`${name} logo`} src={imgSrc} />
      <IntegrationDetailsDisplayName>{name}</IntegrationDetailsDisplayName>
    </IntegrationDetailsWrapper>
  );

  if (withTooltip) {
    return <Tooltip content={fullName}>{content}</Tooltip>;
  }

  return content;
};
