import { useContext, useEffect } from 'react';

import { ExperienceTrackerContext } from './ExperienceTrackerContext';

export type ExperienceStopProps = {
  name: string;
  error?: Error;
  attributes?: object;
};

/**
 * `ExperienceStop` implements a React `Component` which succeeds, fails, or
 * aborts an experience with a specific `name`.
 *
 * If an `error` is not specified, `ExperienceStop` succeeds the experience with
 * the specified `name`. The behavior in this case is practically equivalent to
 * the use of `ExperienceSuccess`.
 *
 * If an `error` is specified, `ExperienceStop` applies product-specific logic
 * and either fails or aborts the experience with the specified `name`. For
 * example, if the specified `error` describes a network error or a user error
 * (these are internal implementation details so do not rely that any particular
 * classification of errors is really implemented), `ExperienceStop` may abort
 * the experience with the specified `name` rather than fail it because the
 * errors in question are not product failures. If `ExperienceStop` fails an
 * experience, its behavior is practically equivalent to the use of
 * `ExperienceFailure` with a specific `name`.
 */
export function ExperienceStop({
  name,
  error,
  attributes,
}: ExperienceStopProps) {
  const experienceTracker = useContext(ExperienceTrackerContext);
  useEffect(() => {
    if (error) {
      experienceTracker.stopOnError({ name, error, attributes });
    } else {
      experienceTracker.succeed({ name, attributes });
    }
  }, [name, error, attributes, experienceTracker]);

  return null;
}
