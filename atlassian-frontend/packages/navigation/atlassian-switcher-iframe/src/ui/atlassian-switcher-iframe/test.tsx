import React from 'react';

import { render } from '@testing-library/react';

import AtlassianSwitcherIframe from './index';

describe('AtlassianSwitcherIframe', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'atlassian-switcher-iframe';
      const { getByTestId } = render(
        <AtlassianSwitcherIframe
          testId={testId}
          bridgeProps={{ product: 'jira' }}
        />,
      );

      expect(getByTestId(testId)).toBeTruthy();
    });
  });
  describe('click handlers', () => {
    const renderSwitcherWithHandlers = () => {
      const discoverClickFn = jest.fn();
      const slackDiscoveryClickFn = jest.fn();
      const triggerXflowFn = jest.fn();
      const onCloseFn = jest.fn();
      render(
        <AtlassianSwitcherIframe
          onDiscoverMoreClicked={discoverClickFn}
          onSlackDiscoveryClickHandler={slackDiscoveryClickFn}
          onTriggerXFlow={triggerXflowFn}
          onClose={onCloseFn}
          bridgeProps={{ product: 'jira' }}
        />,
      );
      return {
        discoverClickFn,
        slackDiscoveryClickFn,
        triggerXflowFn,
        onCloseFn,
      };
    };
    it('should handle discover click event', done => {
      const {
        discoverClickFn,
        slackDiscoveryClickFn,
        triggerXflowFn,
        onCloseFn,
      } = renderSwitcherWithHandlers();
      window.postMessage(
        {
          type: 'atlassianSwitcher__discoverMoreClicked',
          payload: { event: 'test', key: 'testkey' },
        },
        '*',
      );
      window.addEventListener('message', () => {
        expect(discoverClickFn).toHaveBeenCalledTimes(1);
        expect(discoverClickFn).toHaveBeenCalledWith('test', 'testkey');
        expect(slackDiscoveryClickFn).toHaveBeenCalledTimes(0);
        expect(triggerXflowFn).toHaveBeenCalledTimes(0);
        expect(onCloseFn).toHaveBeenCalledTimes(0);
        done();
      });
    });

    it('should handle slack discovery click event', done => {
      const {
        discoverClickFn,
        slackDiscoveryClickFn,
        triggerXflowFn,
        onCloseFn,
      } = renderSwitcherWithHandlers();
      window.postMessage(
        {
          type: 'atlassianSwitcher__slackDiscoveryClicked',
          payload: { event: 'test', key: 'testkey' },
        },
        '*',
      );
      window.addEventListener('message', () => {
        expect(slackDiscoveryClickFn).toHaveBeenCalledTimes(1);
        expect(slackDiscoveryClickFn).toHaveBeenCalledWith('test', 'testkey');
        expect(discoverClickFn).toHaveBeenCalledTimes(0);
        expect(triggerXflowFn).toHaveBeenCalledTimes(0);
        expect(onCloseFn).toHaveBeenCalledTimes(0);
        done();
      });
    });

    it('should handle trigger xflow event', done => {
      const {
        discoverClickFn,
        slackDiscoveryClickFn,
        triggerXflowFn,
        onCloseFn,
      } = renderSwitcherWithHandlers();
      window.postMessage(
        {
          type: 'atlassianSwitcher__xflowTriggered',
          payload: { productKey: 'testProductKey' },
        },
        '*',
      );
      window.addEventListener('message', () => {
        expect(triggerXflowFn).toHaveBeenCalledTimes(1);
        expect(triggerXflowFn).toHaveBeenCalledWith('testProductKey');
        expect(discoverClickFn).toHaveBeenCalledTimes(0);
        expect(slackDiscoveryClickFn).toHaveBeenCalledTimes(0);
        expect(onCloseFn).toHaveBeenCalledTimes(0);
        done();
      });
    });

    it('should handle onClose event', done => {
      const {
        discoverClickFn,
        slackDiscoveryClickFn,
        triggerXflowFn,
        onCloseFn,
      } = renderSwitcherWithHandlers();
      window.postMessage({ type: 'atlassianSwitcher__onClose' }, '*');
      window.addEventListener('message', () => {
        expect(onCloseFn).toHaveBeenCalledTimes(1);
        expect(triggerXflowFn).toHaveBeenCalledTimes(0);
        expect(discoverClickFn).toHaveBeenCalledTimes(0);
        expect(slackDiscoveryClickFn).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});
