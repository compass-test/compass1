export default function getEnvironment(hostname: string) {
  return hostname.endsWith('jira-dev.com') || hostname.endsWith('localhost')
    ? 'staging'
    : 'prod';
}
