import React from 'react';
import { shallow, mount } from 'enzyme';
import TableTree, { Header, Rows, Row } from '@atlaskit/table-tree';
import { Contributors } from '../../components/Contributors';
import LastUpdated from '../../components/LastUpdated';
import { ErrorState } from '../../components/ErrorState';
import PageTree, { PageTreeBase } from '../../components/PageTree';
import * as confluence from '../../api/confluence';
import ErrorRow from '../../components/ErrorRow';
import { AnalyticsWebClient } from '../../types';
import { AnalyticsProvider } from '../../index';
import messages from '../../messages';
import { IntlProvider } from 'react-intl';
import { getMockResponseForGetChildren } from '../../services/confluence/mocks';

const intlProvider = new IntlProvider({ locale: 'en' });
const { intl } = intlProvider.getChildContext();

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

jest.mock('../../api/confluence', () => ({
  __esModule: true,
  getChildren: jest.fn(),
}));

describe('<PageTree />', () => {
  let confluenceGetChildrenMock = confluence.getChildren as jest.Mock;
  const setStateSpy = jest.spyOn(PageTreeBase.prototype, 'setState');

  let mockAnalyticsWebClient: AnalyticsWebClient;
  beforeEach(() => {
    mockAnalyticsWebClient = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
    };
    confluenceGetChildrenMock.mockResolvedValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render only headers when all props are null', () => {
    const wrapper = mount(
      <IntlProvider locale="en" messages={messages}>
        <PageTree contentId={null} cloudId={null} spaceKey={null} />
      </IntlProvider>,
    );

    expect(wrapper.find(TableTree)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(3);
    expect(wrapper.find(ErrorState)).toHaveLength(0);
    expect(wrapper.find(Rows)).toHaveLength(0);
  });

  test('should trigger analytics when header is clicked', () => {
    const wrapper = mount(
      <IntlProvider locale="en" messages={messages}>
        <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
          <PageTree contentId={null} cloudId={null} spaceKey={null} />
        </AnalyticsProvider>
      </IntlProvider>,
    );

    wrapper.find(Header).at(0).simulate('click');
    expect(mockAnalyticsWebClient.sendUIEvent).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        action: 'clicked',
        actionSubject: 'tableTreeHeader',
        actionSubjectId: 'confluencePageTreeTitleHeader',
      }),
    );

    wrapper.find(Header).at(1).simulate('click');
    expect(mockAnalyticsWebClient.sendUIEvent).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        action: 'clicked',
        actionSubject: 'tableTreeHeader',
        actionSubjectId: 'confluencePageTreeContributorsHeader',
      }),
    );

    wrapper.find(Header).at(2).simulate('click');
    expect(mockAnalyticsWebClient.sendUIEvent).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        action: 'clicked',
        actionSubject: 'tableTreeHeader',
        actionSubjectId: 'confluencePageTreeLastModifiedHeader',
      }),
    );

    expect(wrapper.find(Header)).toHaveLength(3);
  });

  test('should render only headers contentId is null and other props are supplied', () => {
    const wrapper = mount(
      <IntlProvider locale="en" messages={messages}>
        <PageTree contentId={null} cloudId="AAA" spaceKey="BBB" />
      </IntlProvider>,
    );

    expect(wrapper.find(TableTree)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(3);
    expect(wrapper.find(ErrorState)).toHaveLength(0);
    expect(wrapper.find(Rows)).toHaveLength(0);
  });

  test('should render empty ErrorState when PageTree state is empty', () => {
    const wrapper = shallow(
      <PageTreeBase
        contentId={null}
        cloudId={null}
        spaceKey={null}
        intl={intl}
      />,
    );

    (wrapper.instance() as PageTreeBase).loadChildrenFor = jest.fn();

    wrapper
      .setProps({
        contentId: 'AAA',
        cloudId: 'AAA',
        spaceKey: 'AAA',
      })
      .setState({ errorType: 'empty' });
    expect(wrapper.find(ErrorState).exists()).toEqual(true);
    expect(wrapper.find(ErrorState).prop('type')).toEqual('empty');
    expect(wrapper.find(Rows)).toHaveLength(0);
  });

  test('should render empty ErrorState with readOnly button', () => {
    const wrapper = shallow(
      <PageTreeBase
        contentId={null}
        cloudId={null}
        spaceKey={null}
        intl={intl}
        readOnly
      />,
    );

    (wrapper.instance() as PageTreeBase).loadChildrenFor = jest.fn();

    wrapper.setProps({
      contentId: 'AAA',
      cloudId: 'AAA',
      spaceKey: 'AAA',
    });
    wrapper.setState({ errorType: 'empty' });
    expect(wrapper.dive().find(ErrorState).prop('readOnly')).toEqual(true);
  });

  test('should render ErrorState with prop type as error when state is error', () => {
    const wrapper = shallow(
      <PageTreeBase
        contentId={null}
        cloudId={null}
        spaceKey={null}
        intl={intl}
      />,
    );

    (wrapper.instance() as PageTreeBase).loadChildrenFor = jest.fn();

    wrapper.setProps({
      contentId: 'AAA',
      cloudId: 'AAA',
      spaceKey: 'AAA',
    });
    wrapper.setState({ errorType: 'error' });

    expect(wrapper.dive().find(ErrorState).prop('type')).toEqual('error');
    expect(wrapper.find(Rows)).toHaveLength(0);
  });

  test('should reset errorType when new props are supplied', () => {
    const wrapper = shallow(
      <PageTreeBase
        contentId={null}
        cloudId={null}
        spaceKey={null}
        intl={intl}
      />,
    );

    (wrapper.instance() as PageTreeBase).loadChildrenFor = jest.fn();

    wrapper.setProps({
      contentId: 'AAA',
      cloudId: 'AAA',
      spaceKey: 'AAA',
    });

    expect(setStateSpy).toHaveBeenCalledWith({
      errorType: null,
    });
  });

  test('should call setState with empty errorType and empty items when API response is empty', async () => {
    confluenceGetChildrenMock.mockResolvedValue([]);

    const wrapper = mount(
      <PageTreeBase contentId="AAA" cloudId="AAA" spaceKey="AAA" intl={intl} />,
    );

    await (wrapper.instance() as PageTreeBase).loadChildrenFor();
    expect(setStateSpy).toHaveBeenCalledWith({
      items: [],
      errorType: 'empty',
    });
  });

  test('loadChildren should return undefined when contentId is null', async () => {
    confluenceGetChildrenMock.mockReturnValue(Promise.resolve([]));

    const wrapper = mount(
      <PageTreeBase
        contentId={null}
        cloudId={null}
        spaceKey={null}
        intl={intl}
      />,
    );

    const loadChildrenFor = await (wrapper.instance() as PageTreeBase).loadChildrenFor();
    expect(loadChildrenFor).toBe(undefined);
    expect(setStateSpy).toHaveBeenCalledTimes(0);
    expect(confluenceGetChildrenMock).toHaveBeenCalledTimes(0);
  });

  test('loadChildren should set errorType as null and fire analytics when API responds with data', async () => {
    confluenceGetChildrenMock.mockResolvedValue(
      getMockResponseForGetChildren(),
    );

    const wrapper = mount(
      <IntlProvider locale="en" messages={messages}>
        <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
          <PageTree contentId="AAA" cloudId="AAA" spaceKey="AAA" />
        </AnalyticsProvider>
      </IntlProvider>,
    );

    await flushPromises();
    expect(wrapper.find(PageTreeBase).instance().state).toMatchObject({
      errorType: null,
    });

    expect(mockAnalyticsWebClient.sendOperationalEvent).toBeCalledWith(
      expect.objectContaining({
        action: 'shown',
        actionSubject: 'confluencePageTree',
        attributes: expect.objectContaining({
          pageCount: 1,
          root: true,
        }),
      }),
    );
  });

  test('loadChildren should call setState and should fire analytics when API responds with data for children', async () => {
    confluenceGetChildrenMock.mockResolvedValue(
      getMockResponseForGetChildren(),
    );

    mount(
      <IntlProvider locale="en" messages={messages}>
        <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
          <PageTree contentId="AAA" cloudId="AAA" spaceKey="AAA" />
        </AnalyticsProvider>
      </IntlProvider>,
    );

    await flushPromises();

    expect(mockAnalyticsWebClient.sendOperationalEvent).toBeCalledWith(
      expect.objectContaining({
        action: 'shown',
        actionSubject: 'confluencePageTree',
        attributes: expect.objectContaining({
          pageCount: 1,
          root: true,
        }),
      }),
    );
    expect(setStateSpy).toHaveBeenCalledTimes(1);
  });

  test('loadChildren should setState with errorType as error when API fails', async () => {
    confluenceGetChildrenMock.mockRejectedValue({ message: 'API error 500' });
    const onErrorSpy = jest.fn();

    mount(
      <IntlProvider locale="en" messages={messages}>
        <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
          <PageTree
            contentId="AAA"
            cloudId="AAA"
            spaceKey="AAA"
            onError={onErrorSpy}
          />
        </AnalyticsProvider>
      </IntlProvider>,
    );

    await flushPromises();

    expect(mockAnalyticsWebClient.sendOperationalEvent).toBeCalledWith(
      expect.objectContaining({
        action: 'failed',
        actionSubject: 'confluencePageTree',
        attributes: expect.objectContaining({
          error: 'API error 500',
          root: true,
        }),
      }),
    );
    expect(setStateSpy).toBeCalledWith({ errorType: 'error' });
    expect(onErrorSpy).toBeCalledTimes(0);
  });

  test('loadChildren should not call setState with errorType when API fails for child rows', async () => {
    const mockData = getMockResponseForGetChildren();
    const error = { message: 'API error 500' };

    confluenceGetChildrenMock.mockImplementation((arg) => {
      switch (arg) {
        case 'AAA':
          return Promise.resolve(mockData);
        case 'long-1':
          return Promise.reject(error);
      }
    });

    const onErrorSpy = jest.fn();

    const wrapper = mount(
      <IntlProvider locale="en" messages={messages}>
        <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
          <PageTree
            contentId="AAA"
            cloudId="AAA"
            spaceKey="AAA"
            onError={onErrorSpy}
          />
        </AnalyticsProvider>
      </IntlProvider>,
    );

    await flushPromises();
    setStateSpy.mockClear();
    await (wrapper
      .find(PageTreeBase)
      .instance() as PageTreeBase).loadChildrenFor({
      id: 'long-1',
      children: [],
    });
    expect(mockAnalyticsWebClient.sendOperationalEvent).toBeCalledWith(
      expect.objectContaining({
        action: 'failed',
        actionSubject: 'confluencePageTree',
        attributes: expect.objectContaining({
          error: 'API error 500',
          root: false,
        }),
      }),
    );
    expect(setStateSpy).toHaveBeenCalledTimes(1);
    expect(setStateSpy).toHaveBeenCalledWith(
      expect.not.objectContaining({
        errorType: 'empty',
      }),
    );
    expect(onErrorSpy).toHaveBeenCalledWith(error);
  });

  test('should render Page Tree rows based on loadChildren response', async () => {
    const mockData = getMockResponseForGetChildren();
    confluenceGetChildrenMock.mockResolvedValue(mockData);

    const wrapper = mount(
      <IntlProvider locale="en" messages={messages}>
        <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
          <PageTree contentId="AAA" cloudId="AAA" spaceKey="AAA" />
        </AnalyticsProvider>
      </IntlProvider>,
    );

    await flushPromises();
    wrapper.update();

    const pageTitle = wrapper.find(Row).find('a');
    expect(wrapper.find(Contributors)).toHaveLength(1);
    expect(wrapper.find(LastUpdated)).toHaveLength(1);
    expect((pageTitle.getDOMNode() as HTMLLinkElement).href).toMatch(
      `/wiki${mockData[0]._links.webui}`,
    );
    expect(pageTitle.text()).toEqual(mockData[0].title);

    pageTitle.simulate('click');
    expect(mockAnalyticsWebClient.sendUIEvent).toBeCalledWith(
      expect.objectContaining({
        action: 'clicked',
        actionSubject: 'link',
        actionSubjectId: 'confluencePageTreeLink',
      }),
    );
  });

  // TODO this test relies on very loose selectors to pass, please review
  test('should render ErrorRow when a row is expanded and loadChildren fails', async () => {
    const mockData = getMockResponseForGetChildren();
    const error = new Error('API responded with failure HTTP code: 500');

    confluenceGetChildrenMock.mockImplementation((arg) => {
      switch (arg) {
        case 'AAA':
          return Promise.resolve(mockData);
        case 'long-1':
          return Promise.reject(error);
      }
    });

    const wrapper = mount(
      <IntlProvider locale="en" messages={messages}>
        <AnalyticsProvider analyticsClient={mockAnalyticsWebClient}>
          <PageTree contentId="AAA" cloudId="AAA" spaceKey="AAA" />
        </AnalyticsProvider>
      </IntlProvider>,
    );

    await flushPromises();
    wrapper.update();
    wrapper.find('button').first().simulate('click');
    expect(mockAnalyticsWebClient.sendUIEvent).toBeCalledWith(
      expect.objectContaining({
        action: 'expanded',
        actionSubject: 'tableTree',
        actionSubjectId: 'confluencePageTree',
      }),
    );

    await flushPromises();
    wrapper.update();
    expect(wrapper.find(ErrorRow)).toHaveLength(1);
    expect(mockAnalyticsWebClient.sendOperationalEvent).toBeCalledWith(
      expect.objectContaining({
        action: 'failed',
        actionSubject: 'confluencePageTree',
        attributes: expect.objectContaining({
          error: 'API responded with failure HTTP code: 500',
          root: false,
        }),
      }),
    );

    wrapper.find('button').first().simulate('click');
    expect(mockAnalyticsWebClient.sendUIEvent).toBeCalledWith(
      expect.objectContaining({
        action: 'collapsed',
        actionSubject: 'tableTree',
        actionSubjectId: 'confluencePageTree',
      }),
    );
  });
});
