import React from 'react';
import Cookies from 'js-cookie';
import { default as AkAvatar } from '@atlaskit/avatar';

const AVATAR_URL =
  'https://staff-avatars.prod.atl-paas.net/avatar/__STAFFID__?size=Small';

export const Avatar: React.FC = () => {
  const staffId = Cookies.get('staffid');
  if (!staffId) {
    return null;
  }
  return (
    <AkAvatar
      appearance="circle"
      src={AVATAR_URL.replace('__STAFFID__', staffId)}
      size="medium"
    />
  );
};
