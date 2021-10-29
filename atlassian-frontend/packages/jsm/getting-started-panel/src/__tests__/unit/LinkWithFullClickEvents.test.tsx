import React from 'react';
import { injectable } from 'react-magnetic-di';
import { LinkWithFullClickEvents } from '../../ui/link-utility/link-with-full-click-events';
import { useUrlData } from '../../common/ui/url-data';
import { useInProductHelpDocumentationLinksEnabled } from '../../feature-flags';
import { mountWithDi } from '../_testUtils';

describe('LinkWithFullClickEvents', () => {
  const linkUrl = 'http://le-jsm.atlassian.com/le-page';
  const mockOnLinkClick = jest.fn();

  const mockUseInProductHelpDocumentationLinksEnabled = jest
    .fn()
    .mockReturnValue(true);
  const mockOnOpenInProductHelpArticle = jest.fn();
  const mockUseUrlData = (): any => ({
    onOpenInProductHelpArticle: mockOnOpenInProductHelpArticle,
  });

  const mountWrapper = (withIPHArticle: boolean = false) =>
    mountWithDi(
      <LinkWithFullClickEvents
        href={linkUrl}
        onLinkClick={mockOnLinkClick}
        inProductHelpArticleId={withIPHArticle ? 's0m3-4rt1cl3' : undefined}
      >
        Click me
      </LinkWithFullClickEvents>,
      [
        injectable(
          useInProductHelpDocumentationLinksEnabled,
          mockUseInProductHelpDocumentationLinksEnabled,
        ),
        injectable(useUrlData, mockUseUrlData),
      ],
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render link with correct url', () => {
    const anchor = mountWrapper().find('a');
    expect(anchor.props().href).toBe(linkUrl);
  });

  it('should render children', () => {
    expect(mountWrapper().text()).toBe('Click me');
  });

  describe.each([[true], [false]])('iphFlag = %s', (isIPHFlagOn) => {
    beforeEach(() => {
      mockUseInProductHelpDocumentationLinksEnabled.mockReturnValue(
        isIPHFlagOn,
      );
    });

    describe.each([[true], [false]])('hasArticleId = %s', (hasArticleId) => {
      describe.each([['click'], ['auxclick']])(
        'browserEvent = %s',
        (browserEvent) => {
          describe.each([
            [{}],
            [{ metaKey: true }],
            [{ shiftKey: true }],
            [{ ctrlKey: true }],
          ])('modifierKeys = %s', (modifierKeys) => {
            describe('clicks', () => {
              beforeEach(() => {
                mountWrapper(hasArticleId).simulate(browserEvent, {
                  shiftKey: false,
                  metaKey: false,
                  ctrlKey: false,
                  ...modifierKeys,
                });
              });

              const isAuxClick = browserEvent === 'auxclick';
              it('onLinkClick', () => {
                expect(mockOnLinkClick).toHaveBeenCalledTimes(1);
                expect(mockOnLinkClick).toHaveBeenCalledWith(
                  expect.any(Object),
                  isAuxClick,
                );
              });

              const shouldOpenIph =
                isIPHFlagOn &&
                hasArticleId &&
                !isAuxClick &&
                Object.keys(modifierKeys).length === 0;
              it(`call onOpenInProductHelpArticle = ${shouldOpenIph}`, () => {
                expect(mockOnOpenInProductHelpArticle).toHaveBeenCalledTimes(
                  shouldOpenIph ? 1 : 0,
                );
              });
            });
          });
        },
      );
    });
  });
});
