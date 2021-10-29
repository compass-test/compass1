import React, { useState, useEffect } from 'react';
import fetchMock from 'fetch-mock/cjs/client';

import Button from '@atlaskit/button/standard-button';
import ModalDialog, { ModalBody } from '@atlaskit/modal-dialog';

import { withAnalyticsLogger } from './helpers';
import { InviteFixture, LocaleFixture } from './helpers/invite-fixture';
import { DEFAULT_STARGATE_SERVICE_URL, PERMS_URL } from '../src/clients/common';
import InvitePeople from '../src';

const mockAllSuccessResponse = () => {
  fetchMock.post(
    {
      matcher: DEFAULT_STARGATE_SERVICE_URL + '/' + PERMS_URL,
      response: {
        body: { permitted: true },
      },
    },
    { delay: 2000 },
  );
};

const ModalDialogExample = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [locale, setLocale] = useState('en');
  const openDialog = React.useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = React.useCallback(() => setIsDialogOpen(false), []);

  useEffect(() => {
    fetchMock.restore();
    mockAllSuccessResponse();
    return () => {
      fetchMock.done();
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        marginBottom: '20px',
        width: '50%',
      }}
    >
      <LocaleFixture locale={locale} setLocale={setLocale} />
      <InviteFixture locale={locale}>
        {({ inviteFixtureKey }) => (
          <>
            <Button onClick={openDialog}>Invite People</Button>
            {isDialogOpen && (
              <ModalDialog
                autoFocus={false}
                onClose={closeDialog}
                width="small"
              >
                <ModalBody>
                  <InvitePeople
                    key={inviteFixtureKey}
                    continueUrl="http://test.com"
                    resourceAri="ari:cloud:confluence::site/5e982da0-ca43-4e91-b5ba-6fdadf1df292"
                    onCancelHandler={closeDialog}
                  />
                </ModalBody>
              </ModalDialog>
            )}
          </>
        )}
      </InviteFixture>
    </div>
  );
};

export default withAnalyticsLogger(ModalDialogExample);
