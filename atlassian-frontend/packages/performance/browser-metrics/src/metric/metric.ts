import { Route } from '../route';
import { submitter } from '../submitter/submitter';

import {
  BaseMetric,
  BaseMetricStartArguments,
  BaseMetricStopArguments,
} from './base-metric';

export class Metric extends BaseMetric {
  start({ startTime }: BaseMetricStartArguments = {}) {
    super.start({ startTime });
    this.route = Route.getRoute();
  }
  stop(params: BaseMetricStopArguments = {}): boolean {
    const stoppedSuccessfully = super.stop(params);
    if (stoppedSuccessfully && !this.config.virtual) {
      submitter.queue(this.getData());
    }
    return stoppedSuccessfully;
  }
}
