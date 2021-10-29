import React from 'react';
import { AvatarItem } from '@atlaskit/avatar';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import {
  Title,
  Description,
  CardWrapper,
  Blanket,
  PrimaryTextWrapper,
} from './styled';
import Tooltip from '@atlaskit/tooltip';
import { ComponentWithAnalytics } from '../../../../../common/analytics/util';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import { useFeatureFlags } from '../../../../../controllers/feature-flags';

interface Props {
  name: FormattedMessage.MessageDescriptor;
  description?: FormattedMessage.MessageDescriptor;
  icon: React.ReactNode;
  onClick: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  tooltip?: FormattedMessage.MessageDescriptor;
  isDisabled: boolean;
  isActive: boolean;
  renderShortcutIcon: boolean;
}

const TemplateCard = ({
  name,
  description,
  icon,
  intl,
  onClick,
  onMouseEnter,
  tooltip,
  isDisabled,
  isActive,
  renderShortcutIcon,
}: Props & InjectedIntlProps) => {
  const { isProjectPagesProductionisation } = useFeatureFlags();
  const primaryText = isProjectPagesProductionisation ? (
    <PrimaryTextWrapper>
      <Title>{intl.formatMessage(name)}</Title>
      {renderShortcutIcon && <ShortcutIcon size="small" label="open in tab" />}
    </PrimaryTextWrapper>
  ) : (
    <Title>{intl.formatMessage(name)}</Title>
  );
  const card = (
    <CardWrapper
      onMouseEnter={isDisabled ? undefined : onMouseEnter}
      isActive={isActive}
    >
      {isDisabled && <Blanket hasTooltip={!!tooltip} />}
      <AvatarItem
        avatar={icon}
        primaryText={primaryText}
        secondaryText={
          description ? (
            <Description>{intl.formatMessage(description)}</Description>
          ) : undefined
        }
        onClick={onClick}
      />
    </CardWrapper>
  );
  if (tooltip) {
    return <Tooltip content={intl.formatMessage(tooltip)}>{card}</Tooltip>;
  } else {
    return card;
  }
};

// using 'templateButton' to align with non-pages improvements analytics
export default ComponentWithAnalytics('templateButton', {
  onClick: 'clicked',
})(injectIntl(TemplateCard));
