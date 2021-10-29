import { parsePageProps } from '../parsePageProps';
import { EMBEDDED_CONFLUENCE_MODE } from '../../page-common';

let originalLocation: Location;

beforeEach(() => {
  originalLocation = window.location;

  // @ts-ignore This is the only way to mock `window.location` in Jest
  delete window.location;
  window.location = { ...originalLocation };
  window.location.hostname = 'jira-dev.com';
});

afterEach(() => {
  window.location = originalLocation;
});

const mockBaseProps = {
  hostname: 'hello.atlassian.net',
  contentId: '123',
  spaceKey: 'ABC',
  parentProduct: 'TestProduct',
};

it('should return original props with default protocol and undefined route if no url is provided', () => {
  const mockPassthroughProps = {
    ...mockBaseProps,
    protocol: 'https:',
  };
  const expectedParsedProps = {
    ...mockPassthroughProps,
    mode: EMBEDDED_CONFLUENCE_MODE.VIEW_MODE,
  };
  const result = parsePageProps(mockPassthroughProps);
  expect(result).toEqual(expectedParsedProps);
});

it('should return parsed props and view page route name if only view page url is provided', () => {
  const mockPassthroughProps = {
    url:
      'https://hello.atlassian.net/wiki/spaces/ABC/pages/123?parentProduct=TestProduct',
  };
  const expectedParsedProps = {
    protocol: 'https:',
    mode: EMBEDDED_CONFLUENCE_MODE.VIEW_MODE,
    ...mockBaseProps,
  };
  const result = parsePageProps(mockPassthroughProps);
  expect(result).toEqual(expectedParsedProps);
});

it('should return parsed props and edit page route name if only edit page url is provided', () => {
  const mockPassthroughProps = {
    url:
      'https://hello.atlassian.net/wiki/spaces/ABC/pages/edit-embed/123?parentProduct=TestProduct',
  };
  const expectedParsedProps = {
    protocol: 'https:',
    mode: EMBEDDED_CONFLUENCE_MODE.EDIT_MODE,
    ...mockBaseProps,
  };
  const result = parsePageProps(mockPassthroughProps);
  expect(result).toEqual(expectedParsedProps);
});

it('should return empty string props and undefined route if only unsupported url is provided', () => {
  const mockPassthroughProps = {
    url:
      'https://hello.atlassian.net/wiki/spaces/ABC/calendars?parentProduct=TestProduct',
  };
  const expectedParsedProps = {
    protocol: 'https:',
    contentId: '',
    parentProduct: '',
    mode: null,
    spaceKey: undefined,
    hostname: undefined,
  };
  const result = parsePageProps(mockPassthroughProps);
  expect(result).toEqual(expectedParsedProps);
});

it('should take passed in props priority over url parsing', () => {
  const mockPassthroughProps = {
    url:
      'https://pug.jira-dev.com/wiki/spaces/DEF/pages/456?parentProduct=mock',
    ...mockBaseProps,
  };
  const expectedParsedProps = {
    protocol: 'https:',
    mode: EMBEDDED_CONFLUENCE_MODE.VIEW_MODE,
    ...mockBaseProps,
  };
  const result = parsePageProps(mockPassthroughProps);
  expect(result).toEqual(expectedParsedProps);
});

it('should take the first parent product query param if query has multiple parent products', () => {
  const mockPassthroughProps = {
    url:
      'https://hello.atlassian.net/wiki/spaces/ABC/pages/123?parentProduct=TestProduct&parentProduct=mock',
  };
  const expectedParsedProps = {
    protocol: 'https:',
    mode: EMBEDDED_CONFLUENCE_MODE.VIEW_MODE,
    ...mockBaseProps,
  };
  const result = parsePageProps(mockPassthroughProps);
  expect(result).toEqual(expectedParsedProps);
});

it('should take window.location as hostname if the hostname cannot be extracted', () => {
  const mockPassthroughProps = {
    url: '/wiki/spaces/ABC/pages/123?parentProduct=TestProduct',
  };
  const expectedParsedProps = {
    protocol: 'https:',
    mode: EMBEDDED_CONFLUENCE_MODE.VIEW_MODE,
    hostname: 'jira-dev.com',
    contentId: '123',
    spaceKey: 'ABC',
    parentProduct: 'TestProduct',
  };
  const result = parsePageProps(mockPassthroughProps);
  expect(result).toEqual(expectedParsedProps);
});
