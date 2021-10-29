import React from 'react';

import { render, waitForElement } from '@testing-library/react';

import { fetchMockGet } from '@atlassian/dragonfruit-testing';

import { useGetTeams } from './index';

const ids = [
  'id-lodestone',
  'ari:cloud:teams::team/id-crux',
  'id-magnet',
  'id-lodestone',
];

const Test = () => {
  const { teams } = useGetTeams(ids);

  return (
    <>
      {Object.keys(teams).map(t => (
        <div key={t}>{JSON.stringify(teams[t])}</div>
      ))}
    </>
  );
};

describe('useGetTeams', () => {
  it('should return an object of teams/Errors by id', async () => {
    const mock = fetchMockGet({
      request: {
        url: `/gateway/api/v3/teams/id-lodestone`,
      },
      result: {
        id: `ari:cloud:teams::team/id-lodestone`,
        displayName: 'Lodestone',
      },
    });

    fetchMockGet({
      request: {
        url: `/gateway/api/v3/teams/id-crux`,
      },
      result: {
        id: `ari:cloud:teams::team/id-crux`,
        displayName: 'Crux',
      },
    });

    fetchMockGet({
      request: {
        url: `/gateway/api/v3/teams/id-magnet`,
      },
      result: 500,
    });

    const { getByText, container } = render(<Test />);
    await waitForElement(() => getByText(/lodestone/i));
    const divs = container.getElementsByTagName('div');
    expect(divs[0].childNodes[0].textContent).toEqual(
      '{"id":"ari:cloud:teams::team/id-lodestone","displayName":"Lodestone"}',
    );
    expect(divs[1].childNodes[0].textContent).toEqual(
      '{"id":"ari:cloud:teams::team/id-crux","displayName":"Crux"}',
    );
    expect(divs[2].childNodes[0].textContent).toEqual(
      '{"name":"FetchError","statusCode":500}',
    );
    expect(mock.done()).toBe(true);
  });
});
