import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Button from '@atlaskit/button';
import MediaServicesFitToPageIcon from '@atlaskit/icon/glyph/media-services/fit-to-page';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { N0 } from '@atlaskit/theme/colors';

import { navigationActionSubjectIds } from '../../../common/analytics/constants';
import { getComponentTestId } from '../../../common/util';
import IconRocket from '../../../common/ui/avatar/assets/Rocket';
import { TitleRow, Heading } from './styled';
import { messages } from './messages';
import { HeaderCardContainer, RocketContainer } from './styled';

interface Props {
  onClose: () => void;
}

export const HeaderCard = ({ onClose, intl }: Props & InjectedIntlProps) => {
  return (
    <HeaderCardContainer>
      <TitleRow>
        <Heading>{intl.formatMessage(messages.yourCoach)}</Heading>
        <Button
          spacing="none"
          onClick={(_, analyticsEvent) => {
            fireUIAnalytics(analyticsEvent, navigationActionSubjectIds.close);
            onClose();
          }}
          iconBefore={
            <MediaServicesFitToPageIcon
              label={intl.formatMessage(messages.collapsePanel)}
              primaryColor={N0}
            />
          }
          testId={getComponentTestId('homeSectionMinimizeButton')}
        />
      </TitleRow>
      <RocketContainer>
        <IconRocket />
      </RocketContainer>
    </HeaderCardContainer>
  );
};

export default injectIntl(HeaderCard);
