import React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { messages } from '../i18n';

import * as styled from './styled';

type Props = InjectedIntlProps;

const ROBOTS_SRC =
  'https://home-static.us-east-1.prod.public.atl-paas.net/d138e521b9ef92669ae8d5c34874d91c.png';

export const ErrorScreenComponent = (props: Props) => (
  <styled.ErrorBoundaryBox>
    <styled.ErrorContent>
      <styled.RobotsImg
        src={ROBOTS_SRC}
        alt={props.intl.formatMessage(messages.errorImageAltText)}
      />
      <styled.ErrorHeading>
        <FormattedMessage {...messages.errorHeading} />
      </styled.ErrorHeading>
      <styled.ErrorMessage>
        <FormattedMessage {...messages.errorText} />
      </styled.ErrorMessage>
    </styled.ErrorContent>
  </styled.ErrorBoundaryBox>
);

export const ErrorScreen = injectIntl(ErrorScreenComponent);
