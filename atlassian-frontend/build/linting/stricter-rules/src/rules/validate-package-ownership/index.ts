/**
 * Validates the ownership of packages
 *
 *  1. Checks that the `atlassian.team` field is defined in `package.json`
 *  2. Cross-references the defined team with the root `teams.json` to ensure its a valid team
 */
import path from 'path';

import { AFPackageJson } from '@atlaskit/build-utils/types';

import { RuleDefinition } from '../../types';
import { packageOwnershipExclusions } from '../../common/exclusion-lists';

const NO_TEAM = 'no-team';
const UNKNOWN_TEAM = 'unknown-team';
const errorTypes = {
  NO_TEAM,
  UNKNOWN_TEAM,
} as const;

type ErrorTypes = typeof errorTypes;

type ErrorType = typeof errorTypes[keyof ErrorTypes];

type Error = {
  errorType: ErrorType;
  packageName: string;
  packagePath: string;
  team?: string;
};

const defaultErrorTransformer = (errors: Error[]) =>
  errors.map(({ errorType, team, packageName, packagePath }) => {
    switch (errorType) {
      case UNKNOWN_TEAM:
        return `Team '${team}' of package ${packageName} (${packagePath}) does not exist in teams.json. Please add your team to teams.json.`;
      case NO_TEAM:
        return `Package ${packageName} (${packagePath}) does not have a team. Please add your team to teams.json and link to it via your package.json's 'team' property.`;
      default:
        throw new Error(`Unknown error type ${errorType}.`);
    }
  });

const getTeam = (pkgJson: AFPackageJson) => pkgJson.atlassian?.team;

const ruleDefinition: RuleDefinition<ErrorTypes> = {
  onProject: ({
    rootPath,
    config,
    errorTransformer = defaultErrorTransformer,
  }) => {
    const errors: Error[] = [];

    const { teams, workspaces } = config;

    workspaces.forEach(pkg => {
      const packagePath = path.relative(rootPath, pkg.dir);
      const team = getTeam(pkg.config);

      const addError = (errorType: ErrorType) => {
        errors.push({
          errorType,
          team,
          packageName: pkg.name,
          packagePath,
        });
      };

      if (team) {
        if (!teams[team]) {
          addError(UNKNOWN_TEAM);
        }
      } else if (!packageOwnershipExclusions.has(packagePath)) {
        addError(NO_TEAM);
      }
    });

    return errorTransformer(errors);
  },
  errorTypes,
};

export default ruleDefinition;
