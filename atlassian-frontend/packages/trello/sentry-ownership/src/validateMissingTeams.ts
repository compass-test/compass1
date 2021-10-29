import { OwnershipDefinition } from './validateOwnership';
import { TeamsDefinition } from './validateTeams';

interface ValidateMissingTeamsArguments {
  ownershipDefinition: OwnershipDefinition;
  teamsDefinition: TeamsDefinition;
}

export const validateMissingTeams = ({
  ownershipDefinition,
  teamsDefinition,
}: ValidateMissingTeamsArguments) => {
  const teams = Object.keys(teamsDefinition);
  const missingTeams = Object.keys(ownershipDefinition).reduce<string[]>(
    (_missingTeams, value) => {
      if (!teams.includes(value)) {
        _missingTeams.push(value);
      }
      return _missingTeams;
    },
    [],
  );

  if (missingTeams.length > 0) {
    throw new Error(
      `The following teams have not been defined: ${missingTeams.join(', ')}`,
    );
  }
};
