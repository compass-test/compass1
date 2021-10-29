import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

const fetchFromServer: FetchFunction = async (requestParams, variables) => {
  const response = await fetch(
    `/graphql?operation=${encodeURIComponent(requestParams.name || 'unknown')}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: requestParams.text,
        variables,
      }),
    },
  );

  return await response.json();
};

export const RelayEnvironment = new Environment({
  network: Network.create(fetchFromServer),
  store: new Store(new RecordSource()),
});
