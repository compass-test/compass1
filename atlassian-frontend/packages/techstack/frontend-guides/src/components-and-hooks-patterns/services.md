# Services and data providers

Useful pre-read: [State Management](../state-management.md)

Every time there is a need to fetch some data with a rest request, perform a POST request, read from
local storage/cookies, etc, what is actually happening is an attempt to “sync” components that are
rendered on the screen with some “remote” data that exists somewhere outside of the UI. This concept
is called “remote state”.

In addition, the “state” or “meta information” of that sync operation can be extracted into its own
“async state” concept, which can and should be handled by the same component.

In the “traditional” world before [components for everything](../everything-is-a-component.md)
approach, in order to fetch data from REST endpoints, show a spinner while the data is fetched and
show an error when the data failed to fetch we had to create rest/services/ops/state/view layers in
our app since there was no concept of “remote” state concept and there is no “fetch data with the
info about that data” concern that can be extracted easily. We usually had “rest” layer, which
contains all the rest requests for the app, “services” layer with all the data transformations,
“state” layer with all the meta-data about those requests (isLoading, isError) plus some local state
concerns, etc.

Here, we recommend doing the opposite. Instead of different layers for different types of work, we
group the work by domain or `entities` that contain all the concerns that were previously handled by
the different layers.

We call these entities “services”.

All services should be lightweight abstractions, they are not supposed to render anything on a page,
this is UI components concern.

## Basic service: simple fetch data provider

A simple “data provider” service does not need any React context underneath, all it usually does is
data fetching and passing data, loading and error to children. It can expose some basic API like
“fetch” as well. Use hooks to implement it.

- Simple case

  ```jsx
  export const useMyService = ({ baseUrl, issueId }) => {
    const request = useCallback(() => fetch(`${baseUrl}/some/url/${issueId}`), [
      baseUrl,
      issueId,
    ]);
    // or const { loading, error, data, refetch } = useQuery(myGql); if you use @apollo/react-hooks
    const { loading, error, data, fetchData } = useService(request, {
      loading: true,
    });

    /* use useMemo(), otherwise you'd get a new data object every single render. 
       Which, in turn, would rerender all children dependent on it. */
    const memoisedData = useMemo(() => transformData(data), [data]);

    return {
      loading,
      error,
      data: memoisedData,
      fetchData,
    };
  };
  ```

- More complex case (e.g. if you need to fetch on mount; prefer doing this in parent component
  though)

  ```jsx
  const fetchData = ({ baseUrl, issueId }) =>
    fetch(`${baseUrl}/some/url/${issueId}`);

  export const useMyService = ({ baseUrl, issueId }) => {
    const request = useCallback(() => fetchData(baseUrl, issueId), [
      baseUrl,
      issueId,
    ]);
    const { loading, error, data, fetchData } = useService(request, {
      loading: true,
    });

    // For reusable services, it is better not to hardcode fetching on mount, to make them more flexible. When possible, add this code to component which calls service instead.
    useEffect(() => {
      fetchData();
      /* 
        NOTE: If you add `fetchData` to the dependency list (in this component or its children) - you have to define `request` function you pass to `useService()` via `useCallback()`.
        Otherwise you may get an infinite loop.
      */
    }, [fetchData]);

    const memoisedData = useMemo(() => transformData(data), [data]);

    return {
      loading,
      error,
      data: memoisedData,
      fetchData,
    };
  };
  ```

`jira-frontend` already has `useService()` helper hook implemented. If you don't have it in your product, reference implementation is below.

```jsx
// In case service gets more complex - consider using useReducer()
const useService = (request, initialState = {}) => {
  const [state, setState] = useState({
    loading: false,
    ...initialState,
  });

  const fetchData = useCallback(async () => {
    setState({
      loading: true,
      error: undefined,
      data: undefined,
    });

    try {
      const data = await request();
      setState({
        loading: false,
        error: undefined,
        data,
      });
    } catch (error) {
      setState({
        loading: false,
        error,
        data: undefined,
      });
    }
  }, [request]);

  return { ...state, fetchData };
};
```

## Basic service: data manipulation

Same situation as basic fetch services, is for when there is a need to perform some data
manipulations (like perform a POST/PUT request): all this logic could be encapsulated within a
DataProvider, which again, accepts props and returns result of the manipulations and API to perform
those manipulations.

```jsx
const useMyService = ({ baseUrl, issueId }) => {
  const request = useCallback(
    requestData =>
      performPutRequest(`${baseUrl}/someurl/${issueId}`, requestData),
    [baseUrl, issueId],
  );

  const { loading, error, data, fetchData } = useService(request);

  // For reusable services, it is better not to hardcode fetching on mount, to make them more flexible. When possible, add this code to component which calls service instead.
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const memoisedData = useMemo(() => transformData(data), [data]);

  return {
    loading,
    error,
    data: memoisedData,
    update: fetchData,
  };
};
```

## Data provider with shared data

Although in simple cases React Context is not necessary, in reality a situation when there is a need
to share data from the same provider across multiple components and components composition is not
enough, are often. In this case, a service component can be implemented with React Context and
expose React Context Provider and Consumer as its public API.

React Consumer should implement the same API as a simple provider above (data, loading, error) to
keep the API consistent (and to make it easier for consumers of said service to switch to
context-based version if needed)

## Consuming providers

Since everything, including providers, is a component, then consuming providers is just a matter of
[composing](https://reactjs.org/docs/composition-vs-inheritance.html) them together with UI
components that need data from those providers

- If service is used in functional component:

  ```jsx
  const { loading, error, data } = useMyService({ baseUrl, issueId });

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorComponent />;
  }

  if (data) {
    return data.issues.map(issue => (
      <IssueCard
        key={issue.key}
        name={issue.name}
        description={issue.description}
      />
    ));
  }

  return null;
  ```

- Or, if you use need to use service in class component:

  1. Convert hook to a render props component. Add to your service file.

  ```jsx
  export const MyService = ({ children, ...serviceProps }) =>
    children(useMyService(serviceProps));
  ```

  2. Use this render props component:

  ```jsx
  <MyService>
    {({ loading, error, data }) => {
      if (loading) {
        return <Spinner />;
      }
      if (error) {
        return <ErrorComponent />;
      }

      if (data) {
        return data.issues.map(issue => (
          <IssueCard
            key={issue.key}
            name={issue.name}
            description={issue.description}
          />
        ));
      }
    }}
  </MyService>
  ```

- Or, if the service was implemented with React Context, then

  ```jsx
  // at the root of your app
  <MyServiceProvider baseUrl={baseUrl} issueId={issueId}>
    <UI />
  </MyServiceProvider>
  ```

  ```jsx
  // somewhere at the top where there is a need to show the spinner
  <MyServiceConsumer>
    {({ loading, error, data }) => {
      if (loading) {
        return <Spinner />;
      }
      if (error) {
        return <ErrorComponent />;
      }
    }}
  </MyService>
  ```

  ```jsx
  // somewhere deep in UI layer
  <MyServiceConsumer>
    {({ data }) => {
      if (data) {
        return data.issues.map(issue => (
          <IssueCard
            name={issue.name}
            key={issue.key}
            description={issue.description}
          />
        ));
      }
    }}
  </MyService>
  ```

Exactly the same situation is with services that can manipulate data:

- Via hooks

  ```jsx
  const { loading, error, update } = useMyService({ baseUrl, issueId });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return <Button onClick={update}>Click me!</Button>;
  ```

- Or via render props

  ```jsx
  <MyServiceProvider>
    {({ loading, error, update }) => {
      if (loading) {
        return <Spinner />;
      }

      if (error) {
        return <ErrorComponent />;
      }

      return <Button onClick={update}>Click me!</Button>;
    }}
  </MyServiceProvider>
  ```

## Naming convention

All services should have Services as a suffix. They should expose API in the form of an object with
necessary meta-information about this service (whether it’s loading, there is an error, etc), data
and API to manipulate this data (when needed). When a service is implemented with React Context API
then it should export Provider/Consumer pair with the names that end with `ServiceConsumer` and
`ServiceProvider` respectively

It is highly encouraged that your simple services or Consumers define the following fields:

- **loading: boolean** whether the query/mutation is in progress
- **error: Error** error object if something went wrong
- **data: MyData** result data

Although there may be some cases when you may not need all of them, like for example loading: the
service may be polling the server to obtain some changes, but component may only be interested in
consuming the resulting data, without showing any loading state.

## More examples of services

There are multiple ways you can write your services, depending on your usecase: with hooks,
components and react-sweet-state. Examples provided in this guide are very basic, to illustrate the
idea of a service and how to encapsulate a concern within a service.

More advanced examples can be found [here](./code-examples-of-controllers-and-services.md)

---

## Related reading

[State management: core concepts](../state-management.md) |
[Everything is a component](../everything-is-a-component.md) |
[Using dependency injections](./dependency-injection.md) |
