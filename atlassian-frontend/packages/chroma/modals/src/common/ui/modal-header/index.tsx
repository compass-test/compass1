import React from 'react';

import { FormattedMessage } from 'react-intl';

import { UIAnalyticsEvent, useAnalyticsEvents } from '@atlaskit/analytics-next';
import CrossIcon from '@atlaskit/icon/glyph/cross';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { ANALYTICS_X_CLOSE_BUTTON_ID } from '../../constants';

import {
  CloseButton,
  Heading,
  ModalHeaderImage,
  ModalHeaderStyling,
  ModalHeaderText,
  Root,
  Subheading,
} from './styled';
import { ModalHeaderProps } from './types';

export const ModalHeader = ({
  imageSrc,
  heading,
  subheading,
  hideCloseButton = false,
  onClose,
  analyticsAttributes,
}: ModalHeaderProps) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const hideHeaderText = !heading && !subheading;
  const closeButton = hideCloseButton ? null : (
    <CloseButton
      onClick={(event: any, analyticsEvent?: UIAnalyticsEvent) => {
        let ae = analyticsEvent;
        if (!ae) {
          ae = createAnalyticsEvent({
            action: 'clicked',
            actionSubject: 'button',
            source: analyticsAttributes.sourceScreen,
          });
        }
        fireUIAnalytics(ae, ANALYTICS_X_CLOSE_BUTTON_ID, analyticsAttributes);
        onClose();
      }}
      disabled={hideCloseButton}
    >
      <CrossIcon label="Close Modal" primaryColor={colors.N0} size="medium" />
    </CloseButton>
  );
  return (
    <Root>
      {closeButton}
      <ModalHeaderStyling>
        {hideHeaderText || (
          <ModalHeaderText>
            <Heading>{heading && <FormattedMessage {...heading} />}</Heading>
            <Subheading>
              {subheading && <FormattedMessage {...subheading} />}
            </Subheading>
          </ModalHeaderText>
        )}
        {typeof imageSrc === 'string' ? (
          <ModalHeaderImage
            src={imageSrc}
            alt="dialog-header-image"
            centered={hideHeaderText}
          />
        ) : (
          imageSrc
        )}
      </ModalHeaderStyling>
    </Root>
  );
};

export default ModalHeader;
