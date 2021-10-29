import React, { useEffect, useRef, useState } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import SectionMessage from '@atlaskit/section-message';
import Textfield from '@atlaskit/textfield';
import { N200, N800 } from '@atlaskit/theme/colors';
import {
  FormField,
  LearnMoreLink,
} from '@atlassian/proforma-common-core/jira-common';

import { MediaParameters } from '../../models/MediaParameters';

import {
  IntlMediaSidebarMessages,
  MediaSidebarMessages,
} from './MediaSidebarMessages.intl';

interface MediaSidebarProps {
  parameters: MediaParameters;
  updateSelection: (parameters: MediaParameters) => void;
}

export const MediaSidebar = injectIntl(
  ({
    parameters,
    updateSelection,
    intl,
  }: MediaSidebarProps & InjectedIntlProps) => {
    const checkValidUrl = (url: string): boolean => {
      const trimmedUrl = url.trim().toLowerCase();
      return (
        trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')
      );
    };

    /**
     * Set to true whenever the section has changed, but should only be updated after a delay.
     * This is used for changes which are typed in to avoid updating on every keypress.
     */
    const updateAfterDelay = useRef(false);

    /*** HTML content ***/
    const [url, setUrl] = useState(parameters.url || '');
    const [isValidUrl, setIsValidUrl] = useState(checkValidUrl(url));
    const errorMessage = isValidUrl ? undefined : (
      <FormattedMessage
        {...IntlMediaSidebarMessages[MediaSidebarMessages.ImageUrlErrorMessage]}
      />
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newUrl = e.target.value || '';
      setIsValidUrl(checkValidUrl(newUrl));
      setUrl(newUrl);
      updateAfterDelay.current = true;
    };

    /**
     * Update the section. This should not be called directly, instead triggered by setting
     * updateAfterDelay to true.
     */
    const update = (): void => {
      const updatedUrl = isValidUrl ? url : '';
      updateSelection({
        ...parameters,
        url: updatedUrl,
      });
    };

    useEffect(() => {
      if (updateAfterDelay.current) {
        const id = setTimeout(() => {
          update();
          updateAfterDelay.current = false;
        }, 250);
        return (): void => {
          clearTimeout(id);
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return (
      <SidebarPadding>
        <h3>
          <FormattedMessage
            {...IntlMediaSidebarMessages[MediaSidebarMessages.Heading]}
          />
        </h3>
        <Subheading>
          <FormattedMessage
            {...IntlMediaSidebarMessages[MediaSidebarMessages.SubHeading]}
          />{' '}
          <LearnMoreLink href="http://links.thinktilt.net/images" />
        </Subheading>

        <GroupLabel>
          <FormattedMessage
            {...IntlMediaSidebarMessages[MediaSidebarMessages.ImageUrl]}
          />
        </GroupLabel>
        <FormField error={errorMessage}>
          <Textfield
            name="url"
            placeholder={intl.formatMessage(
              IntlMediaSidebarMessages[
                MediaSidebarMessages.ImageUrlPlaceholder
              ],
            )}
            value={url}
            onChange={onChange}
          />
        </FormField>
        <InfoPanel>
          <SectionMessage
            appearance="warning"
            title={intl.formatMessage(
              IntlMediaSidebarMessages[MediaSidebarMessages.EarlyAccessFeature],
            )}
          >
            <p>
              <FormattedMessage
                {...IntlMediaSidebarMessages[
                  MediaSidebarMessages.IsInEarlyAccess
                ]}
              />
            </p>
            <ul>
              <li>
                <strong>
                  <FormattedMessage
                    {...IntlMediaSidebarMessages[
                      MediaSidebarMessages.ImageHosting
                    ]}
                  />
                </strong>{' '}
                <FormattedMessage
                  {...IntlMediaSidebarMessages[
                    MediaSidebarMessages.ImageHostingDesc
                  ]}
                />
              </li>
              <li>
                <strong>
                  <FormattedMessage
                    {...IntlMediaSidebarMessages[
                      MediaSidebarMessages.Accessible
                    ]}
                  />
                </strong>{' '}
                <FormattedMessage
                  {...IntlMediaSidebarMessages[
                    MediaSidebarMessages.AccessibleDesc
                  ]}
                />
              </li>
              <li>
                <strong>
                  <FormattedMessage
                    {...IntlMediaSidebarMessages[
                      MediaSidebarMessages.ExcludedFromPdf
                    ]}
                  />
                </strong>{' '}
                <FormattedMessage
                  {...IntlMediaSidebarMessages[
                    MediaSidebarMessages.ExcludedFromPdfDesc
                  ]}
                />
              </li>
              <li>
                <strong>
                  <FormattedMessage
                    {...IntlMediaSidebarMessages[
                      MediaSidebarMessages.ClickingAnImage
                    ]}
                  />
                </strong>{' '}
                <FormattedMessage
                  {...IntlMediaSidebarMessages[
                    MediaSidebarMessages.ClickingAnImageDesc
                  ]}
                />
              </li>
            </ul>
            <p>
              <FormattedMessage
                {...IntlMediaSidebarMessages[MediaSidebarMessages.ToObtainUrl]}
              />{' '}
              <strong>
                <FormattedMessage
                  {...IntlMediaSidebarMessages[MediaSidebarMessages.RightClick]}
                />{' '}
              </strong>
              <FormattedMessage
                {...IntlMediaSidebarMessages[MediaSidebarMessages.OnTheImage]}
              />{' '}
              <strong>
                <FormattedMessage
                  {...IntlMediaSidebarMessages[
                    MediaSidebarMessages.CopyImageLocation
                  ]}
                />{' '}
              </strong>
              <FormattedMessage
                {...IntlMediaSidebarMessages[
                  MediaSidebarMessages.PasteLocation
                ]}
              />
            </p>
          </SectionMessage>
        </InfoPanel>
      </SidebarPadding>
    );
  },
);

const InfoPanel = styled.div`
  margin-top: 10px;
  padding: 0;
  font-size: 12px;
`;

const SidebarPadding = styled.div`
  margin-bottom: 30px;
  padding: 24px 16px 0 16px;
`;

const GroupLabel = styled.div`
  font-size: 12px;
  font-style: inherit;
  line-height: 1.33333;
  color: ${N800};
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 4px;
`;

const Subheading = styled.div`
  color: ${N200};
  font-size: 11px;
`;
