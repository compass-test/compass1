import React, { useState } from 'react';

import Flag, { FlagGroup } from '@atlaskit/flag';
import { RadioGroup } from '@atlaskit/radio';

import { withAnalyticsLogger } from './helpers';

import InvitePeople from '../src';
import { UserRole } from '../src/types';
import { userRoleOptions } from './helpers/uiOptions';
import {
  InviteFixture,
  InviteFixtureSettings,
  LocaleFixture,
} from './helpers/invite-fixture';

const DefaultExample = () => {
  const [userRole, setUserRole] = useState<UserRole>('basic');
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
              <h4>User permission level:</h4>
              <RadioGroup
                options={userRoleOptions}
                onChange={(e) => setUserRole(e.currentTarget.value as UserRole)}
                value={userRole}
              />
            </div>
            <div>
              <h4>Invite Capabilities</h4>
              <InviteFixtureSettings {...innerProps} />
              <h4>Locale</h4>
              <LocaleFixture locale={locale} setLocale={setLocale} />
            </div>
          </section>
          <InvitePeople
            key={`${userRole}-${inviteFixtureKey}`}
            alignButtons="right"
            allowAddMoreFields={true}
            continueUrl="http://test.com"
            defaultNumberOfInputs={3}
            maxNumberOfInputs={10}
            resourceAri={`ari:cloud:compass::site/5e982da0-ca43-4e91-b5ba-6fdadf1df292`}
            showFlag={showFlag}
            userRole={userRole as UserRole}
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
