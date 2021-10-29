import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider, FormattedMessage } from 'react-intl';

import AtlassianIntlProvider from '../../intl-provider';
import { Skeleton } from '../../../primitives';
import { waitFor } from '@testing-library/dom';

import es from '../../../../i18n/es';
import zh from '../../../../i18n/zh';
import zhTW from '../../../../i18n/zh_TW';

const EN_TRANS = 'Test';
const TRANS_KEY = 'fabric.atlassianSwitcher.browseApps';

const flushPromises = () => new Promise(setImmediate);

const renderComponent = (locale?: string) => {
  return mount(
    <IntlProvider locale={locale}>
      <AtlassianIntlProvider>
        <FormattedMessage
          id={TRANS_KEY}
          defaultMessage={EN_TRANS}
          description=""
        />
      </AtlassianIntlProvider>
    </IntlProvider>,
  );
};

describe('intl-provider', () => {
  it('No loading mask for "undefined" language', async () => {
    const wrapper = renderComponent();

    await waitFor(() => {
      expect(wrapper.find(Skeleton).length).toEqual(0);
    });

    expect(wrapper.find(FormattedMessage).text()).toEqual(EN_TRANS);
  });

  it('No loading mask for "en" language', async () => {
    const wrapper = renderComponent('en');

    await waitFor(() => {
      expect(wrapper.find(Skeleton).length).toEqual(0);
    });

    expect(wrapper.find(FormattedMessage).text()).toEqual(EN_TRANS);
  });

  it.each([
    ['es', es[TRANS_KEY]],
    ['es-QQQ', es[TRANS_KEY]],
    ['zh', zh[TRANS_KEY]],
    ['zh-TW', zhTW[TRANS_KEY]],
    ['en-US', EN_TRANS],
    ['en-GB', EN_TRANS],
  ])(`Given locale %p renders result %p`, async (locale, result) => {
    const wrapper = renderComponent(locale);

    expect(wrapper.text()).toEqual('');
    expect(wrapper.find(FormattedMessage).length).toEqual(0);
    expect(wrapper.find(Skeleton).length).toEqual(1);

    await flushPromises(); // set messages
    await flushPromises(); // clear loading flag
    wrapper.update();

    await waitFor(() => {
      expect(wrapper.find(Skeleton).length).toEqual(0);
    });

    await waitFor(() => {
      expect(wrapper.find(FormattedMessage).text().length).toBeGreaterThan(0);
    });

    expect(result).toBe(wrapper.text());
  });
});
