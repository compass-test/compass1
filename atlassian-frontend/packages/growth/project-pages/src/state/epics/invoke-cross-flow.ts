import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { empty } from 'rxjs/observable/empty';

import { Targets, Journeys } from '@atlassiansox/cross-flow-component-support';
import { INVOKE_CROSS_FLOW, showXflowDialogError } from '../actions';
import { getCrossFlowApi } from '../external/selectors';
import { sendOperationalAnalyticsEvent } from '../../common/analytics/analytics-web-client';
import { Action } from 'redux';
import {
  PROJECT_PAGES_SOURCE_COMPONENT,
  PROJECT_PAGES_SOURCE_CONTEXT,
} from '../../common/constants';

const IS_CROSS_SELL = true;

export default (action$: ActionsObservable<any>, store: any) =>
  action$.ofType(INVOKE_CROSS_FLOW).mergeMap((action) => {
    const state = store.getState();
    const crossFlow = getCrossFlowApi(state);

    if (crossFlow.isEnabled) {
      return fromPromise(
        crossFlow.api.open({
          journey: action.contextInfo ? Journeys.GET_STARTED : Journeys.DECIDE,
          targetProduct: Targets.CONFLUENCE,
          sourceComponent: PROJECT_PAGES_SOURCE_COMPONENT,
          sourceContext: PROJECT_PAGES_SOURCE_CONTEXT,
          experimentalOptions: {
            isCrossSell: IS_CROSS_SELL,
            contextInfo: action.contextInfo,
          },
        }),
      )
        .mergeMap(() => empty<Action>())
        .catch((_) => {
          return of(showXflowDialogError());
        });
    }

    sendOperationalAnalyticsEvent({
      source: 'projectPages',
      action: 'failed',
      actionSubject: 'invokeCrossFlowEpic',
      attributes: { reason: crossFlow.reason },
    });

    return of(showXflowDialogError());
  });
