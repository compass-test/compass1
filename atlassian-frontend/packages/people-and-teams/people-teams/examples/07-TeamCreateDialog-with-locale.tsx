import React, { useCallback, useEffect, useState } from 'react';

import { addLocaleData, IntlProvider } from 'react-intl';

import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import {
  mockCreateTeam,
  mockGetRecommendations,
  mockInviteTeamMembers,
  resetFetchMock,
} from '@atlassian/ptc-test-utils';

import { supportedLocales } from '../src/components/i18n/utils';
import { TeamCreateDialog } from '../src/teamCreateDialog';

import {
  TEST_CLOUD_ID,
  TEST_CURRENT_USER_ID,
  TEST_PRODUCT,
  withAnalyticsLogger,
} from './helpers';

const loadReactLocaleData = () => {
  supportedLocales.forEach((locale: string) => {
    const languageCode = locale.split('-')[0];
    const data = require(`react-intl/locale-data/${languageCode}`);
    addLocaleData(data);
  });
};
loadReactLocaleData();

const Example = () => {
  const [locale, setLocale] = useState('en');
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    mockGetRecommendations();
    mockCreateTeam(TEST_CLOUD_ID, TEST_PRODUCT);
    mockInviteTeamMembers(TEST_CLOUD_ID, TEST_PRODUCT);

    return () => {
      resetFetchMock();
    };
  }, []);

  const handleClickCreateTeam = useCallback(() => {
    setIsOpenDialog(true);
  }, [setIsOpenDialog]);

  const handleCloseDialog = useCallback(() => {
    setIsOpenDialog(false);
  }, [setIsOpenDialog]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        width: '50%',
      }}
    >
      <div
        style={{
          marginBottom: '20px',
        }}
      >
        <Select
          className="single-select"
          classNamePrefix="react-select"
          options={supportedLocales.map((locale) => ({
            label: locale,
            value: locale,
          }))}
          placeholder="Choose a supported locale"
          // @ts-ignore
          onChange={(chosenOption) => setLocale(chosenOption!.value || 'en')}
          // @ts-ignore
          defaultValue={locale}
        />
      </div>

      <IntlProvider locale={locale}>
        <>
          <Button onClick={handleClickCreateTeam}>Start a new team</Button>

          {isOpenDialog && (
            <TeamCreateDialog
              cloudId={TEST_CLOUD_ID}
              principalId={TEST_CURRENT_USER_ID}
              product="confluence"
              maxSelectedMembers={5} // default value is 10
              onClose={handleCloseDialog}
              extraAnalyticsAttrs={{
                bar: 'foo',
              }}
            />
          )}
        </>
      </IntlProvider>
    </div>
  );
};

export default withAnalyticsLogger(Example);
