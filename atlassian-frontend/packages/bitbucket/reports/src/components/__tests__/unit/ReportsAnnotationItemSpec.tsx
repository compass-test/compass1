import React, { ReactNode } from 'react';

import { mount } from 'enzyme';
import AnimateHeight from 'react-animate-height';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IntlProvider } from 'react-intl';

import Button from '@atlaskit/button/custom-theme-button';

import { annotations } from '../../../common/annotations-mock';
import {
  AnnotationResultIcon,
  AnnotationSeverityIcon,
  ReportsAnnotationItemWithoutAnalytics as ReportsAnnotationItem,
} from '../../ReportsAnnotationItem';
import {
  AnnotationExpander,
  BodyExpanderCell,
  BodyPathCell,
} from '../../styled';

const mountWithIntl = (component: ReactNode) => {
  return mount(
    <IntlProvider locale="en">
      <table>
        <tbody>{component}</tbody>
      </table>
    </IntlProvider>,
  );
};

describe('ReportsAnnotationItem component', () => {
  test.each<[string]>([['result'], ['severity'], ['details'], ['path']])(
    `should render %s field`,
    (field) => {
      const component = mountWithIntl(
        <ReportsAnnotationItem
          getSourceUrl={(() => {}) as any}
          codeInsightsAnnotation={annotations[0]}
          hasResult={field === 'result'}
          hasSeverity={field === 'severity'}
          hasDetails={field === 'details'}
          hasPath={field === 'path'}
        />,
      );
      expect(component.find(AnnotationResultIcon).length).toEqual(
        field === 'result' ? 1 : 0,
      );
      expect(component.find(AnnotationSeverityIcon).length).toEqual(
        field === 'severity' ? 1 : 0,
      );
      expect(component.find(BodyExpanderCell).length).toEqual(
        field === 'details' ? 1 : 0,
      );
      expect(component.find(BodyPathCell).length).toEqual(
        field === 'path' ? 1 : 0,
      );
    },
  );

  it('should expand annotation details', () => {
    const component = mountWithIntl(
      <ReportsAnnotationItem
        getSourceUrl={(() => {}) as any}
        codeInsightsAnnotation={annotations[0]}
        hasResult={false}
        hasSeverity={false}
        hasDetails
        hasPath={false}
      />,
    );

    const getAnimateHeightVal = () =>
      component.find(AnimateHeight).first().prop('height');

    expect(getAnimateHeightVal()).toBe(0);
    component
      .find(AnnotationExpander)
      .first()
      .find(Button)
      .first()
      .simulate('click');
    expect(getAnimateHeightVal()).toBe('auto');
  });

  it('should handle clicking on annotation path', () => {
    const onPathClick = jest.fn();
    const component = mountWithIntl(
      <ReportsAnnotationItem
        getSourceUrl={(() => {}) as any}
        codeInsightsAnnotation={annotations[0]}
        hasResult={false}
        hasSeverity={false}
        hasDetails={false}
        hasPath
        onPathClick={onPathClick}
      />,
    );

    component.find(Button).first().simulate('click');

    expect(onPathClick).toBeCalled();
  });

  it('should handle clicking on external annotation', () => {
    const onExternalAnnotationClick = jest.fn();
    const component = mountWithIntl(
      <ReportsAnnotationItem
        getSourceUrl={(() => {}) as any}
        codeInsightsAnnotation={annotations[0]}
        hasResult={false}
        hasSeverity={false}
        hasDetails={false}
        hasPath
        onExternalAnnotationClick={onExternalAnnotationClick}
      />,
    );

    component.find(Button).last().simulate('click');

    expect(onExternalAnnotationClick).toBeCalled();
  });

  it('should link annotation to the source browser', () => {
    const component = mountWithIntl(
      <ReportsAnnotationItem
        getSourceUrl={(foo) => foo}
        codeInsightsAnnotation={annotations[0]}
        hasResult={false}
        hasSeverity={false}
        hasDetails={false}
        hasPath
      />,
    );

    const pathButton = component.find(BodyPathCell).first().find(Button);
    expect(pathButton.props().href).toEqual('annotation.java#lines-10');
  });

  it('should link annotation to the pr file in pr mode', () => {
    const closeDialog = jest.fn();
    const component = mountWithIntl(
      <ReportsAnnotationItem
        getSourceUrl={(foo) => foo}
        codeInsightsAnnotation={annotations[0]}
        hasResult={false}
        hasSeverity={false}
        hasDetails={false}
        hasPath
        isPrAnnotationsSelected
        onCloseDialog={closeDialog}
      />,
    );

    const pathButton = component.find(BodyPathCell).first().find(Button);
    pathButton.simulate('click');
    expect(pathButton.props().href).toEqual('#Lannotation.javaT10');
    expect(closeDialog).toHaveBeenCalled();
  });
});
