export const pipelinesDefinitions = [
  {
    type: 'branches',
    pattern: 'master',
    variables: Array(0),
    error: undefined,
  },
  {
    type: 'custom',
    pattern: 'deploy-to-ddev',
    variables: Array(0),
    error: undefined,
  },
  { type: 'default', pattern: '', variables: Array(0), error: undefined },
  {
    type: 'pull-requests',
    pattern: '**',
    variables: Array(0),
    error: undefined,
  },
];
