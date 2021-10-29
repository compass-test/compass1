import React, { useState } from 'react';
import Button from '@atlaskit/button/standard-button';

import { withAnalyticsLogger, withIntlProvider } from './helpers';

import InvitePeopleDrawer from '../src';
import {
  InviteFixture,
  InviteFixtureSettings,
  MOCK_CURRENT_CLOUD_ID,
  ProductId,
} from './helpers/invite-fixture';
import {
  userRoleOptions,
  productOptions,
  subProductOptions,
} from './helpers/uiOptions';
import { RadioGroup } from '@atlaskit/radio';
import { Checkbox } from '@atlaskit/checkbox';
import { SubProduct, UserRole } from '@atlassian/invite-people/types';
import Flag, { FlagGroup } from '@atlaskit/flag';

const DefaultExample = () => {
  const [userRole, setUserRole] = useState<UserRole>('basic');
  const [product, setProduct] = useState<ProductId>('confluence');
  const [subProduct, setSubProduct] = useState<SubProduct | ''>('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [viralSettingsEnabled, setViralSettingsEnabled] = React.useState(false);
  const [
    customizedProductSelectEnabled,
    setCustomizedProductSelectEnabled,
  ] = React.useState(true);
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

  const handleButtonClick = () => setIsOpen(!isOpen);

  const handleDrawerClose = () => setIsOpen(false);

  return (
    <InviteFixture>
      {({ inviteFixtureKey, innerProps }) => (
        <>
          <InvitePeopleDrawer
            key={`${inviteFixtureKey}-${userRole}-${product}-${subProduct}`}
            enableInviteInviteeList={true}
            userRole={userRole}
            product={product}
            viralSettingsCohort={
              viralSettingsEnabled ? 'variation' : 'not-enrolled'
            }
            enableCustomizedProductSelect={customizedProductSelectEnabled}
            subProduct={subProduct as SubProduct}
            cloudId={MOCK_CURRENT_CLOUD_ID}
            isOpen={isOpen}
            onCloseHandler={handleDrawerClose}
            addFlag={showFlag}
            source="peopleMenu"
            invitePeopleDrawerMigrationCohort="variation"
          />
          <Button onClick={handleButtonClick} appearance={'primary'}>
            Open drawer
          </Button>
          <FlagGroup label="test" onDismissed={dismissFlags}>
            {flags.map((flag, index) => (
              <Flag key={index} {...flag} />
            ))}
          </FlagGroup>
          <section>
            <h2 style={{ margin: '40px 0 20px' }}>Mock settings</h2>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexFlow: 'row-wrap',
              }}
            >
              <div>
                <h4>User permission level</h4>
                <RadioGroup
                  options={userRoleOptions}
                  onChange={(e) =>
                    setUserRole(e.currentTarget.value as UserRole)
                  }
                  value={userRole}
                />
              </div>
              <div style={{ width: '20%' }}>
                <h4>Product:</h4>
                <RadioGroup
                  options={productOptions}
                  onChange={(e) => {
                    setProduct(e.currentTarget.value as ProductId);
                    setSubProduct('');
                  }}
                  value={product}
                />
                <h4>Other:</h4>
                <Checkbox
                  label="Viral Settings Enabled"
                  isChecked={viralSettingsEnabled}
                  onChange={(e) => {
                    setViralSettingsEnabled(e.currentTarget.checked);
                  }}
                />
                <Checkbox
                  label="Customized Product Select"
                  isChecked={customizedProductSelectEnabled}
                  onChange={(e) => {
                    setCustomizedProductSelectEnabled(e.currentTarget.checked);
                  }}
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
              </div>
            </div>
          </section>
        </>
      )}
    </InviteFixture>
  );
};

export default withIntlProvider(withAnalyticsLogger(DefaultExample));
