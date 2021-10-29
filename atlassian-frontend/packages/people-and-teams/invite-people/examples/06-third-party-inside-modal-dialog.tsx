import React, { useEffect, useState, forwardRef } from 'react';
import fetchMock from 'fetch-mock/cjs/client';
import { addLocaleData } from 'react-intl';

import Flag, { FlagGroup } from '@atlaskit/flag';
import Button from '@atlaskit/button/standard-button';
import { RadioGroup } from '@atlaskit/radio';
import { Checkbox } from '@atlaskit/checkbox';
import ModalDialog, {
  ModalBodyProps as BodyComponentProps,
} from '@atlaskit/modal-dialog';

import { withAnalyticsLogger } from './helpers';

import {
  MICROSOFT_SERVICE,
  GOOGLE_SERVICE,
} from '../src/components/ThirdParty/constants';

import InvitePeople from '../src';
import { UserRole, SubProduct } from '../src/types';
import {
  productOptions,
  subProductOptions,
  userRoleOptions,
} from './helpers/uiOptions';
import {
  InviteFixture,
  toCurrentAri,
  ProductId,
  LocaleFixture,
} from './helpers/invite-fixture';

import {
  mockIntegrationsResponse,
  mockSlackWorkspacesConfluenceResponse,
  mockSlackWorkspacesJiraResponse,
  mockIntegrationsSearchResponse,
  mockSlackConversationsJiraResponse,
  mockSlackConversationsResponse,
  mockLoggedInUser,
  mockExusIntegrationsResponse,
  mockExusIntegrationsSearchResponse,
  mockIsSlackJiraEnabled,
  mockGetJiraTeams,
  mockGetJiraUsers,
} from './helpers/thirdPartyData';
import { supportedLocales } from '../src/components/i18n/utils';

const loadReactLocaleData = () => {
  supportedLocales.forEach((locale: string) => {
    const languageCode = locale.split('-')[0];
    const data = require(`react-intl/locale-data/${languageCode}`);
    addLocaleData(data);
  });
};
loadReactLocaleData();

const CustomBody = forwardRef((props: BodyComponentProps, ref: any) => {
  return (
    <div
      {...props}
      style={{
        padding: '0px',
      }}
      ref={ref}
    />
  );
});

const ModalDialogExample = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const openDialog = React.useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = React.useCallback(() => setIsDialogOpen(false), []);
  const [userRole, setUserRole] = useState<UserRole>('basic');
  const [product, setProduct] = useState<ProductId>('jira');
  const [subProduct, setSubProduct] = useState('core');
  const [hasMicrosoft, setHasMicrosoft] = useState(false);
  const [hasGoogle, setHasGoogle] = useState(false);
  const [thirdPartyApiV2, setThirdPartyApiV2] = useState(false);
  const [key, setKey] = useState('');
  const [locale, setLocale] = useState('en');
  const [enableSlackv2, setSlackv2] = useState(false);

  const [flags, setFlags] = React.useState<any[]>([]);
  const showFlag = (newFlag: any) => {
    setFlags((prevFlags) => [
      ...prevFlags,
      { ...newFlag, appearance: 'normal' },
    ]);
  };
  const dismissFlags = () => {
    setFlags((prevFlags) => prevFlags.slice(1));
  };

  useEffect(() => {
    mockLoggedInUser();
    mockSlackWorkspacesJiraResponse();
    mockSlackWorkspacesConfluenceResponse();
    mockIntegrationsSearchResponse();
    mockExusIntegrationsSearchResponse();
    mockSlackConversationsJiraResponse();
    mockSlackConversationsResponse();
    mockIsSlackJiraEnabled();
    mockGetJiraTeams();
    mockGetJiraUsers();
  }, []);

  useEffect(() => {
    const existingIntegrations = [
      hasMicrosoft ? MICROSOFT_SERVICE : undefined,
      hasGoogle ? GOOGLE_SERVICE : undefined,
    ].filter((v) => v) as string[];

    mockIntegrationsResponse(existingIntegrations);
    mockExusIntegrationsResponse(existingIntegrations);

    setKey(
      [
        userRole,
        product,
        subProduct,
        hasGoogle,
        hasMicrosoft,
        locale,
        enableSlackv2,
        thirdPartyApiV2,
      ].join('-'),
    );
  }, [
    userRole,
    product,
    subProduct,
    hasMicrosoft,
    hasGoogle,
    locale,
    enableSlackv2,
    thirdPartyApiV2,
  ]);

  useEffect(() => {
    return () => {
      fetchMock.done();
    };
  }, []);

  return (
    <InviteFixture locale={locale}>
      {({ InviteFixtureSettings, inviteFixtureKey, innerProps }) => (
        <>
          <section
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexFlow: 'row-wrap',
            }}
          >
            <div style={{ width: '30%' }}>
              <h4>User permission level:</h4>
              <RadioGroup
                options={userRoleOptions}
                onChange={(e) => setUserRole(e.currentTarget.value as UserRole)}
                value={userRole}
              />
              <div>
                <strong>NOTE: Set ^^ to admin</strong> or trusted, otherwise
                product select will be suppressed.
              </div>
              <h4>Other</h4>
              <Checkbox
                label="Enable Slack v2?"
                value="false"
                name="enableSlackv2"
                onChange={(e) => setSlackv2(e.currentTarget.checked)}
                isChecked={enableSlackv2}
              />
              <Checkbox
                label="Google connected?"
                value="turnOnGoogleIntegration"
                name="turnOnGoogleIntegration"
                onChange={(e) => setHasGoogle(e.currentTarget.checked)}
                isChecked={hasGoogle}
              />
              <Checkbox
                label="Microsoft connected?"
                value="turnOnMicrosoftIntegraton"
                name="turnOnMicrosoftIntegraton"
                onChange={(e) => setHasMicrosoft(e.currentTarget.checked)}
                isChecked={hasMicrosoft}
              />
              <h4>Third Party API Version</h4>
              <Checkbox
                label="Use V2?"
                value="turnOnThirdPartyApiV2"
                name="turnOnThirdPartyApiV2"
                onChange={(e) => setThirdPartyApiV2(e.currentTarget.checked)}
                isChecked={thirdPartyApiV2}
              />
            </div>
            <div style={{ width: '25%' }}>
              <h4>Product:</h4>
              <RadioGroup
                options={productOptions}
                onChange={(e) => {
                  setProduct(e.currentTarget.value as ProductId);
                  setSubProduct('');
                }}
                value={product}
              />
              {product === 'jira' && (
                <>
                  <h4>Sub-product:</h4>
                  <RadioGroup
                    options={subProductOptions}
                    onChange={(e) => setSubProduct(e.currentTarget.value)}
                    value={subProduct}
                  />
                </>
              )}
            </div>
            <div>
              <h4>Invite capabilities</h4>
              <InviteFixtureSettings {...innerProps} />
              <h4>Locale</h4>
              <LocaleFixture locale={locale} setLocale={setLocale} />
            </div>
          </section>
          <Button onClick={openDialog}>Invite People</Button>
          {isDialogOpen && (
            <ModalDialog
              autoFocus={false}
              onClose={closeDialog}
              shouldScrollInViewport
              width="small"
            >
              <CustomBody>
                <>
                  <InvitePeople
                    key={[key, inviteFixtureKey].join('-')}
                    thirdPartyApiV2={thirdPartyApiV2}
                    alignButtons="right"
                    allowAddMoreFields={true}
                    continueUrl="http://test.com"
                    defaultNumberOfInputs={3}
                    maxNumberOfInputs={10}
                    resourceAri={toCurrentAri(product)}
                    showFlag={showFlag}
                    userRole={userRole as UserRole}
                    enableInviteeList={true}
                    subProduct={subProduct as SubProduct}
                    enableThirdParty={true}
                    onCancelHandler={closeDialog}
                    thirdPartySlackv2Enabled={enableSlackv2}
                  />
                  <FlagGroup label="test" onDismissed={dismissFlags}>
                    {flags.map((flag, index) => (
                      <Flag key={index} {...flag} />
                    ))}
                  </FlagGroup>
                </>
              </CustomBody>
            </ModalDialog>
          )}
        </>
      )}
    </InviteFixture>
  );
};

export default withAnalyticsLogger(ModalDialogExample);
