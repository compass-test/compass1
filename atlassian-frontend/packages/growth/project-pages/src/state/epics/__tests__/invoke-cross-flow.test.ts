import testEpic from '../../../common/util/test-epic';
import * as analyticsClient from '../../../common/analytics/analytics-web-client';
import createMockStore from '../../../common/util/create-mock-store';
import { invokeCrossFlow, showXflowDialogError } from '../../actions';

import invokeCrossFlowEpic from '../invoke-cross-flow';

import {
  CrossFlowContextType,
  Reasons,
  ReasonType,
} from '@atlassiansox/cross-flow-api-internals';

jest.mock('../../../common/analytics/analytics-web-client');

const mockCrossFlowDisabled = (
  reason: ReasonType = Reasons.NO_PROVIDER,
): CrossFlowContextType => {
  return {
    isEnabled: false,
    reason,
  };
};

const mockCrossFlowEnabled = (
  openMock: () => Promise<{ success: boolean }>,
): CrossFlowContextType => {
  return {
    isEnabled: true,
    api: {
      open: openMock,
    },
  };
};

const mockCrossFlowOpenMethod = (success: boolean) =>
  jest.fn(() => Promise.resolve({ success }));

const mockStoreFactory = (crossFlow: CrossFlowContextType) =>
  createMockStore({
    external: {
      crossFlow: crossFlow,
    },
  });

describe('show xflow dialog epic', () => {
  const crossFlowOpen$Stub = mockCrossFlowOpenMethod(true);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should emit no actions on successful cross flow invocation', () =>
    testEpic({
      arrange: (input$: any) => {
        crossFlowOpen$Stub.mockResolvedValue(
          Promise.resolve({ success: true }),
        );
        return invokeCrossFlowEpic(
          input$,
          mockStoreFactory(mockCrossFlowEnabled(crossFlowOpen$Stub))(),
        );
      },
      act: (input$: any) => {
        input$.next(invokeCrossFlow());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(crossFlowOpen$Stub).toHaveBeenCalledTimes(1);
        expect(actions).toEqual([]);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledTimes(0);
      },
    }));

  test('should emit "invokeCrossFlowEpic failed" on cross flow API is not available.', () =>
    testEpic({
      arrange: (input$: any) => {
        return invokeCrossFlowEpic(
          input$,
          mockStoreFactory(mockCrossFlowDisabled())(),
        );
      },
      act: (input$: any) => {
        input$.next(invokeCrossFlow());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([showXflowDialogError()]);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledTimes(1);
        expect(
          analyticsClient.sendOperationalAnalyticsEvent,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'failed',
            actionSubject: 'invokeCrossFlowEpic',
            source: 'projectPages',
            attributes: { reason: Reasons.NO_PROVIDER },
          }),
        );
      },
    }));
});
