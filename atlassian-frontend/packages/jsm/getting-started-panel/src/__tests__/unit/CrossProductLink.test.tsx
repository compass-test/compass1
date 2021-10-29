import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import * as Analytics from '../../common/analytics';
import { Product } from '../../common/types';
import * as UrlData from '../../common/ui/url-data';
import { CrossProductLink } from '../../ui/link-utility/cross-product-link';

const useLinkClickedEvent = jest.spyOn(Analytics, 'useLinkClickedEvent');
const useUrlData = jest.spyOn(UrlData, 'useUrlData');

describe('CrossProductLink', () => {
  const linkUrl = 'http://le-jsm.atlassian.com/le-page';
  const mountCrossProductLink = (product: Product) =>
    mount(
      <CrossProductLink linkProduct={product} url={linkUrl} subjectId="clicky">
        Click me
      </CrossProductLink>,
    );

  const mockHandleClickAnalytics = jest.fn();
  const mockOnSpaRedirect = jest.fn();

  describe.each([[Product.ServiceDesk], [Product.Opsgenie]])(
    'mounted in %s',
    (mountedProduct) => {
      describe.each([[Product.ServiceDesk], [Product.Opsgenie]])(
        'link to %s',
        (linkProduct) => {
          const isLinkProductSameAsMount = linkProduct === mountedProduct;
          let wrapper: ReactWrapper;
          beforeEach(() => {
            jest.resetAllMocks();
            useUrlData.mockReturnValue({
              serviceDeskBaseUrl: 'sd.com',
              projectId: '1',
              projectKey: 'KEY',
              opsgenieBaseUrl: 'og.com',
              onTaskComplete: jest.fn(),
              onSpaRedirect: mockOnSpaRedirect,
              product: linkProduct,
            });
            useLinkClickedEvent.mockReturnValue(mockHandleClickAnalytics);
            wrapper = mountCrossProductLink(mountedProduct);
          });

          it('should render link with correct url', () => {
            const anchor = wrapper.find('a');
            expect(anchor.props().href).toBe(linkUrl);
          });

          it('should render link with correct target', () => {
            const anchor = wrapper.find('a');
            expect(anchor.props().target).toBe(
              isLinkProductSameAsMount ? '_self' : '_blank',
            );
          });

          it('should render children', () => {
            expect(wrapper.text()).toBe('Click me');
          });

          describe('clicks', () => {
            const mockPreventDefault = jest.fn();
            it.each([
              [
                'normal click',
                'click',
                {},
                {
                  shouldSpaRedirect: isLinkProductSameAsMount,
                },
              ],
              [
                'cmd + click',
                'click',
                {
                  metaKey: true,
                },
                {
                  shouldSpaRedirect: false,
                },
              ],
              [
                'shift + click',
                'click',
                {
                  shiftKey: true,
                },
                {
                  shouldSpaRedirect: false,
                },
              ],
              [
                'ctrl + click',
                'click',
                {
                  ctrlKey: true,
                },
                {
                  shouldSpaRedirect: false,
                },
              ],
              [
                'middle click',
                'auxclick',
                {},
                {
                  shouldSpaRedirect: false,
                },
              ],
              [
                'cmd + middle click',
                'auxclick',
                {
                  metaKey: true,
                },
                {
                  shouldSpaRedirect: false,
                },
              ],
              [
                'shift + middle click',
                'auxclick',
                {
                  shiftKey: true,
                },
                {
                  shouldSpaRedirect: false,
                },
              ],
              [
                'ctrl + middle click',
                'auxclick',
                {
                  ctrlKey: true,
                },
                {
                  shouldSpaRedirect: false,
                },
              ],
            ])(
              '%s',
              (
                _,
                browserEvent,
                modifierKeyOverrides,
                { shouldSpaRedirect },
              ) => {
                const modifierKeyDefaults = {
                  shiftKey: false,
                  metaKey: false,
                  ctrlKey: false,
                };
                wrapper.simulate(browserEvent, {
                  ...modifierKeyDefaults,
                  ...modifierKeyOverrides,
                  preventDefault: mockPreventDefault,
                });

                if (shouldSpaRedirect) {
                  expect(mockOnSpaRedirect).toHaveBeenCalledTimes(1);
                  expect(mockOnSpaRedirect).toHaveBeenCalledWith(linkUrl);
                  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
                } else {
                  expect(mockOnSpaRedirect).toHaveBeenCalledTimes(0);
                }
              },
            );
          });
        },
      );
    },
  );
});
