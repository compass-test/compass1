import { useCallback, useEffect, useRef, useState } from 'react';

import { useForm, useFormTask } from '../../../controllers/form';
import { usePlan } from '../../../controllers/plan';
import { useProjectsAndReleases } from '../../../controllers/projects-and-releases';

type Props = {
  autoExcludeReleased?: boolean;
};
/**
 * Provides projects n releases related side-effects.
 */
export default function ProjectsAndReleasesObserver({
  autoExcludeReleased = true,
}: Props) {
  useRefreshingOnIssueSourcesChange();
  useRefreshingOnFormSubmit();
  usePlanRefinement1({ autoExcludeReleased });
  usePlanRefinement2();
  return null;
}

/**
 * The refresh function that is changed whenever the issueSources changes.
 */
function useRefreshFn() {
  const { plan } = usePlan();
  const { fetchData } = useProjectsAndReleases();
  return useCallback(() => {
    const issueSources = plan.issueSources
      // The api bugs out if the id is same
      .map((issueSource, index) => ({ ...issueSource, id: index }));

    fetchData(issueSources);
  }, [fetchData, plan.issueSources]);
}

/**
 * Refreshes the projects and releases on issue sources change.
 */
function useRefreshingOnIssueSourcesChange() {
  const [hash, setHash] = useState('');
  const { plan } = usePlan();
  const refresh = useRefreshFn();

  // When issue source changes
  useEffect(() => {
    // Board:1|Filter:100|Project:200
    const currentHash = plan.issueSources
      .map((source) => `${source.type}:${source.value}`)
      .join('|');

    // Only fetch data when the issue sources are actually changed
    if (currentHash === hash) {
      return;
    }

    setHash(currentHash);
    refresh();
  }, [refresh, hash, plan.issueSources]);
}

/**
 * Refreshes the projects and releases on submit.
 */
export function useRefreshingOnFormSubmit() {
  const { submitting } = useForm();
  const refresh = useRefreshFn();

  useEffect(() => {
    if (submitting) {
      refresh();
    }
  }, [submitting, refresh]);
}

/**
 * Removes the excluded releases that are no longer relevant.
 */
function usePlanRefinement1({ autoExcludeReleased }: Props) {
  const { releases } = useProjectsAndReleases();
  const { finish: finishTask } = useFormTask('refineReleases');
  const prevReleasesRef = useRef(releases || []);
  const { setPlan } = usePlan();

  // Filter out all releases that are no longer relevant.
  useEffect(() => {
    if (!releases) {
      return;
    }

    setPlan((plan) => {
      const { excludedVersions } = plan;
      const nextExcludedVersions = plan.excludedVersions.filter((id) =>
        releases.some((release) => release.id === id),
      );

      if (nextExcludedVersions.length === excludedVersions.length) {
        return plan;
      }

      return {
        ...plan,
        excludedVersions: nextExcludedVersions,
      };
    });
    finishTask();
  }, [releases, setPlan, finishTask]);

  // Add new released releases
  useEffect(() => {
    // Skip this when its in config page
    if (!releases || !autoExcludeReleased) {
      return;
    }

    const newReleasedReleases = releases
      .filter(
        (release) =>
          release.released &&
          !prevReleasesRef.current.find(({ id }) => id === release.id),
      )
      .map((release) => release.id);

    prevReleasesRef.current = releases;

    if (newReleasedReleases.length === 0) {
      return;
    }

    setPlan((plan) => ({
      ...plan,
      excludedVersions: plan.excludedVersions.concat(newReleasedReleases),
    }));
  }, [autoExcludeReleased, releases, setPlan]);
}

/**
 * Finish the form task in the case the releases cannot be loaded
 */

function usePlanRefinement2() {
  const { loading, error } = useProjectsAndReleases();
  const { finish: finishTask } = useFormTask('refineReleases');

  useEffect(() => {
    if (!loading && error) {
      finishTask();
    }
  }, [loading, error, finishTask]);
}
