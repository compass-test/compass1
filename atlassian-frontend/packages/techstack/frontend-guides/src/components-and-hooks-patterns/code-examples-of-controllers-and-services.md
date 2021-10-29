# Examples of different types of controllers and services

The paradigm shift in Atlassian Frontend has been to use components or hooks as the “universal
declarative interface” for all aspects of React code. As discussed in this
[guide](../everything-is-a-component.md), using such a pattern helps us reap the benefits of
encapsulation, decomposition and separation of concerns which are the cornerstones of development at
scale.

Given the case, the [services](./services.md) and [controllers](./controllers.md) also need to be
written in a way such that

- it is easy to interact between these layers
- they can be treated as "black box" with a clear input/output API
- have a clean composition based hierarchy between components

This could be achieved when the components are written to immulate the power of Render props or
hooks.

## Examples of controllers or services

The following could be the different approaches to write controllers or services.

### Using functional components

In code this approach would look something like this. Here, the `controller` is written as a
functional component which expects the `children` as renderProps.

```javascript
export const ModalDialogController = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  return children({
    isOpen,
    closeDialog,
    openDialog,
  });
};
```

### Using hooks

In this approach, the `controller` is written as a `custom hook`. The `usemodalDialogController`
hook exposes `isOpen` value and `closeDialog` and `openDialog` functions to change its value.

```javascript
export const useModalDialogController = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  return [isOpen, { closeDialog, openDialog }];
};
```

### Using react-sweet-state

[React-sweet-state](https://atlassian.github.io/react-sweet-state/#/) provides a cleaner
architecture to manage shared state extracting the benefits of Context and Redux. It is perfectly
correct to write the controllers or services using `react-sweet-state` where the concern is to
manage shared state.

```javascript
import {
  createStore,
  createSubscriber,
  createContainer,
  createHook,
} from 'react-sweet-state';
const Store = createStore({
  initialState: {
    isOpen: false,
  },
  actions: {
    openDialog: () => ({ setState, getState }) => {
      setState({
        isOpen: true,
      });
    },
    closeDialog: () => ({ setState, getState }) => {
      setState({
        isOpen: false,
      });
    },
  },
  name: 'ModalDialogStateController',
});

export const ModalDialogStateController = createSubscriber(Store);
// or
export const useModalDialogStateController = createHook(Store);

export const ModalDialogStateControllerContainer = createContainer(Store, {
  onInit: () => ({ setState }, { modalState }) => {
    setState({ isOpen: modalState });
  },
});
```

### Using react-apollo

The the `<Query>` component of `react-apollo` could be used to connect one of your components to
your GraphQL server. Using such an approach, the `service` would could be written as:

```javascript
import { Query } from 'react-apollo';
export default props => (
  <Query query={FETCH_DETAILS} fetchPolicy="no-cache" {...props} />
);
```

### Using contexts

The simplest controller written using `context` API could be written as in example below. Please be
mindful that this example is just to illustrate how a controller pattern can be implemented with
React Context, be mindful of the [Context caveats](https://reactjs.org/docs/context.html#caveats)
for production use case:

```javascript
const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const value = {
    isOpen,
    toggleDialog,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const ModalConsumer = ModalContext.Consumer;

const useModal = () => useContext(ModalContext);

export { ModalProvider, ModalConsumer, useModal };
```

### Re-exporting providers

In some scenarios, a service or controller may need to re-export a `Provider` passing additional
`props` to it. This is also treated as a valid way to write a service or controller provided the
imported `Provider` follows above guidelines.

```javascript
import ItemProvider from '../item-provider';
export default props => {
  return <ItemProvider {...props} />;
};
```

### Service written to fetch data from other services

A `fetchSomthing` service imports the individual fetch functions (when you have several pieces of
data to fetch) from the corresponding services. To help the lint rule understand the functionality,
use `fetchSomething` as the name of the service where `something` is the name of the service. For
example, if the service is fetching `issue data` and named `issueDataService`, then the function
would be named `fetchIssueData`.

```javascript
import { fetchData as assignedToUserFetchData } from '../assigned-to-user-provider';
import { fetchData as favouritesFetchData } from '../favourites-provider';
import { prefetch as recentlyViewedFetchData } from '../recently-viewed-provider';

const fetchIssueData = async baseUrl => {
  const prefetchResult = {
    RecentlyViewed: undefined,
    AssignedToUser: undefined,
    Favourites: undefined,
  };

  const [
    recentlyViewedData,
    assignedToUserData,
    favouritesData,
  ] = await Promise.all([
    recentlyViewedFetchData(baseUrl),
    assignedToUserFetchData(baseUrl),
    favouritesFetchData(baseUrl),
  ]);

  return {
    ...prefetchResult,
    RecentlyViewed: recentlyViewedData,
    AssignedToUser: {
      data: assignedToUserData,
    },
    Favourites: {
      data: favouritesData,
    },
  };
};

export default fetchIssueData;
```
