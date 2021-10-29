import React, { ReactNode } from 'react';

import { mount } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IntlProvider } from 'react-intl';

import { reports } from '../../../common/reports-mock';
import ReportsResultItem, { ResultIcon } from '../../ReportsResultItem';
import { CardItemTitle, CardItemWrapper } from '../../styled';

const mountWithIntl = (component: ReactNode) => {
  return mount(<IntlProvider locale="en">{component}</IntlProvider>);
};

describe('ReportsResultItem component', () => {
  it('should open selected report', () => {
    const openDialogWithSelectedReport = jest.fn();
    const component = mountWithIntl(
      <ReportsResultItem
        codeInsightsReport={reports[0]}
        openDialogWithSelectedReport={openDialogWithSelectedReport}
      />,
    );

    component.find(CardItemWrapper).simulate('click');
    expect(openDialogWithSelectedReport).toBeCalled();
  });

  it('should render in modal view mode', () => {
    const component = mountWithIntl(
      <ReportsResultItem
        codeInsightsReport={reports[0]}
        openDialogWithSelectedReport={() => {}}
        isModalView
      />,
    );
    const children = component.find(CardItemWrapper).children().children();
    expect(children.first().is(CardItemTitle)).toBe(true);
    expect(children.last().is(ResultIcon)).toBe(true);
  });
});
