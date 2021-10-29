import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import { appList } from '../../../../common/mocks';
import AppsNotInstalledOnCloud from '../../AppsNotInstalledOnCloud';

describe('AppsNotInstalledOnCloud', () => {
  it('Should have the buttons be called correctly', () => {
    const onRemoveFn = jest.fn();
    const { getAllByRole } = render(
      <IntlProvider locale="en">
        <AppsNotInstalledOnCloud
          appAssessmentUrl="https://www.google.com"
          onRemoveApps={onRemoveFn}
          listOfOccurrences={[]}
        />
      </IntlProvider>,
    );

    const buttons = getAllByRole('button');

    const onRemoveButton = buttons[0];
    userEvent.click(onRemoveButton);
    expect(onRemoveFn).toHaveBeenCalledTimes(1);
  });

  it('Should render a list of apps', () => {
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <AppsNotInstalledOnCloud
          appAssessmentUrl="https://www.google.com"
          onRemoveApps={jest.fn()}
          listOfOccurrences={appList}
        />
      </IntlProvider>,
    );

    const appListArray = getByTestId('app-list');
    const listItems = appListArray.getElementsByTagName('tr');
    expect(listItems.length).toEqual(appList.length);
    expect(listItems[0].textContent).toBe(appList[0].name);
    expect(listItems[1].textContent).toBe(appList[1].name);
  });

  it('Should have <a> in apps needed in cloud list', () => {
    const { container } = render(
      <IntlProvider locale="en">
        <AppsNotInstalledOnCloud
          appAssessmentUrl="https://www.google.com"
          onRemoveApps={jest.fn()}
          listOfOccurrences={appList}
        />
      </IntlProvider>,
    );
    const anchorTags = container.querySelectorAll('a');
    expect(anchorTags.length).toBe(appList.length + 1);
    expect(anchorTags[1]).toHaveAttribute('href', appList[0].url);
    expect(anchorTags[2]).toHaveAttribute('href', appList[1].url);
  });

  it('should have the assessment link rendered', () => {
    const href = 'https://www.google.com/';
    const { container } = render(
      <IntlProvider locale="en">
        <AppsNotInstalledOnCloud
          appAssessmentUrl={href}
          onRemoveApps={jest.fn()}
          listOfOccurrences={appList}
        />
      </IntlProvider>,
    );
    const link = container.querySelector('a');
    expect(link?.href).toBe(href);
  });
});
