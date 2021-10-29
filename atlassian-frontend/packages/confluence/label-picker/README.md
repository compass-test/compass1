# Confluence label picker

An autocomplete component that enables searching for and selecting Confluence labels

## Usage

```jsx
import { LabelPicker } from '@atlassian/confluence-label-picker';

...
<LabelPicker onChange={(labels) => console.log(labels)} />
...
```

### Props

- _client_ (optional) [ApolloClient] - `ApolloClient` instance connected to Confluence's GraphQL endpoint
- _isMulti_ (optional) [boolean] - Whether to allow multiple or single selection
- _onChange_ (optional) [(value: Label[] | Label) => void] - Handler for when selection changes
- _placeholder_ (optional) [string] - Placeholder text to display while the user hasn't selected any label, hasn't input any query for labels
- _spaceKey_ (optional) [string] - Key of the space to limit the label search within
- _value_ (optional) [Label[] | Label] - Labels to preselect

### ApolloClient with Confluence GraphQL

The picker requires an `ApolloClient` to be connected to Confluence's GraphQL
endpoint. There are multiple ways to achieve this:

#### Pass an ApolloClient as a prop

```jsx
<LabelPicker client={apolloClient} ... />
```

#### Add an ApolloProvider higher in the React DOM

```jsx
<ApolloProvider client={apolloClient}>
  ...
    <LabelPicker ... />
  ...
</ApolloProvider>
```

## Development Guide

### Generating GraphQL types

To generate the TypeScript types of the GraphQL queries and responses, run the
following:

```
npm install -g apollo
yarn codegen
```
