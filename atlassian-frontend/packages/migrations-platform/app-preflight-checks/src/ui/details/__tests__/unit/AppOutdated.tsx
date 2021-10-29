import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import { outdatedApps } from '../../../../common/mocks';
import AppOutdated from '../../AppOutdated';

describe('AppOutdated', () => {
  it('Buttons should be called correctly', () => {
    const onRemoveFn = jest.fn();
    const { getAllByRole } = render(
      <IntlProvider locale="en">
        <AppOutdated
          appAssessmentUrl="https://www.google.com"
          onRemoveApps={onRemoveFn}
          outdatedApps={[]}
        />
      </IntlProvider>,
    );
    const buttons = getAllByRole('button');

    const onRemoveButton = buttons[0];
    userEvent.click(onRemoveButton);
    expect(onRemoveFn).toHaveBeenCalledTimes(1);
  });

  it('Should render a list of current server version', () => {
    const { container } = render(
      <IntlProvider locale="en">
        <AppOutdated
          appAssessmentUrl="https://www.google.com"
          onRemoveApps={jest.fn()}
          outdatedApps={outdatedApps}
        />
      </IntlProvider>,
    );
    const appList = container.querySelectorAll('td');
    const serverApps = [appList[0], appList[2]];

    const app1Title = serverApps[0].textContent;
    const app1Detail = outdatedApps[0];
    expect(app1Title).toBe(app1Detail.name + ' ' + app1Detail.version);

    const app2Title = serverApps[1].textContent;
    const app2Detail = outdatedApps[1];
    expect(app2Title).toBe(app2Detail.name + ' ' + app2Detail.version);
  });

  it('Should render a list of server apps with migration paths', () => {
    const { container } = render(
      <IntlProvider locale="en">
        <AppOutdated
          appAssessmentUrl="https://www.google.com"
          onRemoveApps={jest.fn()}
          outdatedApps={outdatedApps}
        />
      </IntlProvider>,
    );

    const appList = container.querySelectorAll('td');
    const appsWithMigrationPath = [appList[1], appList[3]];

    const app1Title = appsWithMigrationPath[0].textContent;
    const app1Detail = outdatedApps[0];
    expect(app1Title).toBe(
      app1Detail.name + ' ' + app1Detail.versionWithMigration,
    );

    const app2Title = appsWithMigrationPath[1].textContent;
    const app2Detail = outdatedApps[1];
    expect(app2Title).toBe(
      app2Detail.name + ' ' + app2Detail.versionWithMigration,
    );
  });

  it('Should have <a> in server apps with migration path list', () => {
    const { container } = render(
      <IntlProvider locale="en">
        <AppOutdated
          appAssessmentUrl="https://www.google.com"
          onRemoveApps={jest.fn()}
          outdatedApps={outdatedApps}
        />
      </IntlProvider>,
    );
    const anchorTags = container.querySelectorAll('a');

    const app1Url = outdatedApps[0].url;
    const app2Url = outdatedApps[1].url;

    expect(anchorTags[1]).toHaveAttribute('href', app1Url);
    expect(anchorTags[2]).toHaveAttribute('href', app2Url);
  });
});
