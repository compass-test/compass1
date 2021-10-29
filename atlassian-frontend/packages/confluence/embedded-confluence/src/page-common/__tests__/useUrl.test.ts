import { renderHook } from '@testing-library/react-hooks';

import { useUrl } from '../useUrl';

import type { UrlProps } from '../useUrl';

import { EMBEDDED_CONFLUENCE_MODE } from '../EmbeddedConfluenceMode';

const mockBaseProps = {
  hostname: 'hello.atlassian.net',
  contentId: '123',
  spaceKey: 'ABC',
  parentProduct: 'TestProduct',
  protocol: 'https:',
};

const mockStandaloneConfluenceViewPageUrl =
  'https://hello.atlassian.net/wiki/spaces/ABC/pages/123';

const mockStandaloneConfluenceEPEditPageUrl =
  'https://hello.atlassian.net/wiki/spaces/ABC/pages/edit-embed/123';

const testAndValidateUrl = (
  mockedProps: UrlProps,
  expectedStandaloneConfluenceUrl: string | null,
  expectedEmbeddedConfluenceUrl: string | null,
) => {
  const { result } = renderHook(() => useUrl(mockedProps));

  expect(result.current?.standaloneConfluenceUrl).toBe(
    expectedStandaloneConfluenceUrl,
  );

  expect(result.current?.embeddedConfluenceUrl).toBe(
    expectedEmbeddedConfluenceUrl,
  );
};

it('should return view page url with NO_SSR=1 in view mode', () => {
  const mockedProps = {
    mode: EMBEDDED_CONFLUENCE_MODE.VIEW_MODE,
    ...mockBaseProps,
  };
  const epViewPageURLWithNOSSR =
    'https://hello.atlassian.net/wiki/spaces/ABC/pages/123?parentProduct=TestProduct&NO_SSR=1';
  testAndValidateUrl(
    mockedProps,
    mockStandaloneConfluenceViewPageUrl,
    epViewPageURLWithNOSSR,
  );
});

it('should return edit-embed url when in edit mode', () => {
  const mockedProps = {
    mode: EMBEDDED_CONFLUENCE_MODE.EDIT_MODE,
    ...mockBaseProps,
  };
  const epEditPageURLWithParentProduct =
    'https://hello.atlassian.net/wiki/spaces/ABC/pages/edit-embed/123?parentProduct=TestProduct';
  testAndValidateUrl(
    mockedProps,
    mockStandaloneConfluenceEPEditPageUrl,
    epEditPageURLWithParentProduct,
  );
});

it('should not return url when contentId is not provided', () => {
  const mockedProps = {
    mode: EMBEDDED_CONFLUENCE_MODE.VIEW_MODE,
    hostname: 'hello.atlassian.net',
    contentId: '',
    spaceKey: 'ABC',
    protocol: 'https:',
    parentProduct: 'TestProduct',
  };
  testAndValidateUrl(mockedProps, null, null);
});

it('should not return url when spaceKey is not provided', () => {
  const mockedProps = {
    mode: EMBEDDED_CONFLUENCE_MODE.VIEW_MODE,
    hostname: 'hello.atlassian.net',
    contentId: '123',
    protocol: 'https:',
    parentProduct: 'TestProduct',
  };
  testAndValidateUrl(mockedProps, null, null);
});

it('should return view page url with all query params if passed in', () => {
  const mockedProps = {
    mode: EMBEDDED_CONFLUENCE_MODE.VIEW_MODE,
    ...mockBaseProps,
    parentProductContentContainerId: '456',
    parentProductContentId: '789',
  };
  const epViewPageURLWithParentProductNoSSR =
    'https://hello.atlassian.net/wiki/spaces/ABC/pages/123?parentProduct=TestProduct&parentProductContentContainerId=456&parentProductContentId=789&NO_SSR=1';
  testAndValidateUrl(
    mockedProps,
    mockStandaloneConfluenceViewPageUrl,
    epViewPageURLWithParentProductNoSSR,
  );
});
