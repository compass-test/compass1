import { createHistory } from '../../../custom-ui/iframe/history';
import { createBrowserHistory } from 'history';

const MOCK_BASE_PATH = '/jira/something';
const MOCK_BASE_URL = `https://www.atlassian.com${MOCK_BASE_PATH}`;

let pushSpy: jest.SpyInstance;
let replaceSpy: jest.SpyInstance;

const getHistory = () => {
  delete (window as any).location;
  (window as any).location = new URL(MOCK_BASE_URL);

  const browserHistory = createBrowserHistory();
  pushSpy = jest.spyOn(browserHistory, 'push');
  replaceSpy = jest.spyOn(browserHistory, 'replace');

  return createHistory({
    history: browserHistory,
    extensionBasePath: MOCK_BASE_PATH,
  });
};

describe('createHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should return an object that can interface with the browser's history api`, () => {
    const history = getHistory();

    expect(history).toBeDefined();
    expect(history?.push).toBeDefined();
    expect(history?.replace).toBeDefined();
    expect(history?.listen).toBeDefined();
    expect(history?.location).toBeDefined();
    expect(history?.goBack).toBeDefined();
    expect(history?.goForward).toBeDefined();
  });

  it(`should override 'location.pathname' to make it relative to the app/extension url`, () => {
    const history = getHistory();

    expect(history?.location.pathname).toEqual('/');
  });

  it(`should proxy 'push' method and transform the relative path into full path`, () => {
    const history = getHistory();
    history?.push('/page-1');

    expect(pushSpy).toHaveBeenCalledWith(`${MOCK_BASE_PATH}/page-1`, undefined);
  });

  it(`should proxy 'replace' method and transform the relative path into full path`, () => {
    const history = getHistory();
    history?.replace('/page-1000');

    expect(replaceSpy).toHaveBeenCalledWith(
      `${MOCK_BASE_PATH}/page-1000`,
      undefined,
    );
  });

  it(`should proxy 'listen' method and make 'location.pathname' relative to the app/extension url`, () => {
    const history = getHistory();

    const listener = jest.fn();
    history?.listen(listener);
    expect(listener).not.toHaveBeenCalled();

    history?.push('/my-page');

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/my-page' }),
      'PUSH',
    );
  });
});
