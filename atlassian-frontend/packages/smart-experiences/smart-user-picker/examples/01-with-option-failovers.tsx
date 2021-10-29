import React from 'react';
import { IntlProvider } from 'react-intl';
import { createMockClient } from 'mock-apollo-client';

import SmartUserPicker, { setSmartUserPickerEnv } from '../src';
import { users } from '../example-helpers/users';
import { groups } from '../example-helpers/groups';
import { UserAndGroupSearchQuery } from '../example-helpers/user-and-group-query';
import { getRecommendations } from '../example-helpers/get-recommendations';

const Example: React.FC = () => {
  React.useEffect(() => {
    setSmartUserPickerEnv('local');
  }, []);

  let mockClient = createMockClient();

  mockClient.setRequestHandler(
    UserAndGroupSearchQuery,
    async ({ query }: { query: string }) => {
      await new Promise((res) => setTimeout(res, 1000));
      return {
        data: {
          userGroupSearch: {
            users: users.filter(
              (user) =>
                user.displayName &&
                !user.displayName.toLowerCase().includes(query),
            ),
            groups: groups.filter(
              (group) =>
                group.name && !group.name.toLowerCase().includes(query),
            ),
          },
        },
      };
    },
  );

  return (
    <IntlProvider locale="en">
      <SmartUserPicker
        fieldId="example"
        productKey="confluence"
        siteId="invalidsiteid"
        onChange={console.log.bind(console)}
        isMulti
        includeGroups={true}
        onError={(error, request) =>
          getRecommendations(error, request, mockClient)
        }
      />
    </IntlProvider>
  );
};

export default Example;
