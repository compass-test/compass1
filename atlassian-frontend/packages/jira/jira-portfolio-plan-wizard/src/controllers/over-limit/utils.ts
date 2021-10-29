import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useIssueCount } from '../../controllers/issue-count';
import { usePlanMeta } from '../../controllers/plan-meta';
import { useProjectsAndReleases } from '../../controllers/projects-and-releases';

import { OverLimitFlagTypes } from './types';

type Flag = OverLimitFlagTypes;

interface ContextType {
  /**
   * The flags that needs to show.
   */
  flags: Flag[];
  /**
   * Dismisses the top flag.
   */
  shift: () => void;
  dismissAll: () => void;
}

export const context = createContext<ContextType>({
  flags: [],
  shift: () => {},
  dismissAll: () => {},
});

/**
 * useContextProviding provides the context value to the provider
 */
export const useContextProviding = (): ContextType => {
  const [flags, setFlags] = useState<Flag[]>([]);
  const {
    pending: projectLimitIsPending,
    over: projectLimitIsOver,
  } = useProjectLimit();
  const {
    pending: issueLimitIsPending,
    over: issueLimitIsOver,
  } = useIssueLimit();

  useEffect(() => {
    if (projectLimitIsPending) {
      return;
    }

    setFlags((flags) => {
      const filtered = flags.filter(
        (flag) => flag !== OverLimitFlagTypes.project,
      );

      return projectLimitIsOver
        ? [OverLimitFlagTypes.project, ...filtered]
        : filtered;
    });
  }, [projectLimitIsPending, projectLimitIsOver]);

  useEffect(() => {
    if (issueLimitIsPending) {
      return;
    }

    setFlags((flags) => {
      const filtered = flags.filter(
        (flag) => flag !== OverLimitFlagTypes.issue,
      );

      return issueLimitIsOver
        ? [...filtered, OverLimitFlagTypes.issue]
        : filtered;
    });
  }, [issueLimitIsPending, issueLimitIsOver]);

  const shift = () => setFlags((flags) => flags.slice(1));
  const dismissAll = useCallback(() => setFlags([]), []);
  return { flags, shift, dismissAll };
};

/**
 * Detects if the number of projects is over the limit.
 */
export const useProjectLimit = (): {
  pending: boolean;
  over: boolean;
} => {
  const { loading, error } = useProjectsAndReleases();
  return {
    pending: loading,
    over: error != null,
  };
};

/**
 * Detects if the number of issues is over the limit.
 */
export const useIssueLimit = (): {
  pending: boolean;
  over: boolean;
} => {
  const { issueLimit } = usePlanMeta();
  const { value: issueCount, loading: isIssueCountLoading } = useIssueCount();

  return {
    pending: isIssueCountLoading,
    over: issueLimit != null && issueCount != null && issueCount > issueLimit,
  };
};

/**
 * new-plan-wizard-issue-overlimit_8tze9
 * remove after enable feature
 * Provide the flags for warnings regarding project/issue limit is over.
 */
export const useOverLimitFlags = () => useContext(context);
