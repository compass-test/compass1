import React, { useContext } from 'react';

import { FormattedMessage } from 'react-intl';

import { LinkItem, Section } from '@atlaskit/menu';

import { PeopleMenuContext } from '../../context/PeopleMenuContext';
import { getPeopleProfilePage } from '../../utils/url';
import { messages } from '../i18n';

export function ViewProfileMenuItem() {
  const { testId, product, userId } = useContext(PeopleMenuContext);

  const href = getPeopleProfilePage(product, userId);

  return (
    <Section>
      <LinkItem href={href} testId={`${testId}-view-your-profile`}>
        <FormattedMessage {...messages.viewYourProfile} />
      </LinkItem>
    </Section>
  );
}
