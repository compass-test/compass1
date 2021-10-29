import React from 'react';
import { render } from '@testing-library/react';

import { EditPage } from '../EditPage';
import type { EditPageProps } from '../EditPage';

jest.mock('../../experience-tracker', () => ({
  ...jest.requireActual<any>('../../experience-tracker'),
  useEmbeddedConfluenceExperienceTracker: jest.fn(),
}));

describe('EditPage Component', () => {
  const defaultProps: EditPageProps = {
    spaceKey: '123',
    contentId: '456',
    parentProductContentContainerId: '10000',
    hostname: 'hello.atlassian.net',
    navigationPolicy: {
      navigate(url, modifiers, defaultNavigate) {
        return defaultNavigate(url, modifiers);
      },
    },
    parentProduct: 'JSM',
  };

  test('should render correctly', () => {
    const { getByTestId } = render(<EditPage {...defaultProps} />);

    expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
      'src',
      'https://hello.atlassian.net/wiki/spaces/123/pages/edit-embed/456?parentProduct=JSM&parentProductContentContainerId=10000',
    );
    expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
      'title',
      'confluence-article-iframe',
    );
  });

  test('should render correctly if hostname is not provided', () => {
    const propsWithoutEnv = {
      ...defaultProps,
      hostname: undefined,
    };

    const { getByTestId } = render(<EditPage {...propsWithoutEnv} />);

    expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
      'src',
      '/wiki/spaces/123/pages/edit-embed/456?parentProduct=JSM&parentProductContentContainerId=10000',
    );
  });

  test('should render correctly with parentProductContentId as query if it is provided', () => {
    const propsWithParentProductContentId = {
      ...defaultProps,
      parentProductContentId: '456',
    };

    const { getByTestId } = render(
      <EditPage {...propsWithParentProductContentId} />,
    );

    expect(getByTestId('confluence-page-iframe')).toHaveAttribute(
      'src',
      'https://hello.atlassian.net/wiki/spaces/123/pages/edit-embed/456?parentProduct=JSM&parentProductContentContainerId=10000&parentProductContentId=456',
    );
  });
});
