import React from 'react';
import { IntlProvider } from 'react-intl';
import { StylesConfig } from '@atlaskit/select';
import * as colors from '@atlaskit/theme/colors';

import SmartUserPicker, { setSmartUserPickerEnv } from '../src';
import { JDOG_CLOUD_ID } from '../example-helpers/jdog-cloud-id';

const Example = () => {
  React.useEffect(() => {
    setSmartUserPickerEnv('local');
  });

  const styles: StylesConfig = {
    control: (style) => ({
      ...style,
      backgroundColor: '#7B8597',
      borderRadius: 8,
    }),
    input: (style) => ({
      ...style,
      color: colors.N10,
    }),
  };

  return (
    <IntlProvider locale="en">
      <SmartUserPicker
        fieldId="example"
        productKey="jira"
        siteId={JDOG_CLOUD_ID}
        onChange={console.log.bind(console)}
        isMulti
        defaultValue={[
          {
            id: '655363:23cdc6cc-d81e-492d-8fe1-ec56fb8094a4',
            type: 'user',
          },
        ]}
        styles={styles}
      />
    </IntlProvider>
  );
};
export default Example;
