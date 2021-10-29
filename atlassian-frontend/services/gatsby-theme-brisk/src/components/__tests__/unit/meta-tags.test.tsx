import React from 'react';
import { render } from '@testing-library/react';
import MetaTags from '../../meta-tags';
import * as Gatsby from 'gatsby';

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

useStaticQuery.mockImplementation(() => ({
  site: {
    siteMetadata: {
      siteName: 'Atlassian Design System',
    },
  },
}));

describe('MetaTags - Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correct page title for guideline page for a component', async () => {
    const { container } = render(
      <MetaTags
        parentPageTitle={undefined}
        title={'Button'}
        categorySlug={undefined}
        guidelineCategory={'Components'}
        tabName={'Examples'}
        subpageTabName={undefined}
      />,
    );

    // @ts-ignore
    requestAnimationFrame.flush();
    const siteName = container.ownerDocument
      .querySelector("meta[property='og:site_name']")
      .getAttribute('content');
    expect(container.ownerDocument.querySelector('title')?.textContent).toBe(
      `Button - Examples - Components - ${siteName}`,
    );
  });

  it('should render correct page title for a sub-component', async () => {
    const { container } = render(
      <MetaTags
        parentPageTitle={'Button'}
        title={'Button group'}
        categorySlug={undefined}
        guidelineCategory={'Components'}
        tabName={undefined}
        subpageTabName={'Examples'}
      />,
    );

    // @ts-ignore
    requestAnimationFrame.flush();
    const siteName = container.ownerDocument
      .querySelector("meta[property='og:site_name']")
      .getAttribute('content');
    expect(container.ownerDocument.querySelector('title')?.textContent).toBe(
      `Button group - Examples - Components - ${siteName}`,
    );
  });

  it('should render correct page title for guideline page that is a subpage', async () => {
    const { container } = render(
      <MetaTags
        parentPageTitle={'Messaging guidelines'}
        title={'Feature discovery'}
        categorySlug={undefined}
        guidelineCategory={'Content'}
        tabName={undefined}
        subpageTabName={undefined}
      />,
    );

    // @ts-ignore
    requestAnimationFrame.flush();
    const siteName = container.ownerDocument
      .querySelector("meta[property='og:site_name']")
      .getAttribute('content');
    expect(container.ownerDocument.querySelector('title')?.textContent).toBe(
      `Messaging guidelines - Feature discovery - Content - ${siteName}`,
    );
  });

  it('should render correct page title for overview page', async () => {
    const { container } = render(
      <MetaTags
        parentPageTitle={undefined}
        title={undefined}
        categorySlug={'Foundations'}
        guidelineCategory={undefined}
        tabName={undefined}
        subpageTabName={undefined}
      />,
    );

    // @ts-ignore
    requestAnimationFrame.flush();
    const siteName = container.ownerDocument
      .querySelector("meta[property='og:site_name']")
      .getAttribute('content');
    expect(container.ownerDocument.querySelector('title')?.textContent).toBe(
      `Overview - Foundations - ${siteName}`,
    );
  });

  it('should render correct page title for guideline page that is NOT a subpage', async () => {
    const { container } = render(
      <MetaTags
        parentPageTitle={undefined}
        title={'Color palettes'}
        categorySlug={undefined}
        guidelineCategory={'Resources'}
        tabName={undefined}
        subpageTabName={undefined}
      />,
    );

    // @ts-ignore
    requestAnimationFrame.flush();
    const siteName = container.ownerDocument
      .querySelector("meta[property='og:site_name']")
      .getAttribute('content');
    expect(container.ownerDocument.querySelector('title')?.textContent).toBe(
      `Color palettes - Resources - ${siteName}`,
    );
  });

  it('should render correct page title for page with no category', async () => {
    const { container } = render(
      <MetaTags
        parentPageTitle={undefined}
        title={'License'}
        categorySlug={undefined}
        guidelineCategory={undefined}
        tabName={undefined}
        subpageTabName={undefined}
      />,
    );

    // @ts-ignore
    requestAnimationFrame.flush();
    const siteName = container.ownerDocument
      .querySelector("meta[property='og:site_name']")
      .getAttribute('content');
    expect(container.ownerDocument.querySelector('title')?.textContent).toBe(
      `License - ${siteName}`,
    );
  });

  it('should render correct page title for the home page', async () => {
    const { container } = render(
      <MetaTags
        parentPageTitle={undefined}
        title={undefined}
        categorySlug={undefined}
        guidelineCategory={undefined}
        tabName={undefined}
        subpageTabName={undefined}
      />,
    );

    // @ts-ignore
    requestAnimationFrame.flush();
    const siteName = container.ownerDocument
      .querySelector("meta[property='og:site_name']")
      .getAttribute('content');
    expect(container.ownerDocument.querySelector('title')?.textContent).toBe(
      `${siteName}`,
    );
  });
});
