import React from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { LiteUpgradeMessage } from '../LiteUpgradeMessage/LiteUpgradeMessage';

import {
  IntlListProjectFormsHeaderMessages,
  ListProjectFormsHeaderMessage,
} from './ListProjectFormsHeaderMessages.intl';

export const ListProjectFormsHeader = () => {
  return (
    <Wrapper>
      {
        // @ts-ignore
        <LiteUpgradeMessage
          title={
            IntlListProjectFormsHeaderMessages[
              ListProjectFormsHeaderMessage.LiteLicenseTitle
            ]
          }
          contents={
            <>
              <p>
                <FormattedMessage
                  {...IntlListProjectFormsHeaderMessages[
                    ListProjectFormsHeaderMessage.LiteLicenseDesc1
                  ]}
                />
              </p>
              <ul>
                <li>
                  <FormattedMessage
                    {...IntlListProjectFormsHeaderMessages[
                      ListProjectFormsHeaderMessage.LiteLicenseDesc2
                    ]}
                  />
                </li>
                <li>
                  <FormattedMessage
                    {...IntlListProjectFormsHeaderMessages[
                      ListProjectFormsHeaderMessage.LiteLicenseDesc3
                    ]}
                  />
                </li>
                <li>
                  <FormattedMessage
                    {...IntlListProjectFormsHeaderMessages[
                      ListProjectFormsHeaderMessage.LiteLicenseDesc5
                    ]}
                  />
                </li>
                <li>
                  <FormattedMessage
                    {...IntlListProjectFormsHeaderMessages[
                      ListProjectFormsHeaderMessage.LiteLicenseDesc4
                    ]}
                  />
                </li>
              </ul>
            </>
          }
        />
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 750px;
  margin: 0 auto;
  margin-bottom: 20px;
`;
