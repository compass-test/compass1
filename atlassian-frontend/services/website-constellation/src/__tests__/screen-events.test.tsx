/**
 * NOTE: This test suite uses the __mocks__ folder to automock certain gatsby related packages.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { ANALYTICS_BRIDGE_CHANNEL } from '@atlassian/analytics-bridge';
import NotFoundPage from '../pages/404';
import BrandPage from '../pages/brand';
import ContentPage from '../pages/content';
import FoundationsPage from '../pages/foundations';
import PatternsPage from '../pages/foundations';
import ResourcesPage from '../pages/resources';
import ComponentsPage from '../pages/components';
import HomePage from '../pages/index';
import GuidelinePage from '../templates/guideline-page';
import ProtectedPage from '../templates/protected-content';
import ComponentPage from '../@atlaskit/gatsby-theme-brisk/templates/package-page/page-content';
import {
  LocationProvider,
  createHistory,
  createMemorySource,
} from '@reach/router';
import SubComponentPage from '../@atlaskit/gatsby-theme-brisk/templates/package-page/subpage-content';
import MdxPage from '../@atlaskit/gatsby-theme-brisk/templates/page';
import { wrapRootElement } from '../../gatsby-browser';
import { useSession } from '../hooks';

jest.mock('../hooks', () => ({
  useSession: jest.fn(),
  useData: () => ({
    isLoading: false,
    data: {
      fields: {
        bodyText: {
          content: [],
        },
      },
    },
  }),
}));

const fireEvent = jest.fn();

const assertScreenEventFired = (
  name: string,
  attributes?: { [key: string]: any },
  ...context: { [key: string]: any }[]
) => {
  const callArgs = fireEvent.mock.calls[0];

  expect(callArgs[0].payload).toEqual({
    actionSubject: 'screen',
    analyticsType: 'SCREEN',
    action: 'viewed',
  });
  expect(callArgs[0].context).toEqual(
    expect.arrayContaining(
      [{ source: `${name}Screen`, ...(attributes ? { attributes } : {}) }]
        .concat(context as any)
        .filter(Boolean),
    ),
  );
  expect(fireEvent).toHaveBeenCalledTimes(1);
};

const renderPage = (children: React.ReactNode, initialLocation = '/') => {
  const history = createHistory(createMemorySource(initialLocation));

  render(
    <LocationProvider history={history}>
      <AnalyticsListener onEvent={fireEvent} channel={ANALYTICS_BRIDGE_CHANNEL}>
        {children}
      </AnalyticsListener>
    </LocationProvider>,
  );
};

describe('page screen events', () => {
  beforeEach(() => {
    fireEvent.mockReset();
  });

  it('should fire a screen event on the not found page', () => {
    renderPage(<NotFoundPage />);

    assertScreenEventFired('notFound');
  });

  it('should fire a screen event on the brand page', () => {
    renderPage(
      <BrandPage
        data={{
          contents: { nodes: [] },
          hero: { publicURL: '' },
        }}
      />,
    );

    assertScreenEventFired('index', { name: 'brandHome', entriesCount: 0 });
  });

  it('should fire a screen event on the content page', () => {
    renderPage(
      <ContentPage
        data={{
          contents: { nodes: [] },
          hero: { publicURL: '' },
        }}
      />,
    );

    assertScreenEventFired('index', { name: 'contentHome', entriesCount: 0 });
  });

  it('should fire a screen event on the foundations page', () => {
    renderPage(
      <FoundationsPage
        data={{
          contents: { nodes: [] },
          hero: { publicURL: '' },
        }}
      />,
    );

    assertScreenEventFired('index', {
      name: 'foundationsHome',
      entriesCount: 0,
    });
  });

  it('should fire a screen event on the patterns page', () => {
    renderPage(
      <PatternsPage
        data={{
          contents: { nodes: [] },
          hero: { publicURL: '' },
        }}
      />,
    );

    assertScreenEventFired('index', {
      name: 'foundationsHome',
      entriesCount: 0,
    });
  });

  it('should fire a screen event on the resources page', () => {
    renderPage(
      <ResourcesPage
        data={{
          contents: { nodes: [] },
          hero: { publicURL: '' },
        }}
      />,
    );

    assertScreenEventFired('index', { name: 'resourcesHome', entriesCount: 0 });
  });

  it('should fire a screen event on the components page', () => {
    renderPage(
      <ComponentsPage
        data={{
          thumbnails: { nodes: [] },
          components: { nodes: [] },
          hero: { publicURL: '' },
        }}
      />,
    );

    assertScreenEventFired('index', {
      name: 'componentsHome',
      entriesCount: 0,
    });
  });

  it('should fire a screen event on the home page', () => {
    renderPage(
      <HomePage
        data={{
          brand: { nodes: [] },
          foundations: { nodes: [] },
          content: { nodes: [] },
          resources: { nodes: [] },
          hero: { publicURL: '' },
          featuredImageComponents: { publicURL: '' },
          featuredImagePatterns: { publicURL: '' },
        }}
      />,
    );

    assertScreenEventFired('home');
  });

  it('should fire a screen event on a guideline page', () => {
    renderPage(
      <GuidelinePage
        data={{
          allContentfulAsset: { edges: [] },
          contentfulGuideline: {
            title: 'Icon Usage',
            category: 'foundations',
            bodyText: {
              raw:
                '{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"We use the Atlassian Design System values and principles to align our team around a clear set of shared beliefs and goals. They embody our team ethos and will evolve as the design system changes and scales over time.","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"Foundational","nodeType":"text"}],"nodeType":"heading-2"}],"nodeType":"document"}',
            },
          },
          hero: { publicURL: '' },
        }}
      />,
    );

    assertScreenEventFired('content', {
      name: 'foundationsIconUsage',
      context: 'foundations',
    });
  });

  it('should fire a screen event on the log in page', () => {
    renderPage(
      <ProtectedPage
        data={{
          allContentfulAsset: { edges: [] },
          contentfulGuideline: {
            title: 'Icon Usage',
            category: 'foundations',
            bodyText: { content: [], json: { content: [] } },
          },
          hero: { publicURL: '' },
        }}
      />,
    );

    assertScreenEventFired(
      'content',
      { name: 'foundationsIconUsage', context: 'foundations', protected: true },
      { source: 'loginScreen' },
    );
  });

  it('should fire a screen event on the log in error page', () => {
    renderPage(
      <ProtectedPage
        data={{
          allContentfulAsset: { edges: [] },
          contentfulGuideline: {
            title: 'Icon Usage',
            category: 'foundations',
            bodyText: { content: [], json: { content: [] } },
          },
          hero: { publicURL: '' },
        }}
      />,
      '/?retry',
    );

    assertScreenEventFired(
      'content',
      { name: 'foundationsIconUsage', context: 'foundations', protected: true },
      { source: 'loginErrorScreen' },
    );
  });

  it('should fire a screen event on an authenticated content page', () => {
    (useSession as jest.Mock).mockReturnValueOnce(true);

    renderPage(
      <ProtectedPage
        data={{
          allContentfulAsset: { edges: [] },
          contentfulGuideline: {
            title: 'Icon Usage',
            category: 'foundations',
            bodyText: { content: [], json: { content: [] } },
          },
          hero: { publicURL: '' },
        }}
      />,
      '/?retry',
    );

    assertScreenEventFired('content', {
      name: 'foundationsIconUsage',
      context: 'foundations',
      protected: true,
    });
  });

  it('should fire a screen event on a component page defaulting to the first tab', () => {
    renderPage(
      <ComponentPage
        pageContext={{ name: '@atlaskit/avatar' }}
        data={{
          workspaceInfo: { title: 'Avatar' },
          hero: { publicURL: '' },
          mdx: { nodes: [{ parent: { name: 'Examples' } }] },
        }}
      />,
    );

    assertScreenEventFired('content', {
      name: 'componentsAvatarExamples',
      context: 'components',
      packageName: '@atlaskit/avatar',
    });
  });

  it('should fire a screen event on a sub component page defaulting to the first tab', () => {
    renderPage(
      <SubComponentPage
        pageContext={{ name: '@atlaskit/avatar-group', slug: 'avatar-group' }}
        data={{
          workspaceInfo: { title: 'Avatar' },
          hero: { publicURL: '' },
          tabs: { nodes: [{ parent: { name: 'Examples' } }] },
        }}
      />,
    );

    assertScreenEventFired('content', {
      name: 'componentsAvatarAvatarGroupExamples',
      context: 'components',
      packageName: '@atlaskit/avatar-group',
    });
  });

  it('should fire a screen event on a mdx page', () => {
    renderPage(<MdxPage uri="/license" />);

    assertScreenEventFired('content', { context: 'mdx', name: 'license' });
  });

  it('should fire a screen event when a global error occurred', () => {
    spyOn(console, 'error');
    const Throw = () => {
      throw new Error('boom');
    };
    const Component = wrapRootElement;

    renderPage(<Component element={<Throw />} />);

    assertScreenEventFired('error');
  });

  it('should fire a content error screen event', () => {
    spyOn(console, 'error');
    renderPage(<GuidelinePage data={{}} />);

    assertScreenEventFired('contentError');
  });
});
