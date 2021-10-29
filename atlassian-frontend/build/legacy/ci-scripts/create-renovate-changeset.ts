// This script is designed so that Renovate can automatically add changesets to the PRs it
// creates. It is designed to be run in the root of the repo.

/* @af/utils also has a getChangedPackagesSinceRef, try to use that instead
  This callsite uses the @changesets/git one because we do a focussed install on ci-scripts
*/
import { getChangedPackagesSinceRef } from '@changesets/git';
import { writeFileSync } from 'fs';

getChangedPackagesSinceRef({ cwd: process.cwd(), ref: 'origin/master' }).then(
  changedPackages => {
    let fileContents = '---\n';

    for (const pack of changedPackages) {
      fileContents += `'${pack.packageJson.name}': patch\n`;
    }

    fileContents += '---\n';
    fileContents += '\n';
    fileContents += 'Bumping dependencies via Renovate\n';

    const changesetId = Math.floor(Math.random() * 10000000);
    writeFileSync(
      `.changeset/renovate-changeset-${changesetId}.md`,
      fileContents,
    );
  },
);
