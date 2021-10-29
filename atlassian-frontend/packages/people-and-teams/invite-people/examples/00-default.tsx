import React, { useState } from 'react';
import { Checkbox } from '@atlaskit/checkbox';
import Flag, { FlagGroup } from '@atlaskit/flag';
import { RadioGroup } from '@atlaskit/radio';

import { withAnalyticsLogger, withIntlProvider } from './helpers';
import {
  productOptions,
  sourceOptions,
  subProductOptions,
  userRoleOptions,
} from './helpers/uiOptions';
import {
  getInviteFixtureForAllProducts,
  InviteFixture,
  InviteFixtureSettings,
  mockInvite,
  mockRequestAccess,
  LocaleFixture,
} from './helpers/invite-fixture';

import InvitePeople from '../src';
import { AlignButtons, UserRole, SubProduct } from '../src/types';

const optionsButtonsAlignment = [
  {
    name: 'Left',
    label: 'Left',
    value: 'left',
  },
  {
    name: 'Right',
    label: 'Right',
    value: 'right',
  },
];

const DefaultExample = () => {
  const [align, setAlign] = useState('right');
  const [hideCancelButton, setHideCancelButton] = useState(false);
  const [allowAddMoreFields, setAllowAddMoreFields] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [maxNumberOfInputs, setMaxNumberOfInputs] = useState(10);
  const [product, setProduct] = useState('jira');
  const [subProduct, setSubProduct] = useState<SubProduct | ''>('core');
  const [source, setSource] = useState('peopleMenu');
  const [locale, setLocale] = useState('en');
  const jiraProjectName = product === 'jira' ? 'Nucleus' : undefined;
  const jiraProjectKey = product === 'jira' ? 'NUC' : undefined;

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
              <h4>Buttons alignment</h4>
              <RadioGroup
                options={optionsButtonsAlignment}
                onChange={(e) => setAlign(e.currentTarget.value)}
                value={align}
              />
              <h4>Other</h4>
              <Checkbox
                label="Hide cancel button?"
                value="hideCancelButton"
                name="hideCancelButton"
                onChange={(e) => setHideCancelButton(e.currentTarget.checked)}
                isChecked={hideCancelButton}
              />
              <Checkbox
                label="Allow Add More Fields?"
                value="allowAddMoreFields"
                name="allowAddMoreFields"
                onChange={(e) => setAllowAddMoreFields(e.currentTarget.checked)}
                isChecked={allowAddMoreFields}
              />
              {allowAddMoreFields && (
                <fieldset>
                  <label htmlFor="maxNumberOfInputs">
                    Max number of inputs:
                  </label>
                  <input
                    type="number"
                    disabled={!allowAddMoreFields}
                    name="maxNumberOfInputs"
                    id="maxNumberOfInputs"
                    max={10}
                    min={3}
                    onInput={(e) =>
                      setMaxNumberOfInputs(e.currentTarget.valueAsNumber)
                    }
                  />
                </fieldset>
              )}
            </div>
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
              <h4>Product:</h4>
              <RadioGroup
                options={productOptions}
                onChange={(e) => {
                  setProduct(e.currentTarget.value);
                  setSubProduct('');
                }}
                value={product}
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
              <h4>Invite Capabilities</h4>
              <InviteFixtureSettings {...innerProps} />
              <h4>Locale</h4>
              <LocaleFixture locale={locale} setLocale={setLocale} />
            </div>
          </section>
          <InvitePeople
            key={`${align}-${maxNumberOfInputs}-${userRole}-${product}-${subProduct}-${inviteFixtureKey}`}
            alignButtons={align as AlignButtons}
            allowAddMoreFields={allowAddMoreFields}
            continueUrl="http://test.com"
            defaultNumberOfInputs={3}
            maxNumberOfInputs={maxNumberOfInputs}
            resourceAri={`ari:cloud:${product}::site/5e982da0-ca43-4e91-b5ba-6fdadf1df292`}
            showFlag={showFlag}
            userRole={userRole as UserRole}
            subProduct={subProduct as SubProduct}
            hideCancelButton={hideCancelButton}
            source={source}
            jiraProjectName={jiraProjectName}
            jiraProjectKey={jiraProjectKey}
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

export default withIntlProvider(withAnalyticsLogger(DefaultExample));
