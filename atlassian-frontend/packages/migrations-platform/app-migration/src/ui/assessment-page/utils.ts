import type { MigrationStatus } from '../../common/types';

/**
 * From App[], return the decision making percentage number
 * to be displayed to user
 */
type ReduceAppsToAssessmentProgress = (
  apps: { migrationStatus: MigrationStatus }[],
) => { total: number; done: number };

export const reduceAppsToAssessmentProgress: ReduceAppsToAssessmentProgress = (
  apps,
) => {
  if (apps.length === 0) {
    return {
      total: 0,
      done: 0,
    };
  }
  const unassignedStatus = apps.filter(
    ({ migrationStatus }) => migrationStatus === 'Unassigned',
  );
  const total = apps.length;
  const undone = unassignedStatus.length;
  const done = total - undone;
  return {
    total,
    done,
  };
};
