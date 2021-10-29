import uploadBuildStatus from '@atlaskit/build-utils/bitbucket/upload-build-status';

const { BITBUCKET_EXIT_CODE } = process.env;

const args = process.argv.slice(2);
const flags = args.filter(arg => arg.startsWith('--'));
const posArgs = args.filter(arg => !arg.startsWith('--'));

const name = posArgs.length > 0 ? posArgs[0] : 'Default Branch Build';

if (!BITBUCKET_EXIT_CODE) {
  throw new Error('BITBUCKET_EXIT_CODE must exist');
}

let state: 'FAILED' | 'SUCCESSFUL' = 'FAILED';
if (BITBUCKET_EXIT_CODE === '0') {
  if (flags.includes('--final')) {
    state = 'SUCCESSFUL';
  } else {
    process.exit();
  }
}

uploadBuildStatus({
  name,
  state,
  update: true,
}).catch(e => {
  console.error('Unable to update build status');
  console.error(e.response ? e.response.data : e);
});
