import React from 'react';

import { FormattedMessage } from 'react-intl';

// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { FeatureItem as FeatureItemType } from '../types';

import {
  FeatureContent,
  FeatureDescription,
  FeatureItemWrapper,
  FeatureTitle,
} from './styled';

interface FeatureItemProps extends FeatureItemType {}

const FeatureItem = ({
  title,
  description,
  icon: IconComponent,
}: FeatureItemProps) => {
  return (
    <FeatureItemWrapper>
      <IconComponent
        size="large"
        // TODO: translations for this?
        label={`Confluence free feature icon`}
        primaryColor={colors.N500}
      />
      <FeatureContent>
        <FeatureTitle>
          <FormattedMessage {...title} />
        </FeatureTitle>
        <FeatureDescription>
          <FormattedMessage {...description} />
        </FeatureDescription>
      </FeatureContent>
    </FeatureItemWrapper>
  );
};

export default FeatureItem;
