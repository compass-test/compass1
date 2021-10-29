import React from 'react';
import { mount } from 'enzyme';

import { UrlDataProvider, useUrlData } from '../../common/ui/url-data';
import { Product, UrlData } from '../../common/types';

const TestRecipient = (props: UrlData) => null;

const TestConsumer = () => {
  const urlData = useUrlData();
  return <TestRecipient {...urlData} />;
};

describe('url data', () => {
  // Equivalence classes are empty vs non-empty string,
  // and numeric/non-numeric for project id.
  // All onTaskComplete values are equivalent.
  describe.each([
    ['10101', '', 'bestops.com', '', Product.Opsgenie],
    ['asdasd', 'bestjsd.com', 'bestops.com', 'new', Product.ServiceDesk],
    ['', '', '', 'new', Product.Opsgenie],
    ['10101', 'bestjsd.com', '', 'new', Product.ServiceDesk],
    ['asdasd', '', '', '', Product.Opsgenie],
    ['', 'bestjsd.com', 'bestops.com', '', Product.ServiceDesk],
  ])(
    'with projectId="%s", JSDbase="%s", OGbase="%s"',
    (projectId, serviceDeskBaseUrl, opsgenieBaseUrl, newValue, product) => {
      const onTaskComplete = jest.fn();

      let target = mount(<div />);
      let recipient = mount(<div />);
      beforeEach(() => {
        target = mount(
          <UrlDataProvider
            projectId={projectId}
            serviceDeskBaseUrl={serviceDeskBaseUrl}
            opsgenieBaseUrl={opsgenieBaseUrl}
            onTaskComplete={onTaskComplete}
            product={product}
          >
            <TestConsumer />
          </UrlDataProvider>,
        );
        recipient = target.find(TestRecipient);
      });
      afterEach(() => {
        jest.resetAllMocks();
      });

      it('should wire up the jsd project id correctly', () => {
        expect(recipient.prop('projectId')).toBe(projectId);
      });

      it('should wire up the jsd base url correctly', () => {
        expect(recipient.prop('serviceDeskBaseUrl')).toBe(serviceDeskBaseUrl);
      });

      it('should wire up the opsgenie base url correctly', () => {
        expect(recipient.prop('opsgenieBaseUrl')).toBe(opsgenieBaseUrl);
      });

      it('should wire up the onTaskComplete action correctly', () => {
        expect(recipient.prop('onTaskComplete')).toBe(onTaskComplete);
      });

      it('should wire up the product correctly', () => {
        expect(recipient.prop('product')).toBe(product);
      });

      describe('- the memoisation', () => {
        if (projectId !== newValue) {
          it(`should respond to changing the jsd project id to "${newValue}"`, () => {
            target.setProps({ projectId: newValue });
            recipient = target.find(TestRecipient);

            expect(recipient.prop('projectId')).toBe(newValue);
          });
        }

        if (serviceDeskBaseUrl !== newValue) {
          it(`should respond to changing the jsd base url to "${newValue}"`, () => {
            target.setProps({ serviceDeskBaseUrl: newValue });
            recipient = target.find(TestRecipient);

            expect(recipient.prop('serviceDeskBaseUrl')).toBe(newValue);
          });
        }

        if (opsgenieBaseUrl !== newValue) {
          it(`should respond to changing the opsgenie base url to "${newValue}"`, () => {
            target.setProps({ opsgenieBaseUrl: newValue });
            recipient = target.find(TestRecipient);

            expect(recipient.prop('opsgenieBaseUrl')).toBe(newValue);
          });
        }

        it(`should respond to changing onTaskComplete callback`, () => {
          const newCallback = jest.fn();
          target.setProps({ onTaskComplete: newCallback });
          recipient = target.find(TestRecipient);

          expect(recipient.prop('onTaskComplete')).toBe(newCallback);
        });
      });
    },
  );
});
