import { Severity } from '@sentry/react';

import { TelemetryScopeContext } from '@atlassian/commerce-events-telemetry-react/sentry-browser-bridge';

import {
  GUARANTEED,
  MAYBE,
  NONE,
  ProbabilityOfBug,
} from '../probability-of-bug';
import { CommerceService, UNKNOWN } from '../service';
import { responsibleServiceIncludesCommerceLibraries } from '../service/utils';

export type TelemetryTags = {
  responsibleService: CommerceService;
  probabilityOfBug: ProbabilityOfBug;
};

export type SetTelemetryExceptionSentryTagsInput = {
  responsibleService?: CommerceService;
  probabilityOfBug: ProbabilityOfBug;
};

/**
 * Keep in mind what we're really using Sentry's "severity" not as a metric for severity but
 * for colour coding (more red = More you should go take a look at the log)
 */
export const calculateSeverityFromTags = ({
  probabilityOfBug,
  responsibleService,
}: TelemetryTags): Severity => {
  switch (probabilityOfBug) {
    case GUARANTEED:
      if (responsibleServiceIncludesCommerceLibraries(responsibleService)) {
        return Severity.Critical;
      }

      return Severity.Error;

    case MAYBE:
      return Severity.Warning;
    case NONE:
      return Severity.Log;
    default:
      // Should never happen so sending critical :3
      return Severity.Critical;
  }
};

const severityOrdering = new Map([
  [Severity.Fatal, 0],
  [Severity.Critical, 1],
  [Severity.Error, 2],
  [Severity.Warning, 3],
  [Severity.Info, 4],
  [Severity.Log, 5],
  [undefined, 6],
]);

export const pickWorstSeverity = <
  S1 extends Severity | undefined,
  S2 extends Severity | undefined
>(
  severity1: S1,
  severity2: S2,
): undefined extends S1 ? S2 : undefined extends S2 ? S1 : S1 | S2 => {
  if (severityOrdering.get(severity1)! <= severityOrdering.get(severity2)!) {
    return severity1 as any;
  }

  return severity2 as any;
};

export const withTelemetryInfoScopeContext = <
  T extends Partial<Omit<TelemetryScopeContext, 'tags'>> & {
    tags: SetTelemetryExceptionSentryTagsInput;
  }
>(
  scopeContext: T,
): T & Pick<TelemetryScopeContext, 'tags' | 'level'> => {
  const tags = {
    ...scopeContext.tags,
    responsibleService: scopeContext.tags.responsibleService ?? UNKNOWN,
  };

  return {
    ...scopeContext,
    tags,
    level: calculateSeverityFromTags(tags),
  };
};
