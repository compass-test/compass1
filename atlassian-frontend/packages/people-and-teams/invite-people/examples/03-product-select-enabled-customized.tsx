import React, { useState } from 'react';

import Flag, { FlagGroup } from '@atlaskit/flag';
import { RadioGroup } from '@atlaskit/radio';

import { withAnalyticsLogger } from './helpers';
import {
  InviteFixture,
  toCurrentAri,
  ProductId,
  getInviteFixtureForAllProducts,
  mockInvite,
  LocaleFixture,
} from './helpers/invite-fixture';
import {
  userRoleOptions,
  productOptions,
  subProductOptions,
} from './helpers/uiOptions';

import InvitePeople from '../src';
import { UserRole, SubProduct } from '../src/types';

const DefaultExample = () => {
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [product, setProduct] = useState<ProductId>('jira');
  const [subProduct, setSubProduct] = useState<SubProduct | ''>('core');
  const [locale, setLocale] = useState('en');

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
        mockInvite('confluence'),
        mockInvite('jira-software'),
        mockInvite('jira-servicedesk'),
        mockInvite('jira-core'),
        mockInvite('trello'),
        mockInvite('bitbucket'),
      ])}
    >
      {({ InviteFixtureSettings, inviteFixtureKey, innerProps }) => (
        <>
          <section
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexFlow: 'row-wrap',
            }}
          >
            <div>
              <h4>User permission level:</h4>
              <RadioGroup
                options={userRoleOptions}
                onChange={(e) => setUserRole(e.currentTarget.value as UserRole)}
                value={userRole}
              />
            </div>
            <div>
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
                    onChange={(e) =>
                      setSubProduct(e.currentTarget.value as SubProduct)
                    }
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
          <InvitePeople
            key={`${userRole}-${product}-${subProduct}-${inviteFixtureKey}`}
            alignButtons="right"
            allowAddMoreFields={true}
            continueUrl="http://test.com"
            defaultNumberOfInputs={3}
            maxNumberOfInputs={10}
            resourceAri={toCurrentAri(product)}
            showFlag={showFlag}
            userRole={userRole as UserRole}
            enableCustomizedProductSelect={true}
            subProduct={subProduct as SubProduct}
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
