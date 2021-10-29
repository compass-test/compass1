import React, { FC } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { ButtonGroup } from '@atlaskit/button';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import Modal, { ModalBody } from '@atlaskit/modal-dialog';
import { AnalyticsButton, ExternalLink } from '@atlassian/mpt-elements';

import type { DataScope } from '../../../common/types';

import { messages } from './messages';
import * as S from './styled';
import { scopeDescriptions } from './utils';

export type Props = {
  appKey: string;
  contactVendorUrl: string;
  name: string;
  privacyPolicyUrl: string;
  vendorName: string;
  dataScopes?: DataScope[];
  isVendorHighlighted?: boolean;
  logoUrl?: string;
  testId?: string;
  onConsent: (appKey: string) => void;
  onClose: () => void;
};

const AppConsentModal: FC<InjectedIntlProps & Props> = ({
  appKey,
  contactVendorUrl,
  name,
  privacyPolicyUrl,
  vendorName,
  dataScopes,
  isVendorHighlighted = false,
  logoUrl,
  testId,
  onConsent,
  onClose,
  intl,
}) => {
  return (
    <Modal width="large" testId={testId} onClose={onClose}>
      <ModalBody>
        <S.Heading>
          <FormattedMessage {...messages.appConsentModalHeading} />
        </S.Heading>
        <S.Wrapper>
          <S.VendorWrapper>
            {logoUrl && (
              <S.Image
                src={logoUrl}
                alt={intl.formatMessage(messages.appConsentVendorLogo, {
                  vendorName,
                })}
              />
            )}
            <S.VendorDescription>
              <h2>{name}</h2>
              <S.VendorInfo>
                <FormattedMessage
                  {...messages.appConsentByVendor}
                  values={{ vendorName }}
                />
                {isVendorHighlighted && (
                  <S.VendorTop data-testid="topVendorLabel">
                    <S.VendorTopIcon>
                      <StarFilledIcon
                        label={intl.formatMessage(
                          messages.appConsentModalTopVendor,
                        )}
                        size="small"
                      />
                    </S.VendorTopIcon>
                    <FormattedMessage {...messages.appConsentModalTopVendor} />
                  </S.VendorTop>
                )}
              </S.VendorInfo>
            </S.VendorDescription>
          </S.VendorWrapper>
          <S.Description>
            <FormattedMessage
              {...messages.appConsetModalDescription}
              values={{ name }}
            />
          </S.Description>
          {dataScopes && (
            <S.ScopeList role="list">
              {dataScopes.map((scope) => {
                const isAppDataOther = scope === 'APP_DATA_OTHER';
                const props = {
                  ...scopeDescriptions[scope],
                  ...(isAppDataOther && { values: { appName: name } }),
                };

                return (
                  <li key={scope}>
                    <FormattedMessage {...props} />
                  </li>
                );
              })}
            </S.ScopeList>
          )}
        </S.Wrapper>
        <S.TermsWrapper>
          <FormattedMessage
            {...messages.appConsentModalTerms}
            values={{
              vendorName,
              marketplaceTerms: (
                <ExternalLink
                  href="https://www.atlassian.com/licensing/marketplace/termsofuse"
                  analyticsId="appConsentModalMarketplaceTerms"
                >
                  <FormattedMessage
                    {...messages.appConsentModalMarketplaceTerms}
                  />
                </ExternalLink>
              ),
              vendorPrivacyPolicy: (
                <ExternalLink
                  href={privacyPolicyUrl}
                  testId="vendorPrivacyPolicyLink"
                  analyticsId="appConsentModalVendorPrivacyPolicy"
                >
                  <FormattedMessage
                    {...messages.appConsentModalVendorPrivacyPolicyLink}
                  />
                </ExternalLink>
              ),
              vendorTerms: (
                <ExternalLink
                  href={contactVendorUrl}
                  testId="vendorTermsLink"
                  analyticsId="appConsentModalVendorTerms"
                >
                  <FormattedMessage
                    {...messages.appConsentModalVendorTermsOfUseLink}
                  />
                </ExternalLink>
              ),
            }}
          />
        </S.TermsWrapper>
        <S.ButtonWrapper>
          <ButtonGroup>
            <AnalyticsButton
              analyticsId="appConsentModalCancel"
              onClick={onClose}
              appearance="subtle"
            >
              <FormattedMessage {...messages.appConsentModalCancelButton} />
            </AnalyticsButton>
            <AnalyticsButton
              analyticsId="appConsentModalConfirm"
              onClick={() => {
                onConsent(appKey);
                onClose();
              }}
              appearance="primary"
              autoFocus
            >
              <FormattedMessage {...messages.appConsentModalConfirmButton} />
            </AnalyticsButton>
          </ButtonGroup>
        </S.ButtonWrapper>
      </ModalBody>
    </Modal>
  );
};

export default injectIntl(AppConsentModal);
