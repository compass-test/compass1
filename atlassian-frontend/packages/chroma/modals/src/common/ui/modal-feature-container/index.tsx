import React from 'react';

import { FormattedMessage } from 'react-intl';

import EditorInfoIcon from '@atlaskit/icon/glyph/editor/info';
import Tooltip from '@atlaskit/tooltip';

import {
  FeatureBody,
  FeatureComponentContainer,
  FeatureContent,
  FeatureImage,
  FeatureImageBlock,
  FeatureInfoIcon,
  FeatureListItemContainer,
  FeatureListItemImageBlock,
  FeatureTitle,
  FeatureTitleIcon,
} from './styled';
import {
  ModalFeatureComponentProps,
  ModalListItemComponentProps,
} from './types';

enum TitleLevel {
  Heading,
  Subheading,
}

const FeatureTextWithIcon = ({
  featureText,
  infoTooltip,
  level,
}: {
  featureText: FormattedMessage.MessageDescriptor;
  infoTooltip?: FormattedMessage.MessageDescriptor;
  level: TitleLevel;
}) => {
  const onTooltipShow = () => {
    //TODO fire analytics event
  };

  return (
    <FeatureTitleIcon>
      {level === TitleLevel.Heading ? (
        <FeatureTitle>
          <FormattedMessage {...featureText} />
        </FeatureTitle>
      ) : (
        <FeatureContent>
          <FormattedMessage {...featureText} />
        </FeatureContent>
      )}
      {infoTooltip && (
        <Tooltip
          content={<FormattedMessage {...infoTooltip} />}
          onShow={onTooltipShow}
        >
          <FeatureInfoIcon>
            <EditorInfoIcon label="" size="medium" />
          </FeatureInfoIcon>
        </Tooltip>
      )}
    </FeatureTitleIcon>
  );
};

export const ModalFeatureComponent = ({
  featureHeading,
  featureContent,
  infoTooltip,
  featureImage,
  isFullWidth,
}: ModalFeatureComponentProps) => {
  return (
    <FeatureComponentContainer isFullWidth={isFullWidth}>
      <FeatureImageBlock isFullWidth={isFullWidth}>
        <FeatureImage src={featureImage} />
      </FeatureImageBlock>
      <FeatureBody>
        <FeatureTextWithIcon
          featureText={featureHeading}
          infoTooltip={infoTooltip}
          level={TitleLevel.Heading}
        />
        <FeatureContent>
          <FormattedMessage {...featureContent} />
        </FeatureContent>
      </FeatureBody>
    </FeatureComponentContainer>
  );
};

export const ModalListItemComponent = ({
  featureContent,
  infoTooltip,
  featureImage,
  isFullWidth,
}: ModalListItemComponentProps) => {
  return (
    <FeatureListItemContainer isFullWidth={isFullWidth}>
      <FeatureListItemImageBlock isFullWidth={isFullWidth}>
        <FeatureImage src={featureImage} />
      </FeatureListItemImageBlock>
      <FeatureBody>
        <FeatureTextWithIcon
          featureText={featureContent}
          infoTooltip={infoTooltip}
          level={TitleLevel.Subheading}
        />
      </FeatureBody>
    </FeatureListItemContainer>
  );
};
