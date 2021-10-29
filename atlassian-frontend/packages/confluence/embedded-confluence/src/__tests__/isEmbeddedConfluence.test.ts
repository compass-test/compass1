import { isEmbeddedConfluenceInIframe_DO_NOT_USE } from '../iframe';
import { isEmbeddedConfluence_DO_NOT_USE } from '../isEmbeddedConfluence';

jest.mock('../iframe/isEmbeddedConfluenceInIframe', () => ({
  ...jest.requireActual<any>('../iframe/isEmbeddedConfluenceInIframe'),
  isEmbeddedConfluenceInIframe_DO_NOT_USE: jest.fn(),
}));

beforeEach(() => {
  (isEmbeddedConfluenceInIframe_DO_NOT_USE as jest.Mock).mockReturnValue(false);
});

it('should return false if isEmbeddedConfluenceInIframe returns false and without the embedded query param', () => {
  const location = { search: '' };

  expect(isEmbeddedConfluence_DO_NOT_USE(location)).toEqual(false);
});

it('should return true with embedded query param', () => {
  const location = { search: '?embedded=true' };

  expect(isEmbeddedConfluence_DO_NOT_USE(location)).toEqual(true);
});

it('should return true with parentProduct query param', () => {
  const location = { search: '?parentProduct=JSM' };

  expect(isEmbeddedConfluence_DO_NOT_USE(location)).toEqual(true);
});

it('should return true if isEmbeddedConfluenceInIframe returns true without the embedded query param', () => {
  (isEmbeddedConfluenceInIframe_DO_NOT_USE as jest.Mock).mockReturnValue(true);

  const location = { search: '' };

  expect(isEmbeddedConfluence_DO_NOT_USE(location)).toEqual(true);
});
