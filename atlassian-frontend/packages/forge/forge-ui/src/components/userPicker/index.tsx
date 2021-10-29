import React, { lazy } from 'react';
import { useUID } from 'react-uid';
import { useMentionResource } from './providers/useMentionResource';
import { FieldChildrenProps, UserPickerProps } from '@atlassian/forge-ui-types';
import { PortalConsumer } from '../../context';
import { gridSize } from '@atlaskit/theme/constants';
import { RenderFn } from '../../renderer/RendererNext';
import { useUsers, UserData } from '../../web-client/hooks/useUser';
import { Props } from '..';

import { MentionProvider } from '@atlaskit/mention';
import ApolloClient from 'apollo-client';

const AKFormField = lazy(() => import('@atlaskit/form/Field'));
const AKUserPicker = lazy(() => import('@atlaskit/user-picker'));
const AKSmartUserPicker = lazy(() =>
  import('@atlaskit/user-picker').then((module) => ({
    default: module.SmartUserPicker,
  })),
);

const AKHelperMessage = lazy(() =>
  import('@atlaskit/form').then((module) => ({
    default: module.HelperMessage,
  })),
);
const AKErrorMessage = lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.ErrorMessage })),
);

export type ProductKey = 'jira' | 'confluence' | 'people';

export const isProductKey = (productKey: string): productKey is ProductKey => {
  return (
    productKey === 'confluence' ||
    productKey === 'jira' ||
    productKey === 'people'
  );
};

interface Dependencies {
  client: ApolloClient<any>;
  mentionProvider: Promise<MentionProvider>;
  accountId: string;
  cloudId: string;
  productKey: ProductKey;
}

const validate = (value: any) => (!value ? 'EMPTY' : undefined);

// Format the values(UserData) returned from useUsers hook, and pass it to defaultValue prop
// Object(UserData) --> Array
const getDefaultValue = (
  users: { [accountId: string]: UserData },
  isMulti = false,
) => {
  const defaultValues = [];

  for (const userId in users) {
    const { name, picture } = users[userId];
    // Only grabbing the values where user name exist
    if (name) {
      defaultValues.push({
        name,
        avatarUrl: picture,
        id: userId,
      });
    }
  }
  return isMulti ? defaultValues : defaultValues[0];
};

const getSmartUserPickerProps: (args: {
  suppliedCloudId?: string;
  suppliedProductKey?: 'jira' | 'confluence' | 'people';
  currentAccountId?: string;
}) =>
  | {
      siteId: string;
      principalId: string;
      productKey: 'jira' | 'confluence' | 'people';
    }
  | undefined = ({ suppliedCloudId, suppliedProductKey, currentAccountId }) => {
  if (suppliedCloudId && suppliedProductKey) {
    return {
      siteId: suppliedCloudId,
      // If principalId === 'Context', upstream attempts to use other context to discover the principal ID'
      principalId: currentAccountId || 'Context',
      productKey: suppliedProductKey,
    };
  }
  return undefined;
};

// This component can be simplified now the only way to use this is via makeUserPicker.
// makeUserPicker requires all Dependencies so there's no need for the Partial type here
const UserPicker: React.FunctionComponent<
  UserPickerProps & Partial<Dependencies>
> = ({
  name,
  label,
  description,
  placeholder,
  isRequired,
  isMulti,
  defaultValue: accountId = '',
  client,
  mentionProvider,
  accountId: currentAccountId,
  cloudId: suppliedCloudId,
  productKey,
}) => {
  const query = useMentionResource(mentionProvider);

  const uid = useUID();

  const accountIds = Array.isArray(accountId) ? accountId : [accountId];

  const usersData = useUsers(accountIds, client);

  const defaultValue = getDefaultValue(usersData, isMulti);

  const smartUserPickerProps = getSmartUserPickerProps({
    suppliedCloudId,
    currentAccountId,
    suppliedProductKey: productKey,
  });

  return (
    <PortalConsumer>
      {(portal) => (
        <AKFormField
          name={name}
          label={label}
          defaultValue={defaultValue}
          validate={isRequired ? validate : undefined}
          isRequired={isRequired}
        >
          {({ fieldProps, error }: FieldChildrenProps & { error?: string }) => {
            const userPickerProps = {
              ...fieldProps,
              isMulti,
              loadOptions: query,
              menuPortalTarget: portal || undefined,
              noOptionsMessage: () => null,
              placeholder,
              width: `${gridSize() * 40}px`,
            };
            return (
              <>
                {smartUserPickerProps ? (
                  <AKSmartUserPicker
                    {...userPickerProps}
                    fieldId={uid}
                    debounceTime={400}
                    {...smartUserPickerProps}
                  />
                ) : (
                  <AKUserPicker {...userPickerProps} fieldId={null} />
                )}
                {error === 'EMPTY' && (
                  <AKErrorMessage>This field is required.</AKErrorMessage>
                )}
                {description && (
                  <AKHelperMessage>{description}</AKHelperMessage>
                )}
              </>
            );
          }}
        </AKFormField>
      )}
    </PortalConsumer>
  );
};

export default UserPicker;

export const UserPickerFn: React.FunctionComponent<
  Pick<Props, 'props'> & Partial<Dependencies>
> = ({ client, mentionProvider, accountId, cloudId, productKey, props }) => {
  const {
    name,
    label,
    placeholder,
    description,
    defaultValue,
    isRequired,
    isMulti,
  } = props as UserPickerProps;
  return (
    <UserPicker
      client={client}
      accountId={accountId}
      cloudId={cloudId}
      productKey={productKey}
      mentionProvider={mentionProvider}
      name={name}
      label={label}
      placeholder={placeholder}
      description={description}
      defaultValue={defaultValue}
      isRequired={isRequired}
      isMulti={isMulti}
    />
  );
};

// New-style component requires ApolloClient, MentionProvider, accountId, cloudId and productKey
// to be passed as props, not via context.
export const makeUserPicker = ({
  client,
  mentionProvider,
  accountId,
  cloudId,
  productKey,
}: Dependencies) => {
  return function UserPickerNext({
    forgeDoc: { props },
  }: Parameters<RenderFn>[0]) {
    return (
      <UserPickerFn
        props={props}
        client={client}
        mentionProvider={mentionProvider}
        accountId={accountId}
        cloudId={cloudId}
        productKey={productKey}
      />
    );
  };
};
