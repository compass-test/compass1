import React from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';

import ArrowUpCircleIcon from '@atlaskit/icon/glyph/arrow-up-circle';
import SectionMessage from '@atlaskit/section-message';
import { MessageDescriptor } from '@atlassian/proforma-translations';

import { withIntlProvider } from '../../../intl-provider';
import { PfLink } from '../links';

import {
  IntlLiteUpgradeMessageMessages,
  LiteUpgradeMessageMessage,
} from './LiteUpgradeMessageMessages.intl';

interface LiteUpgradeMessageProps {
  title: MessageDescriptor;
  contents: JSX.Element;
}

export const LiteUpgradeMessage = withIntlProvider<LiteUpgradeMessageProps>(
  injectIntl(({ title, contents, intl }) => {
    if (true) {
      return <></>;
    }
    return (
      <Wrapper>
        <SectionMessage
          // @ts-ignore
          appearance="change"
          icon={ArrowUpCircleIcon}
          // @ts-ignore
          title={intl.formatMessage(title)}
        >
          {contents}
          <p>
            <FormattedMessage
              {...IntlLiteUpgradeMessageMessages[
                LiteUpgradeMessageMessage.FooterMessage
              ]}
            />{' '}
            <PfLink
              href="https://marketplace.atlassian.com/apps/1215833"
              message={
                IntlLiteUpgradeMessageMessages[
                  LiteUpgradeMessageMessage.FindOutMore
                ]
              }
            />
          </p>
        </SectionMessage>
      </Wrapper>
    );
  }),
);

const Wrapper = styled.div`
  width: 100%;
`;
