// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

import LightbulbFilledIcon from '@atlaskit/icon/glyph/lightbulb-filled';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import {
  ButtonTitle,
  ChecklistButton,
  ChecklistButtonWrapper,
  dismissButtonInlineStyles,
} from './styled';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import messages from './messages';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import Button from '@atlaskit/button/standard-button';

export type ChecklistButtonProps = {
  isOpen: boolean;
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  completed?: boolean;
  // Passing onDismiss functionality will add a dismiss button
  onDismiss?: (
    e: React.MouseEvent<HTMLElement>,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
} & InjectedIntlProps;

export default injectIntl(
  ({
    isOpen,
    title,
    completed,
    onClick,
    onDismiss,
    intl,
  }: ChecklistButtonProps) => {
    const hasDismissButton = typeof onDismiss === 'function';

    return (
      <ChecklistButtonWrapper
        isOpen={isOpen}
        hasDismissButton={hasDismissButton}
      >
        <ChecklistButton
          completed={Boolean(completed)}
          onClick={onClick}
          hasDismissButton={hasDismissButton}
        >
          <LightbulbFilledIcon
            size="medium"
            primaryColor={colors.N0}
            label="check"
          />
          <ButtonTitle>{title}</ButtonTitle>
        </ChecklistButton>
        {hasDismissButton && (
          <Button
            onClick={onDismiss}
            style={dismissButtonInlineStyles}
            aria-label={intl.formatMessage(
              { ...messages.dismissButtonAria },
              { title },
            )}
            iconBefore={
              <CrossCircleIcon
                label=""
                size="large"
                primaryColor={completed ? colors.G500 : colors.P500}
                secondaryColor={completed ? colors.G50 : colors.P50}
                aria-hidden="true"
              />
            }
            testId={'checklist-button--dismiss-button'}
          />
        )}
      </ChecklistButtonWrapper>
    );
  },
);
