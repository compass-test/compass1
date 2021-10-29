import React, { FunctionComponent } from 'react';

import { FormattedMessage } from 'react-intl';

import Spinner from '@atlaskit/spinner';
import { MessageDescriptor } from '@atlassian/proforma-translations';

type LoaderProps = {
  message: MessageDescriptor;
};

export const Loader: FunctionComponent<LoaderProps> = ({ message }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Spinner />
      &nbsp;
      {
        // @ts-ignore
        <FormattedMessage {...message} />
      }
    </div>
  );
};
