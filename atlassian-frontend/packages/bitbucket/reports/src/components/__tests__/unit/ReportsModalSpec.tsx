import React, { ReactNode } from 'react';

import { mount } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IntlProvider } from 'react-intl';

import { annotations } from '../../../common/annotations-mock';
import { AnnotationsTable, PrToggle } from '../../ReportsModal';

jest.mock('@atlaskit/spinner', () => 'div');

const mountWithIntl = (component: ReactNode) => {
  return mount(<IntlProvider locale="en">{component}</IntlProvider>);
};

describe('ReportsModal component', () => {
  let observeMock = {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };

  beforeAll(() => {
    (window as any).IntersectionObserver = () => observeMock;
  });

  it('should render PrToggle component when pull request annotations are provided', () => {
    const component = mountWithIntl(
      <AnnotationsTable
        annotations={annotations.map((a) => ({
          ...a,
          result: undefined,
        }))}
        currentPullRequestAnnotations={annotations
          .map((a) => ({
            ...a,
            result: undefined,
          }))
          .slice(0, 2)}
        getSourceUrl={jest.fn()}
        closeDialog={jest.fn()}
      />,
    );
    expect(
      (component.find(PrToggle).props() as any)
        .currentPullRequestAnnotationsForReport.length,
    ).toEqual(2);
  });

  it('should show PR annotations as default view if provided', () => {
    const component = mountWithIntl(
      <AnnotationsTable
        annotations={annotations}
        currentPullRequestAnnotations={annotations.slice(0, 2)}
        getSourceUrl={jest.fn()}
        closeDialog={jest.fn()}
      />,
    );
    expect(
      (component.find(PrToggle).props() as any).isPrAnnotationsSelected,
    ).toBeTruthy();
  });

  it('should show all annotations as default view if no PR annotations provided', () => {
    const component = mountWithIntl(
      <AnnotationsTable
        annotations={annotations}
        getSourceUrl={jest.fn()}
        closeDialog={jest.fn()}
      />,
    );
    expect(
      (component.find(PrToggle).props() as any).isPrAnnotationsSelected,
    ).toBeFalsy();
  });
});
