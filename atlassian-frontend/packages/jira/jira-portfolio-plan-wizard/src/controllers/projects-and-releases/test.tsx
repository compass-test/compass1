import React from 'react';

import { act, fireEvent, render } from '@testing-library/react';

import { issueSources, api as mockedApi } from '../../common/mocks';
import { API } from '../../common/types';
import { APIProvider } from '../api';

import { ProjectsAndReleasesProvider, useProjectsAndReleases } from './index';

const Page = () => {
  const { fetchData, projects, releases, loading } = useProjectsAndReleases();
  return (
    <pre>
      {loading && 'loading'}
      {projects && 'projects:' + projects.length}
      {releases && 'releases:' + releases.length}
      <button onClick={() => fetchData([issueSources[0]])}>fetch</button>
    </pre>
  );
};

const Provide = ({
  children,
  api,
}: {
  children: React.ReactNode;
  api: API;
}) => (
  <APIProvider api={api}>
    <ProjectsAndReleasesProvider>{children}</ProjectsAndReleasesProvider>
  </APIProvider>
);

it('should be able to trigger loading', async () => {
  const screen = render(
    <Provide api={mockedApi}>
      <Page />
    </Provide>,
  );
  const fetch = screen.getByText('fetch');
  fireEvent.click(fetch);
  expect(await screen.findByText('loading')).toBeInTheDocument();
});

// Cannot get this to work i think we need react 16.9
it.skip('should be able to fetch some projects and releases', async () => {
  const screen = render(
    <Provide api={mockedApi}>
      <Page />
    </Provide>,
  );
  const fetch = screen.getByText('fetch');
  act(() => {
    fireEvent.click(fetch);
  });
  expect(await screen.findByText('loading')).toBeInTheDocument();
  expect(
    await screen.findByText('projects:', { exact: false }),
  ).toBeInTheDocument();
  expect(
    await screen.findByText('releases:', { exact: false }),
  ).toBeInTheDocument();
});
