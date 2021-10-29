import React from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { withIntlProvider } from '../../intl-provider';

import { IntlViewFormMessages, ViewFormMessage } from './ViewFormMessages.intl';

export const BlankForm = withIntlProvider(
  observer(() => {
    return (
      <BlankFormMessageWrapperStyles>
        <h4>
          <FormattedMessage
            {...IntlViewFormMessages[ViewFormMessage.BlankFormMsg]}
          />
        </h4>
      </BlankFormMessageWrapperStyles>
    );
  }),
);

const BlankFormMessageWrapperStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34.4rem;
`;
