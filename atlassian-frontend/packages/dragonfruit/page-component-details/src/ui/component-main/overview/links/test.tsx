import React from 'react';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { CompassLink } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { LinkView } from './index';

const COMPONENT_ID = '12345';
const COMPONENT_NAME = 'Test component';

const renderLinksView = (links: CompassLink[] = []) => {
  render(
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <LinkView
          componentId={COMPONENT_ID}
          componentName={COMPONENT_NAME}
          links={links}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>,
  );
};

describe('Component Links', () => {
  it('shows all links sections', async () => {
    // Render links view
    renderLinksView();

    // `<section>` elements implicitly have a role of 'region' if they are given an accessible name.
    // In our case, we are giving each section an accessible name with `aria-labelledby`, using the section heading as the name.
    const repositoriesSection = await screen.findByRole('region', {
      name: 'Repositories',
    });
    expect(repositoriesSection).toBeInTheDocument();

    const documentsSection = await screen.findByRole('region', {
      name: 'Documentation',
    });
    expect(documentsSection).toBeInTheDocument();

    const projectsSection = await screen.findByRole('region', {
      name: 'Projects',
    });
    expect(projectsSection).toBeInTheDocument();

    const dashboardsSection = await screen.findByRole('region', {
      name: 'Dashboards',
    });
    expect(dashboardsSection).toBeInTheDocument();

    const otherSection = await screen.findByRole('region', {
      name: 'Other links',
    });
    expect(otherSection).toBeInTheDocument();
  });
});
