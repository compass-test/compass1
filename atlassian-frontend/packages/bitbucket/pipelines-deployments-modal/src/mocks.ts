import {
  Commit,
  Deployable,
  Deployment,
  DeploymentState,
  DeploymentStatusIconType,
  DeploymentStatusType,
  Environment,
  Issue,
  PullRequest,
  User,
} from '@atlassian/pipelines-models';

import { Diff } from './types';

const avatarImg =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAgACADAREAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAABwgEBQYJ/8QAGgEAAgMBAQAAAAAAAAAAAAAABAUAAgMGAf/aAAwDAQACEAMQAAAAMHQnV/mGTwzK4OwVbuFn5hTQ0o17tvHkWzngsnrcvmToQ4qoye63rCGMeD//xAArEAABBAEDBAIBAwUAAAAAAAABAgMEBQYHERIAEyEiMUEIFBUzFiQyUXH/2gAIAQEAAT8AnavYllOXoqZmbW1RZz2g9Fel2USPDkexT2GVqa27gAGyTsCPAJIPUnU/TCnyI49a6i5YbIcVsxYhj8ZYUdggyC0lpKyR4RzCiOrvW3TWj1Gqsff1Kv4oXMbKna0tzosBRdHiW92lJSfUBQSTxBJJA6mfko/qnn68dwReS5FikySiNZZvBqUirryUqDQYWf5gVD2VsUgEEHpnX+jN4zIrq+okQIleITECyKHeTx37jr3psoqJHrt4HV8w3a5o3XV6YrQUt79c9IIRBZaHHiU7b8UpHMFPEnkUAbAHa20uTQZVVMHKaK5qZig2/MjyFRDWcjuFuBw/4hKVncbhRATsnrLM3qKzD6xnA7QZTFeedM5cCSpuPxRslo+FhKvU/Q3HkdabaOZH+SmV1tc3au0DFHXIRbNO1zTn6L3WGWgvf3kvEKWoklKU9WrD9LnE+osHG6+enuGNJUtSUlxCy260V/G6Vj5OwKSD9HqXVvMmW3JitW8yWlTMeJW/3LjjgOw4pQCd+QGxA+t+tItBsnyHRiVkVK0bOx/cX4j1UH0sOPoQotnsqJCe6FtLBbWRyHlKvo4Dm9dp4v8ApugqY9PF90F1CNnZUgI9nnT8rcUQfJ/51+Rmjgs7GdbVte9YRpbi5D8SP/Mw6skqW3t5KVbk+PIKiOhp1dMWAFaxdNvE7F19brXbHwd1nYjx4O3n660PzKz0iwyyxxl9t+JPW47JUtseVuICVcfHgAJTt/rYn5J6/8QAIBEAAgIBBAMBAAAAAAAAAAAAAQIAAwQREiExBRRRI//aAAgBAgEBPwC3PGK/rjqXeReobF5E95nJLmLeUcGtZaDYhJ5MsRNST3K2REJaY16lBtEutFdW2bWsHEFbIBp1KGTkDuCutn2vM/GcN+EqW59Pkx6611+z/8QAHREAAgMAAgMAAAAAAAAAAAAAAAECAxESMQQhIv/aAAgBAwEBPwCVb3SxvMKZpLMEk30euJN7I1xfRW/no8mxRElMnDCFvAtg5srrcEZyJUn/2Q==';

export const user = new User({
  links: {
    avatar: {
      href: avatarImg,
    },
    html: {
      href: 'about:blank',
    },
  },
  uuid: 'user_uuid',
  display_name: 'Shrek1000',
});

export const commit = new Commit({
  author: { user: user },
  date: '2011-08-18T04:59:13+00:00',
  hash: 'db03e3c6698bdebb0aef036f1blahablha',
  'links.html.href': 'https://bitbucket.org',
  'links.self.href': 'https://api.bitbucket.org',
  message: 'Initial Bitbucket Pipelines configuration',
  parents: [{ hash: 'cfd48485fd8f7a2asomethingsomething' }],
  shortHash: 'db03e3c',
  summary: {
    html:
      '<p>Merged in <a rel="nofollow" href="https://softwareteams.atlassian.net/browse/CICD-802" target="_blank" data-module-key="dvcs-connector-issue-key-linker" data-link-key="dvcs-connector-issue-key-linker" data-app-key="jira-bitbucket-connector-plugin.de7f12e9-4b57-3fd3-b54a-7919f053920b" data-principal-uuid="{3a8a18b2-55fe-49c6-9319-bf67b19a6f30}" class="ap-connect-dialog">CICD-802</a>-ui-allow-to-redeploy-step-if-ar (<a href="https://bitbucket.org/bitbucketci/bitbucket-ui/pull-requests/2168/cicd-802-allow-to-redeploy-step-with" rel="nofollow" class="ap-connect-link">pull request #2168</a>)</p>\n<p><a rel="nofollow" href="https://softwareteams.atlassian.net/browse/CICD-802" target="_blank" data-module-key="dvcs-connector-issue-key-linker" data-link-key="dvcs-connector-issue-key-linker" data-app-key="jira-bitbucket-connector-plugin.de7f12e9-4b57-3fd3-b54a-7919f053920b" data-principal-uuid="{3a8a18b2-55fe-49c6-9319-bf67b19a6f30}" class="ap-connect-dialog">CICD-802</a> allow to redeploy step with download artifacts disabled</p>\n<p>Approved-by: X</p>',
  },
  url: 'https://bitbucket.org',
});

export const deployable = new Deployable({
  commit: commit,
  created_on: '2011-08-18T04:59:31.299963Z',
  name: '#1',
  url: 'https://bitbucket.org',
});

export const deploymentState = (
  statusName: DeploymentStatusType,
  icon: DeploymentStatusIconType,
) =>
  new DeploymentState({
    completed_on: '2011-08-18T04:59:46.265886Z',
    name: 'COMPLETED',
    parsedStatus: statusName,
    started_on: '2011-08-18T04:59:41.933204Z',
    status: statusName,
    statusIcon: icon,
    'status.name': statusName,
    triggerUrl: '',
    url: 'https://bitbucket.org/',
  });

export const createDeployment = (
  statusName: DeploymentStatusType,
  icon: DeploymentStatusIconType,
  pipelineNumber = '#1',
) =>
  new Deployment({
    uuid: `foo${pipelineNumber}`,
    deployable: new Deployable({
      commit: commit,
      created_on: '2011-08-18T04:59:31.299963Z',
      name: pipelineNumber,
      url: 'https://bitbucket.org',
    }),
    state: deploymentState(statusName, icon),
    'environment.name': 'Production',
    'environment.uuid': '947eb5dd-63bb-pingu-blah',
    step: {
      trigger: { triggerer: user },
    },
  });

export const environment = new Environment({
  name: 'Production',
  deployment_gate_enabled: false,
  latest_successful_deployment: createDeployment('SUCCESSFUL', 'success'),
});

export const emptyDeployment = new Deployment();

export const pullRequest = new PullRequest({
  author: user,
  created_on: '2011-08-18T04:59:41.933204Z',
  updated_on: '2011-08-18T04:59:41.933204Z',
  title: 'foo',
  destination: { branch: { name: 'master' } },
  source: { branch: { name: 'bug' } },
  id: '10',
  state: 'MERGED',
});

export const issue = new Issue({
  id: '119051',
  key: 'CICD-802',
  fields: {
    summary:
      '[UI] allow to redeploy step if artifacts are expired but they are not used for deployment',
    issue_type: {
      id: '10103',
      description:
        'A problem which impairs or prevents the functions of the product.',
      icon_url:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjRTU0OTNBIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHJ4PSIyIi8+PHBhdGggZD0iTTEwIDdhMyAzIDAgMSAxLTYgMCAzIDMgMCAwIDEgNiAwIiBmaWxsPSIjRkZGIi8+PC9nPjwvc3ZnPg==',
      name: 'Bug',
    },
    priority: {
      icon_url:
        'https://raw.githubusercontent.com/cstivers78/jira-priority-icons/master/jira_priority/medium.svg',
      name: 'Medium',
      id: '3',
    },
    assignee: {
      'account-id': '557057:df2e56d6-313e-46b6-b524-584f659fc03d',
      display_name: 'Piotr Plewa',
      avatar_url: avatarImg,
    },
    status: {
      id: '10001',
      name: 'Done',
      icon_url: 'https://softwareteams.atlassian.net/',
      status_category: {
        id: '3',
        key: 'done',
        color_name: 'green',
        name: 'Done',
      },
    },
  },
  self: 'https://softwareteams.atlassian.net/rest/api/2/issue/119051',
});

export const diff = ({
  from: 'README.md',
  to: 'README.md',
  chunks: [
    {
      content: '@@ -1,3 +1,4 @@',
      changes: [
        {
          type: 'add',
          add: true,
          newLine: 1,
          position: 1,
          content:
            '+<<<<<<< destination:2a9aa0bd0f8804477fb019ff78e249dfd850bc8c',
        },
        {
          type: 'normal',
          normal: true,
          oldLine: 1,
          newLine: 2,
          position: 2,
          content: ' A NEW EDIT2',
        },
        {
          type: 'normal',
          normal: true,
          oldLine: 2,
          newLine: 3,
          position: 3,
          content: ' ',
        },
        {
          type: 'normal',
          normal: true,
          oldLine: 3,
          newLine: 4,
          position: 4,
          content: ' # README #',
        },
      ],
      oldStart: 1,
      oldLines: 3,
      newStart: 1,
      newLines: 4,
    },
    {
      content:
        '@@ -28,4 +29,9 @@ This README would normally document whatever steps are necessary to get your app',
      changes: [
        {
          type: 'normal',
          normal: true,
          oldLine: 28,
          newLine: 29,
          position: 5,
          content: ' ### Who do I talk to? ###',
        },
        {
          type: 'normal',
          normal: true,
          oldLine: 29,
          newLine: 30,
          position: 6,
          content: ' ',
        },
        {
          type: 'normal',
          normal: true,
          oldLine: 30,
          newLine: 31,
          position: 7,
          content: ' * Repo owner or admin',
        },
        {
          type: 'del',
          del: true,
          oldLine: 31,
          position: 8,
          content: '-* Other community or team contact',
        },
        {
          type: 'normal',
          normal: true,
          oldLine: 32,
          newLine: 32,
          position: 9,
          content: ' No newline at end of file',
        },
        {
          type: 'add',
          add: true,
          newLine: 33,
          position: 10,
          content: '+* Other community or team contact',
        },
        {
          type: 'add',
          add: true,
          newLine: 34,
          position: 11,
          content: '+=======',
        },
        {
          type: 'add',
          add: true,
          newLine: 35,
          position: 12,
          content: '+EDIT 7',
        },
        {
          type: 'add',
          add: true,
          newLine: 36,
          position: 13,
          content: '+>>>>>>> source:adbec475d83d9e3a0355399122e67ef77e286109',
        },
        {
          type: 'add',
          add: true,
          newLine: 37,
          position: 14,
          content: '+ Lorem ipsum dolor sit amet, ',
        },
        {
          type: 'add',
          add: true,
          newLine: 38,
          position: 15,
          content: '+ consectetur adipisicing elit, sed do eiusmod',
        },
      ],
      oldStart: 28,
      oldLines: 4,
      newStart: 29,
      newLines: 9,
    },
  ],
  deletions: 1,
  additions: 7,
  index: {
    fromFileHash: 'e08c702..6f1e9e7',
    mode: '100644',
  },
} as unknown) as Diff;
