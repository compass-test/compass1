import React, { useState } from 'react';

import Flag, { FlagGroup } from '@atlaskit/flag';
import { RadioGroup } from '@atlaskit/radio';
import { CheckboxSelect } from '@atlaskit/select';
import { Checkbox } from '@atlaskit/checkbox';

import { withAnalyticsLogger } from './helpers';
import {
  InviteFixture,
  toCurrentAri,
  ProductId,
  LocaleFixture,
} from './helpers/invite-fixture';
import {
  userRoleOptions,
  productOptions,
  subProductOptions,
  jiraSubProductOptions,
} from './helpers/uiOptions';

import InvitePeople from '../src';
import { UserRole, ProductSelectOption, SubProduct } from '../src/types';

const bitbucket = {
  name: 'bitbucket',
  label: 'Bitbucket',
  value: 'bitbucket',
};
const allProducts = [...productOptions, ...jiraSubProductOptions, bitbucket];
const DefaultExample = () => {
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [availableProducts, setAvailableProducts] = useState<
    ProductSelectOption[]
  >(allProducts);
  const [product, setProduct] = useState<ProductId>('jira');
  const [subProduct, setSubProduct] = useState<SubProduct | ''>('core');
  const [customSelect, setCustomSelect] = useState<boolean>(false);
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
    <InviteFixture locale={locale}>
      {({ InviteFixtureSettings, inviteFixtureKey, innerProps }) => (
        <>
          <section
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexFlow: 'row-wrap',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h4>User permission level:</h4>
              <RadioGroup
                options={userRoleOptions}
                onChange={(e) => setUserRole(e.currentTarget.value as UserRole)}
                value={userRole}
              />
              <h4>Options</h4>
              <Checkbox
                label="Use Customized Product Select?"
                value="customProductSelect"
                name="customProductSelect"
                onChange={(e) => setCustomSelect(e.currentTarget.checked)}
                isChecked={customSelect}
              />
            </div>
            <div>
              <h4>Available Products:</h4>
              <CheckboxSelect
                onChange={(newValues) => {
                  setAvailableProducts(
                    allProducts.filter(({ value }) =>
                      newValues.map(({ value }) => value).includes(value),
                    ),
                  );
                }}
                options={allProducts}
                isMulti
                value={availableProducts}
              />
              <h4>Product:</h4>
              <RadioGroup
                options={[...productOptions, bitbucket]}
                onChange={(e) => {
                  setProduct(e.currentTarget.value as ProductId);
                  if (e.currentTarget.value !== 'jira') {
                    setSubProduct('');
                  }
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
            key={`${userRole}-${product}-${subProduct}-${inviteFixtureKey}-${customSelect}-${availableProducts
              .map(({ value }) => value)
              .join('-')}`}
            alignButtons="right"
            allowAddMoreFields={true}
            continueUrl="http://test.com"
            defaultNumberOfInputs={3}
            maxNumberOfInputs={10}
            resourceAri={toCurrentAri(product)}
            showFlag={showFlag}
            userRole={userRole as UserRole}
            productOptions={availableProducts}
            enableCustomizedProductSelect={customSelect}
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
