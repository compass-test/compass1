import React from 'react';
import { injectIntl } from 'react-intl';
import { ExitingPersistence, SlideIn } from '@atlaskit/motion';
import ViralSettingsModal from '../ViralSettingsModal/ViralSettingsModal';
import { Heading, Header, Container, SlideAnimationWrapper } from './styled';
import { messages } from '../i18n/messages';
import { ComponentProps } from './types';
import OpenInviteCheckbox from './OpenInviteCheckbox';
import DirectAccessCheckboxList from './DirectAccessCheckboxList';
import { getProductTitle } from '../../utils';

export const ViralSettingsComponent = (props: ComponentProps) => {
  const {
    product,
    viralSettingsByDomain,
    showOpenInvite,
    onOpenInviteChange,
    handleViralSettingsByDomainCheckbox,
    openInviteEnabled,
    intl: { formatMessage },
  } = props;

  const eligibleDomains = Object.keys(viralSettingsByDomain).filter(
    (domain) => viralSettingsByDomain[domain].desPromotionEligible,
  );
  const productTitle = getProductTitle(product);

  return (
    <ExitingPersistence>
      {(showOpenInvite || eligibleDomains.length > 0) && (
        <SlideAnimationWrapper>
          <SlideIn enterFrom="top" fade="inout">
            {(props) => (
              <Container
                data-testid="testId-invite-people-viral-settings"
                {...props}
              >
                <Header>
                  <Heading data-testid="testId-invite-people-viral-settings-title">
                    {formatMessage(messages.viralSettingsHeading, {
                      product: productTitle,
                    })}
                  </Heading>
                  <ViralSettingsModal
                    selectedProductLabel={productTitle}
                    viralSettingsByDomain={viralSettingsByDomain}
                    onOpenInviteChange={onOpenInviteChange}
                    openInviteIsChecked={openInviteEnabled}
                    onDomainChange={handleViralSettingsByDomainCheckbox}
                    showOpenInvite={showOpenInvite}
                  />
                </Header>
                <OpenInviteCheckbox
                  show={showOpenInvite}
                  isChecked={openInviteEnabled}
                  onChange={onOpenInviteChange}
                />
                <DirectAccessCheckboxList
                  viralSettingsByDomain={viralSettingsByDomain}
                  onChange={handleViralSettingsByDomainCheckbox}
                />
              </Container>
            )}
          </SlideIn>
        </SlideAnimationWrapper>
      )}
    </ExitingPersistence>
  );
};

export default injectIntl(ViralSettingsComponent);
