import { isEmbeddedConfluenceInIframe_DO_NOT_USE } from '../isEmbeddedConfluenceInIframe';

describe('isEmbeddedConfluenceIframe', () => {
  let mockedWindowFrameElement: jest.SpyInstance;

  beforeEach(() => {
    mockedWindowFrameElement = jest.spyOn(window, 'frameElement', 'get');
  });

  afterEach(() => {
    mockedWindowFrameElement.mockRestore();
  });

  it('should return false if window does not have frameElement', () => {
    mockedWindowFrameElement.mockReturnValue(null);

    expect(isEmbeddedConfluenceInIframe_DO_NOT_USE()).toBe(false);
  });

  it('should return false if frameElement does not have the observable object', () => {
    mockedWindowFrameElement.mockReturnValue({ test: '123' });

    expect(isEmbeddedConfluenceInIframe_DO_NOT_USE()).toBe(false);
  });

  it('should return true if window has frameElement and the frameElement has the observable object', () => {
    mockedWindowFrameElement.mockReturnValue({
      __EP_REACT_PROPS_OBSERVABLE_OBJECT__: '123',
    });

    expect(isEmbeddedConfluenceInIframe_DO_NOT_USE()).toBe(true);
  });
});
