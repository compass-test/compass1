import { validateOwnership, OwnershipDefinition } from './validateOwnership';
import { validateTeams, TeamsDefinition } from './validateTeams';
import { validateMissingTeams } from './validateMissingTeams';

interface PatternAndTeam {
  pattern: string;
  teamName: string;
}

interface OwnedFiles {
  [filePath: string]: string;
}

interface OwnershipConflicts {
  [filePath: string]: PatternAndTeam[];
}

export interface ValidateOwnershipResult {
  ownedFiles: OwnedFiles;
  ownershipConflicts: OwnershipConflicts;
  ownerlessFiles: string[];
  invalidPatterns: PatternAndTeam[];
  unusedPatterns: PatternAndTeam[];
}

export const isValidPattern = (pattern: string): boolean => {
  // Must start with ./
  if (!pattern.startsWith('./')) {
    return false;
  }

  // Must contain at most, a single * character
  const wildcardCount = (pattern.match(/\*/g) || []).length;
  if (wildcardCount > 1) {
    return false;
  }

  // If there is a wildcard, it must be at the end, indicating a directory
  if (wildcardCount === 1 && !pattern.endsWith('/*')) {
    return false;
  }

  // Must not end with / (should use a wildcard for directories)
  if (pattern.endsWith('/')) {
    return false;
  }

  return true;
};

/**
 * Returns a boolean indicating whether a filePath matched the supplied pattern
 */
export const doesFilePathMatchPattern = (
  filePath: string,
  pattern: string,
): boolean => {
  // Paranoid check that this is a valid pattern
  if (!isValidPattern(pattern)) {
    return false;
  }

  // Exact match (no wildcard to worry about)
  if (filePath === pattern) {
    return true;
  }

  // If there is a wildcard, chop it off and do a simple
  // startsWith comparison
  if (pattern.endsWith('*')) {
    const subPattern = pattern.replace('*', '');
    return filePath.startsWith(subPattern);
  }

  return false;
};

/**
 * Iterates through all the ownership patterns, and returns an array of OwnershipMatches
 * indicating which teams and patterns matched that file.
 * eg:
 * ```
 * [
 *  { teamName: 'team1', pattern: './app/src/components/*' },
 *  { teamName: 'team2', pattern: './app/*' }
 * ]
 * ```
 */
const validateOwnershipForFile = (
  ownership: OwnershipDefinition,
  filePath: string,
): PatternAndTeam[] => {
  const ownershipMatches: PatternAndTeam[] = [];

  Object.entries(ownership).forEach(([teamName, patterns]) => {
    patterns.forEach((pattern) => {
      if (doesFilePathMatchPattern(filePath, pattern)) {
        ownershipMatches.push({ teamName, pattern });
      }
    });
  });

  return ownershipMatches;
};

interface AuditOwnershipOptions {
  ownershipDefinition: OwnershipDefinition;
  teamsDefinition: TeamsDefinition;
  filePaths: string[];
}

/**
 * Iterates through all filePaths and creates a ValidateOwnershipResult based on which teams
 * own what files.
 * eg:
 * ```
 * {
 *  ownedFiles: {
 *    './app/src/components/MyComponent.tsx': 'team1',
 *    './app/src/components/MyOtherComponent.tsx': 'team2',
 *  },
 *  ownershipConflicts: {
 *    './app/src/components/MyConflictedComponent.tsx': [
 *      { teamName: 'team1', pattern: './app/*' },
 *      { teamName: 'team2', pattern: './app/src/* },
 *    ],
 *  },
 *  ownerlessFiles: [
 *    './app/src/components/MyOwnerlessComponent.tsx',
 *  ],
 *  invalidPatterns: [{ teamName: 'team1', pattern: './mything*' }],
 *  unusedPatterns: [{ teamName: 'team2', pattern: './app/src/components/DeletedComponent/*' }]
 */
export const generateOwnershipReport = (
  ownershipDefinition: OwnershipDefinition,
  filePaths: string[],
): ValidateOwnershipResult => {
  const ownedFiles: OwnedFiles = {};
  const ownerlessFiles: string[] = [];
  const ownershipConflicts: OwnershipConflicts = {};
  const invalidPatterns: PatternAndTeam[] = [];
  const usedPatterns = new Set<string>();
  const unusedPatterns: PatternAndTeam[] = [];

  // Check for invalid patterns
  Object.entries(ownershipDefinition).forEach(([teamName, patterns]) => {
    patterns.forEach((pattern) => {
      if (!isValidPattern(pattern)) {
        invalidPatterns.push({
          teamName,
          pattern,
        });
      }
    });
  });

  // Produce the ownership reports
  filePaths.forEach((filePath) => {
    // Get the matching 'owners' for this file based on their patterns
    const matches = validateOwnershipForFile(ownershipDefinition, filePath);

    // If there were no matches, this is an ownerless file
    if (matches.length === 0) {
      ownerlessFiles.push(filePath);
    }

    // If there was exactly 1 match, this file has a single owner
    if (matches.length === 1) {
      ownedFiles[filePath] = matches[0].teamName;
    }

    // If there were multiple matches, this is an ownership conflict
    if (matches.length > 1) {
      ownershipConflicts[filePath] = matches;
    }

    // Add the matched patterns to the usedPatterns set
    matches.forEach(({ pattern }) => {
      usedPatterns.add(pattern);
    });
  });

  // Report on any unused patterns
  Object.entries(ownershipDefinition).forEach(([teamName, patterns]) => {
    patterns.forEach((pattern) => {
      if (!usedPatterns.has(pattern) && isValidPattern(pattern)) {
        unusedPatterns.push({ teamName, pattern });
      }
    });
  });

  return {
    ownedFiles,
    ownerlessFiles,
    ownershipConflicts,
    invalidPatterns,
    unusedPatterns,
  };
};

export const auditOwnership = ({
  ownershipDefinition,
  teamsDefinition,
  filePaths,
}: AuditOwnershipOptions) => {
  validateTeams(teamsDefinition);
  validateOwnership(ownershipDefinition);
  validateMissingTeams({ teamsDefinition, ownershipDefinition });

  return generateOwnershipReport(ownershipDefinition, filePaths);
};
