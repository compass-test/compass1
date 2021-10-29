import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';

import { ViewPage } from '../ViewPage';
import type { ViewPageProps } from '../ViewPage';

jest.mock('../../experience-tracker', () => ({
  ...jest.requireActual<any>('../../experience-tracker'),
  useEmbeddedConfluenceExperienceTracker: jest.fn(),
  useSetUpViewPageExperience: jest.fn(),
}));

const defaultProps: ViewPageProps = {
  hostname: 'hello.atlassian.net',
  spaceKey: '123',
  contentId: '456',
  parentProductContentContainerId: '10000',
  parentProduct: 'Test',
  navigationPolicy: {
    navigate(url, modifiers, defaultNavigate) {
      return defaultNavigate(url, modifiers);
    },
  },
};

const BasicViewComponent = (props: ViewPageProps) => (
  <IntlProvider locale="en">
    <ViewPage {...props} />
  </IntlProvider>
);

describe('View Component', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(<BasicViewComponent {...defaultProps} />);

    expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
      'src',
      'https://hello.atlassian.net/wiki/spaces/123/pages/456?parentProduct=Test&parentProductContentContainerId=10000&NO_SSR=1',
    );
    expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
      'title',
      'confluence-article-iframe',
    );
  });

  test('should not render iframe if spaceKey is not provided', () => {
    const propsWithoutSpaceKey = {
      ...defaultProps,
      spaceKey: undefined,
    };

    const { queryByTestId } = render(
      <BasicViewComponent {...propsWithoutSpaceKey} />,
    );

    expect(queryByTestId('confluence-page-iframe')).not.toBeInTheDocument();
  });

  test('should render correctly if hostname is not provided', () => {
    const propsWithoutEnv = {
      ...defaultProps,
      hostname: undefined,
    };

    const { getByTestId } = render(<BasicViewComponent {...propsWithoutEnv} />);

    expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
      'src',
      '/wiki/spaces/123/pages/456?parentProduct=Test&parentProductContentContainerId=10000&NO_SSR=1',
    );
  });

  test('should render correctly with parentProductContentId as query if it is provided', () => {
    const propsWithParentProductContentId = {
      ...defaultProps,
      parentProductContentId: '456',
    };

    const { getByTestId } = render(
      <BasicViewComponent {...propsWithParentProductContentId} />,
    );

    expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
      'src',
      'https://hello.atlassian.net/wiki/spaces/123/pages/456?parentProduct=Test&parentProductContentContainerId=10000&parentProductContentId=456&NO_SSR=1',
    );
  });

  test('should render footer logo', () => {
    const { getByTestId } = render(<BasicViewComponent {...defaultProps} />);

    expect(getByTestId('footer-container')).toBeInTheDocument();
  });

  test('should not render footer logo if hasFooterLogo is set to False and parent product is JSM', () => {
    const { queryByTestId } = render(
      <BasicViewComponent
        {...defaultProps}
        hasFooterLogo={false}
        parentProduct={'JSM'}
      />,
    );
    expect(queryByTestId('footer-container')).not.toBeInTheDocument();
  });

  test('should render footer logo if hasFooterLogo is set to False and parent product is other than JSM', () => {
    const { getByTestId } = render(
      <BasicViewComponent {...defaultProps} hasFooterLogo={false} />,
    );
    expect(getByTestId('footer-container')).toBeInTheDocument();
  });

  test('should render footer logo if hasFooterLogo is set to True and parent product is JSM', () => {
    const { getByTestId } = render(
      <BasicViewComponent
        {...defaultProps}
        hasFooterLogo
        parentProduct={'JSM'}
      />,
    );
    expect(getByTestId('footer-container')).toBeInTheDocument();
  });
});
