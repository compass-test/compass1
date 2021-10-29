import { getImageSnapshotFilePath } from '../../test-results/snapshots';
import type { Test } from '../../types';

// Get path to VR image diff png
export async function attachImageSnapshotToTicket(test: Test) {
  const filePath = getImageSnapshotFilePath(test);
  return filePath;
}
