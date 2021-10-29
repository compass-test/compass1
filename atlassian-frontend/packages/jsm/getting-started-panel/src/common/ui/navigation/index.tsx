import React, { ComponentType, ReactNode } from 'react';

import { injectIntl, InjectedIntlProps } from 'react-intl';

import Button from '@atlaskit/button';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import MediaServicesFitToPageIcon from '@atlaskit/icon/glyph/media-services/fit-to-page';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { navigationActionSubjectIds } from '../../../common/analytics/constants';
import { getComponentTestId } from '../../util';
import { messages } from './messages';
import { TitleRow, Heading } from './styled';

export const Navigation: ComponentType<
  {
    children: ReactNode;
    onClose: () => void;
    onBack: () => void;
  } & InjectedIntlProps
> = ({ children, onClose, onBack, intl }) => {
  return (
    <TitleRow>
      <Button
        spacing="none"
        onClick={(_, analyticsEvent) => {
          fireUIAnalytics(analyticsEvent, navigationActionSubjectIds.back);
          onBack();
        }}
        iconBefore={<ArrowLeftIcon label={intl.formatMessage(messages.back)} />}
        appearance="subtle"
        testId={getComponentTestId('backButton')}
      />
      <Heading>{children}</Heading>
      <Button
        spacing="none"
        onClick={(_, analyticsEvent) => {
          fireUIAnalytics(analyticsEvent, navigationActionSubjectIds.close);
          onClose();
        }}
        iconBefore={
          <MediaServicesFitToPageIcon
            label={intl.formatMessage(messages.collapsePanel)}
          />
        }
        appearance="subtle"
        testId={getComponentTestId('minimizeButton')}
      />
    </TitleRow>
  );
};

export default injectIntl(Navigation);
