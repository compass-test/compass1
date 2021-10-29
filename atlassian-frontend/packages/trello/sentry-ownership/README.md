# @atlassian/sentry-ownership

This package contains the core functionality for syncing teams, members, and
ownership rules to Sentry. It is designed in a way that is 'product agnostic',
and it is expected that different products will consume this module with a thin
layer of product-specific tooling (based on their preferred method for assigning
ownership of files to teams).

---

## API

### auditOwnership

This function takes a teams definition, an ownership definition and a list of file-paths and conducts the following:

1. Validates that the teams definition is in the correct structure (using JSONSchema)
2. Validates that the ownership definition is in the correct structure (using JSONSchema)
3. Validates that the keys in the ownership definition each match a corresponding key in the teams definition
4. Produces a report that lists: Owned files, ownerless files, ownership conflicts, invalid patterns and unused patterns

Example usage:

```typescript
import { auditOwnership } from '@atlassian/sentry-ownership';

// This may be constructed by traversing separate package.jsons for packages for example
const ownershipDefinition = {
  'trello-fe-platform': [
    './my-file.ts',
    './app/src/components/*',
    './app/src/components/some-deleted-file.ts'
    './app/src/some-other-deleted-file.ts',
  ],
  'trello-remarkable': [
    './app/src/my-other-file.ts',
    '/app/src/components/remarkable-stuff/*',
  ],
}

// This will likely be read directly from a teams.json or teams.js in your repo
const teamsDefinition = {
  'trello-fe-platform': {
    contributors: ['cfletcher', 'jmooring'],
    'directly-responsible-individual': 'jmooring',
    project: 'https://trello.atlassian.net/browse/FEPLAT',
    slack: 'fe-platform-trello',
  },
  'trello-remarkable': {
    contributors: ['alarner', 'alofkrantz'],
    'directly-responsible-individual': 'alofkrantz',
    project: 'https://trello.atlassian.net/browse/RMK',
    slack: 'remarkable-trello',
  },
}

// Get the full list of filepaths (relative to the root) that ownership is audited for
const filePaths = getAllFilepathsInRepo();

// Run the audit
const result = auditOwnership({
  ownershipDefinition,
  teamsDefinition,
  filePaths,
});

/*
Result will look like:
{
  ownedFiles: {
    './my-file.ts': 'trello-fe-platform',
    './app/src/my-other-file.ts': 'trello-remarkable',
  }
  ownerlessFiles: ['./app/src/my-third-file.ts']
  ownershipConflicts: {
    './app/src/components/remarkable-stuff/my-fourth-file.tsx': [
      { teamName: 'trello-fe-platform', pattern: './app/src/components/*' },
      { teamName: 'trello-remarkable', pattern: './app/src/components/remarkable-stuff/*' },
    ],
    './app/src/components/remarkable-stuff/my-fifth-file.tsx': [
      { teamName: 'trello-fe-platform', pattern: './app/src/components/*' },
      { teamName: 'trello-remarkable', pattern: './app/src/components/remarkable-stuff/*' },
    ],
  },
  unusedPatterns: [
    { teamName: 'trello-fe-platform', pattern: './app/src/components/some-deleted-file.ts' }
    { teamName: 'trello-fe-platform', pattern: './app/src/some-other-deleted-file.ts' }
  ],
  invalidPatterns: [
    { teamName: 'trello-fe-platform', pattern: 'app/*' }
    { teamName: 'trello-fe-platform', pattern: './app*' }
  ],
}
*/
```

---

### syncToSentry

This function takes an ownership definition, a teams definition, and some additional configuration options and will:

1. Sync teams for the specified sentry project based on the teams definition
2. Sync the team memberships for the specified sentry project based on the 'contributors' of the teams definition
3. Sync the ownership rules to the specified sentry project based on the ownership definition

Example Usage:

```typescript
import { syncToSentry } from '@atlassian/sentry-ownership';

// Get the team definitions
const teamsDefinition = require('../teams.json'); // see auditOwnership for an example
const ownershipDefinition = require('../ownership.json'); // see auditOwnership for an example

// Run the sync
console.log('Starting sync to sentry');
syncToSentry({
  sentryOrg: 'atlassian',
  sentryUrl: 'https://sentry.prod.atl-paas.net',
  sentryAuthToken: 'INJECT_AUTH_TOKEN_HERE',
  projectName: 'trello-web',
  teamsDefinition,
  ownershipDefinition,

  // These team names will not be removed even if they aren't present in the teams definition
  // which can be handy for having a generic 'access control' team for external contributors
  ignoredTeamNames: ['trello'],

  // Setting this to 'true' will only perform 'read' operations in Sentry, so you can inspect
  // the logs to determine things are happening as expected
  dryRun: false,
})
  .then(() => console.log('Sentry syncing complete'))
  .catch(e => {
    console.error('Sentry syncing failed', e);
    process.exit(1);
  });
```

### assignIssuesToSuggestedOwners

This function takes project name, and additional sentry configuration and will:

- Fetch issues in batches of 100 (based on `filterByUnassigned` and `filterByTimesSeen`)
- For each issue, assign that issue to the team based on the suggested 'owners' for that issue

Example Usage:

```typescript
import { assignIssuesToSuggestedOwners } from '@atlassian/sentry-ownership';

// Run the sync
console.log('Starting sentry issue assignment');
assignIssuesToSuggestedOwners({
  sentryOrg: 'atlassian',
  sentryUrl: 'https://sentry.prod.atl-paas.net',
  sentryAuthToken: 'INJECT_AUTH_TOKEN_HERE',
  projectName: 'trello-web',

  // Issues will only be fetched if they have no current assignee.
  // Setting this to false would mean much longer execution time, but would also
  // 'correct' ownership for issues if ownership areas change.
  filterByUnassigned: true,

  // Issues will only be fetched if they have greater than this number
  // of occurrences (events) in Sentry. This number should be tweaked to ensure
  // a manageable execution time.
  filterByTimesSeen: 5,
})
  .then(() => console.log('Sentry issue assignment complete'))
  .catch(e => {
    console.error('Sentry issue assignment failed', e);
    process.exit(1);
  });
```
