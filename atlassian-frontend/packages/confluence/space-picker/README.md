# Confluence space picker

An autocomplete component that allow for search & selecting confluence spaces

## Usage

```
import { SpacePicker } from '@atlassian/confluence-space-picker';
import React, { FC, Suspense } from 'react';

const ConfluencePicker: FC = () => (
  <Suspense fallback="loading"><SpacePicker onChange={(spaceKey) => console.log(spaceKey)} /></Suspense>
);
```

### Props

- _isMulti_ (optional) [Boolean] - Whether to allow multiple or single selection
- _client_ (optional) [ApolloClient] - Apollo client connected to confluence graphql
- _onChange_ (optional) [(<spaceId: string | string[]>) => void] - handler for when selection changes
- _value_ (optional) [string] - space id(s) of space(s) to preselect
- _siteUrl_ (optional) [string] - base url of site, set this when in an iframe on different domain.

### Confluence apollo client

The picker requires an apollo client to be connected to onfluence graphql. There are a number of ways to achieve this:

#### Passing it as a prop

You can pass the apollo client directly to the space picker component

```
<SpacePicker client={yourApolloClient} />
```

#### Adding an apollo provider higher in the react tree

```
<ApolloProvider client={youApolloClient} />
```

#### Modifying your existing apollo client to support confluence aswell

```
const isConfluenceGQLRequest = (operation) => operation.getContext().isConfluenceGQLRequest;

const confluenceGraph = new HttpLink({
  uri: `${stargateUrl}/ex/confluence/${cloudId}/graphql`,
  credentials: 'include',
});

// For schema explorer use the the uri below
const atlassianGraph = new HttpLink({
  uri: `${stargateUrl}/graphql`,
  credentials: 'include',
});

const httpLink = split(
  isConfluenceGQLRequest,
  confluenceGraph,
  atlassianGraph,
);

ApolloClient = new ApolloClient({ link: httpLink });
```

## Development Guide

### Generating graphql types

To generate the typescript types representing the queries and response for graphql you need to run the following:

- `npm install -g apollo`
- `yarn codgen`
