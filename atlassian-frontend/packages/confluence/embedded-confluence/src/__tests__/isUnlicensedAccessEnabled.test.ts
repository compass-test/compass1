import { isUnlicensedAccessEnabled_DO_NOT_USE } from '../isUnlicensedAccessEnabled';
import { ObservableObject } from '../ObservableObject';

let mockedWindowFrameElement: jest.SpyInstance;

beforeEach(() => {
  mockedWindowFrameElement = jest.spyOn(window, 'frameElement', 'get');
});

afterEach(() => {
  mockedWindowFrameElement.mockRestore();
});

it('return false if window.frameElement returns null and query param does not include parentProduct unlicensed access props', () =>
  assertIsUnlicensedAccessEnabled(
    { search: '?parentProduct=JSM' },
    null,
    false,
  ));

it('return false if neither observable object nor query param includes all parent product unlicensed access props', () => {
  const mockedObservable = new ObservableObject();
  mockedObservable.object = {
    parentProduct: 'JSM',
  };

  assertIsUnlicensedAccessEnabled(
    { search: '?parentProduct=JSM' },
    mockedObservable,
    false,
  );
});

it('return true if window.frameElement returns null but query param include all parentProduct unlicensed access props', () =>
  assertIsUnlicensedAccessEnabled(
    { search: '?parentProduct=JSM&parentProductContentContainerId=10000' },
    null,
    true,
  ));

it('return true if observable object includes all parentProduct unlicensed access props but query param does not include parentProduct unlicensed access props', () => {
  const mockedObservable = new ObservableObject();

  mockedObservable.object = {
    parentProduct: 'JSM',
    parentProductContentContainerId: '10000',
  };

  assertIsUnlicensedAccessEnabled(
    { search: '?parentProduct=JSM' },
    mockedObservable,
    true,
  );
});

function assertIsUnlicensedAccessEnabled(
  mockedLocation: { search: string },
  mockedFrameElementObject: object | null,
  expectedResult: boolean,
) {
  mockedWindowFrameElement.mockReturnValue({
    __EP_REACT_PROPS_OBSERVABLE_OBJECT__: mockedFrameElementObject,
  });

  expect(isUnlicensedAccessEnabled_DO_NOT_USE(mockedLocation)).toBe(
    expectedResult,
  );
}
