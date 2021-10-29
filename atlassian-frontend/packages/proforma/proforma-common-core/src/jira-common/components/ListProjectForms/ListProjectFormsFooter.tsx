import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import SectionMessage from '@atlaskit/section-message';

import { useProjectDisabled } from '../../context/ProjectDisabledContext';
import { HowFormsWork } from '../HowFormsWork/HowFormsWork';
import { PfLink } from '../links';

import {
  IntlListProjectFormsFooterMessages,
  ListProjectFormsFooterMessage,
} from './ListProjectFormsFooterMessages.intl';

export const ListProjectFormsFooter = injectIntl(
  ({ intl }: InjectedIntlProps) => {
    const projectDisabled = useProjectDisabled();
    return (
      <>
        <Wrapper>
          {projectDisabled && (
            <SectionMessage
              title={intl.formatMessage(
                IntlListProjectFormsFooterMessages[
                  ListProjectFormsFooterMessage.FormsDisabledTitle
                ],
              )}
              appearance="warning"
            >
              <p>
                <FormattedMessage
                  {...IntlListProjectFormsFooterMessages[
                    ListProjectFormsFooterMessage.FormsDisabledMsg
                  ]}
                />
              </p>
              <p>
                <FormattedMessage
                  {...IntlListProjectFormsFooterMessages[
                    ListProjectFormsFooterMessage.WithFormsYouCan
                  ]}
                />
              </p>
              <ul>
                <li>
                  <strong>
                    <FormattedMessage
                      {...IntlListProjectFormsFooterMessages[
                        ListProjectFormsFooterMessage
                          .EasilyBuildAndMaintainForms
                      ]}
                    />
                  </strong>
                  {' - '}
                  <FormattedMessage
                    {...IntlListProjectFormsFooterMessages[
                      ListProjectFormsFooterMessage
                        .EasilyBuildAndMaintainFormsDesc
                    ]}
                  />
                </li>
                <li>
                  <strong>
                    <FormattedMessage
                      {...IntlListProjectFormsFooterMessages[
                        ListProjectFormsFooterMessage.CollectBetterData
                      ]}
                    />
                  </strong>
                  {' - '}
                  <FormattedMessage
                    {...IntlListProjectFormsFooterMessages[
                      ListProjectFormsFooterMessage.CollectBetterDataDesc1
                    ]}
                  />{' '}
                  <PfLink
                    href="http://links.thinktilt.net/proforma-features"
                    message={
                      IntlListProjectFormsFooterMessages[
                        ListProjectFormsFooterMessage.CollectBetterDataDesc2
                      ]
                    }
                  />{' '}
                  <FormattedMessage
                    {...IntlListProjectFormsFooterMessages[
                      ListProjectFormsFooterMessage.CollectBetterDataDesc3
                    ]}
                  />
                </li>
                <li>
                  <strong>
                    <FormattedMessage
                      {...IntlListProjectFormsFooterMessages[
                        ListProjectFormsFooterMessage.PublishForms
                      ]}
                    />
                  </strong>
                  {' - '}
                  <FormattedMessage
                    {...IntlListProjectFormsFooterMessages[
                      ListProjectFormsFooterMessage.PublishFormsDesc
                    ]}
                  />
                </li>
              </ul>
              <p>
                <PfLink
                  href="http://links.thinktilt.net/proforma-features"
                  message={
                    IntlListProjectFormsFooterMessages[
                      ListProjectFormsFooterMessage.PublishFormsLink
                    ]
                  }
                />
              </p>
            </SectionMessage>
          )}
        </Wrapper>
        <HowFormsWork />
      </>
    );
  },
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 750px;
  margin: 20px auto;
`;
