import { XIDItem, XIDItemType, XIDState } from '@atlassian/atl-cross-domain-tracking/dist/esm';

import { envType } from '../src/analyticsWebTypes';
import { unknownXidCallback, XIDPromise } from '../src/XIDPromise';

const unknownXid = unknownXidCallback();

const dummyXid: XIDItem[] = [{
  type: "xc" as XIDItemType.XC,
  state: "EXISTING" as XIDState.EXISTING,
  value: "abcd",
  createdAt: "123124124",
}];

let mockXidCallbackForPromise = jest.fn().mockImplementation(() => dummyXid)

jest.mock('@atlassian/atl-cross-domain-tracking/dist/esm', () => ({
  ...jest.requireActual<any>('@atlassian/atl-cross-domain-tracking/dist/esm'),
  XID: jest.fn().mockImplementation(() => ({
    __esModule: true,
    getXidCallbackForPromise: mockXidCallbackForPromise
  })),
}));

describe('XIDPromise', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Returns undefined if xidConsent=false with a valid productEnvironment', async () => {
    const xidPromiseCallback = await XIDPromise("dev", false);
    expect(xidPromiseCallback).toEqual(undefined);
  })

  test('Throws error if xidConsent=true with an invalid AWC productEnvironment', async () => {
    const xidPromiseCallback = await XIDPromise("blah", false);
    expect(xidPromiseCallback).toEqual(undefined);
  })

  test('Returns a valid xidPromiseCallback if xidConsent=true with an valid productEnvironment', async () => {
    const validAWCEnvironments = [envType.DEV, envType.LOCAL, envType.PROD, envType.STAGING];
    mockXidCallbackForPromise = jest.fn().mockResolvedValue(() => dummyXid);

    for (const env of validAWCEnvironments) {
      const xidPromiseCallback = await XIDPromise(env, true);

      if (!xidPromiseCallback) {
        throw new Error('Promise callback not returned. Unexpected error.');
      }

      expect(xidPromiseCallback).toBeInstanceOf(Function);
      expect(xidPromiseCallback()).toEqual(dummyXid);
    }
  })

  test('Should return unknown xid when promise rejected from xidPromiseCallback', async () => {
    mockXidCallbackForPromise = jest.fn().mockRejectedValue(unknownXid);
    const xidPromiseCallback = await XIDPromise(envType.DEV, true);

    if (!xidPromiseCallback) {
      throw new Error('Promise callback not returned. Unexpected error.');
    }

    expect(xidPromiseCallback()).toEqual(unknownXid);
  })
})
