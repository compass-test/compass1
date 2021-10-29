export function buildComponentAri(props: {
  cloudId: string;
  workspaceId: string;
  componentResourceId: string;
}): string {
  const { cloudId, workspaceId, componentResourceId } = props;

  // The component resource id may be empty or incorrect
  validateUuid(componentResourceId);
  validateUuid(workspaceId);
  validateUuid(cloudId);

  return `ari:cloud:compass:${cloudId}:component/${workspaceId}/${componentResourceId}`;
}

export function buildTeamAri(props: { teamId: string }): string {
  const { teamId } = props;

  return `ari:cloud:teams::team/${teamId}`;
}
export const buildAtlassianTeamProfileURL = (accountId: string) =>
  `${window.location.origin}/people/team/${accountId}?ref=compass&src=teamDashboard&returnTo=compass`;

function validateUuid(uuid: string) {
  if (
    !/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/.test(
      uuid,
    )
  ) {
    throw Error('Not a valid uuid ' + uuid);
  }
}
