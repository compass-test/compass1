import React, { useEffect, useState } from 'react';
import Flag, { FlagGroup } from '@atlaskit/flag';
import { RadioGroup } from '@atlaskit/radio';
import { Checkbox } from '@atlaskit/checkbox';
import { withAnalyticsLogger } from './helpers';
import {
  productOptions,
  sourceOptions,
  subProductOptions,
  userRoleOptions,
  selectInputOptions,
} from './helpers/uiOptions';
import {
  getInviteFixtureForAllProducts,
  InviteFixture,
  mockInvite,
  mockRequestAccess,
  LocaleFixture,
} from './helpers/invite-fixture';
import { ViralSettingsCohort, Cohort } from '../src/types';
import InvitePeople from '../src';
import { UserRole, SubProduct } from '../src/types';
import {
  mockGetDirectAccessSetting,
  mockGetOpenInviteSetting,
  mockPutOpenInviteSetting,
  mockPostDirectAccessSetting,
  mockHISIGetFlag,
} from './helpers/viralSettingsData';
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
} from './helpers/thirdPartyData';

import {
  MICROSOFT_SERVICE,
  GOOGLE_SERVICE,
} from '../src/components/ThirdParty/constants';

const DefaultExample = () => {
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [product, setProduct] = useState('jira');
  const [viralSettingsCohort, setViralSettingsCohort] = useState(
    ViralSettingsCohort.VARIATION,
  );
  const [
    viralOptionsCheckedByDefault,
    setViralOptionsCheckedByDefault,
  ] = useState(true);
  const [haveISeenItMockReturnsSeen, setHaveISeenItMockReturnsSeen] = useState(
    false,
  );
  const [subProduct, setSubProduct] = useState<SubProduct | ''>('software');
  const [source, setSource] = useState('peopleMenu');
  const [
    enableCustomizedProductSelect,
    setEnableCustomizedProductSelect,
  ] = useState(true);
  const [selectedInputItem, setSelectedInputItem] = useState('userPicker');
  const jiraProjectName = product === 'jira' ? 'Nucleus' : undefined;
  const jiraProjectKey = product === 'jira' ? 'NUC' : undefined;
  const [flags, setFlags] = React.useState<any[]>([]);
  const [locale, setLocale] = useState('en');
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
    mockGetDirectAccessSetting();
    mockGetOpenInviteSetting();
    mockPutOpenInviteSetting();
    mockPostDirectAccessSetting();
  }, []);
  useEffect(() => {
    mockLoggedInUser();
    mockSlackWorkspacesJiraResponse();
    mockSlackWorkspacesConfluenceResponse();
    mockIntegrationsSearchResponse();
    mockExusIntegrationsSearchResponse();
    mockSlackConversationsJiraResponse();
    mockSlackConversationsResponse();
  }, []);
  useEffect(() => {
    const existingIntegrations = [MICROSOFT_SERVICE, GOOGLE_SERVICE].filter(
      (v) => v,
    ) as string[];

    mockIntegrationsResponse(existingIntegrations);
    mockExusIntegrationsResponse(existingIntegrations);
  }, [userRole, product, subProduct]);

  useEffect(() => {
    mockHISIGetFlag(haveISeenItMockReturnsSeen);
  }, [haveISeenItMockReturnsSeen]);

  return (
    <InviteFixture
      locale={locale}
      initialInviteFixture={getInviteFixtureForAllProducts([
        mockInvite('jira-software'),
        mockInvite('jira-core'),
        mockInvite('jira-servicedesk'),
        mockRequestAccess('confluence'),
      ])}
    >
      {({ inviteFixtureKey, innerProps }) => (
        <>
          <section
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexFlow: 'row-wrap',
            }}
          >
            <div>
              <h4>Touchpoint:</h4>
              <RadioGroup
                options={sourceOptions}
                onChange={(e) => setSource(e.currentTarget.value)}
                value={source}
              />
              <h4>User permission level:</h4>
              <RadioGroup
                options={userRoleOptions}
                onChange={(e) => setUserRole(e.currentTarget.value as UserRole)}
                value={userRole}
              />
              <h4>Other</h4>
              <Checkbox
                label="Customised Product Selector"
                value="enableCustomizedProductSelect"
                name="enableCustomizedProductSelect"
                onChange={(e) =>
                  setEnableCustomizedProductSelect(e.currentTarget.checked)
                }
                isChecked={enableCustomizedProductSelect}
              />
            </div>
            <div>
              <h4>Invite Select Type:</h4>
              <RadioGroup
                options={selectInputOptions}
                onChange={(e) => setSelectedInputItem(e.currentTarget.value)}
                value={selectedInputItem}
              />
              {product === 'jira' && (
                <>
                  <h4>Sub-product:</h4>
                  <RadioGroup
                    options={subProductOptions}
                    onChange={(e) =>
                      setSubProduct(e.currentTarget.value as SubProduct)
                    }
                    value={subProduct}
                  />
                </>
              )}
            </div>
            <div>
              <h4>Product:</h4>
              <RadioGroup
                options={productOptions}
                onChange={(e) => {
                  setProduct(e.currentTarget.value);
                  setSubProduct('');
                }}
                value={product}
              />
              <h4>Viral Settings</h4>
              <Checkbox
                label="Enable Viral Settings"
                name="viralSettingsCohort"
                onChange={(e) =>
                  setViralSettingsCohort(
                    e.currentTarget.checked
                      ? ViralSettingsCohort.VARIATION
                      : ViralSettingsCohort.NOT_ENROLLED,
                  )
                }
                isChecked={
                  viralSettingsCohort === ViralSettingsCohort.VARIATION
                }
              />
              <Checkbox
                label="Enable Viral Settings Checked by Default (WIP)"
                value="viralOptionsCheckedByDefault"
                name="viralOptionsCheckedByDefault"
                onChange={(e) =>
                  setViralOptionsCheckedByDefault(e.currentTarget.checked)
                }
                isChecked={viralOptionsCheckedByDefault}
              />
              {viralOptionsCheckedByDefault && (
                <Checkbox
                  label="Have I Seen It Mock Returns Checkbox Seen"
                  value="haveISeenItMockReturnsSeen"
                  name="haveISeenItMockReturnsSeen"
                  onChange={(e) =>
                    setHaveISeenItMockReturnsSeen(e.currentTarget.checked)
                  }
                  isChecked={haveISeenItMockReturnsSeen}
                />
              )}
              <h4>Locale</h4>
              <LocaleFixture locale={locale} setLocale={setLocale} />
            </div>
          </section>
          <InvitePeople
            key={`${userRole}-${product}-${subProduct}-${selectedInputItem}-${haveISeenItMockReturnsSeen}-${inviteFixtureKey}`}
            alignButtons={'right'}
            allowAddMoreFields
            continueUrl="http://test.com"
            defaultNumberOfInputs={3}
            maxNumberOfInputs={10}
            resourceAri={`ari:cloud:${product}::site/5e982da0-ca43-4e91-b5ba-6fdadf1df292`}
            showFlag={showFlag}
            userRole={userRole as UserRole}
            enableInviteeList
            enableCustomizedProductSelect={enableCustomizedProductSelect}
            thirdPartyInvitesCohort={
              selectedInputItem === 'userPicker'
                ? Cohort.EXPERIMENT
                : Cohort.NOT_ENROLLED
            }
            subProduct={subProduct as SubProduct}
            hideCancelButton={false}
            source={source}
            jiraProjectName={jiraProjectName}
            jiraProjectKey={jiraProjectKey}
            viralSettingsCohort={viralSettingsCohort}
            viralOptionsDefaultToCheckedFeatureFlag={
              viralOptionsCheckedByDefault ? { value: true } : { value: false }
            }
          />
          <FlagGroup label="test" onDismissed={dismissFlags}>
            {flags.map((flag, index) => (
              <Flag key={index} {...flag} />
            ))}
          </FlagGroup>
        </>
      )}
    </InviteFixture>
  );
};

export default withAnalyticsLogger(DefaultExample);
