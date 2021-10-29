/** This script is just so we can execute service deployment steps using bolt w without it erroring if it doesn't exist */
import * as bolt from 'bolt';
import {
  Logger,
  validateDeploymentPipelineVariables,
  getPackage,
} from '../utils';

type RunStepArgs = {
  packageName: string;
  script: string;
};

async function runStep({ packageName, script }: RunStepArgs) {
  const pkg = await getPackage(packageName);
  if (!pkg.config.scripts || !pkg.config.scripts[script]) {
    Logger.exit(`${packageName} does not have a script called ${script}`, 0);
  }

  Logger.progress(
    `Running ${script} step on service package ${packageName}...`,
  );
  await bolt.workspaceRun({
    script,
    pkgName: packageName,
  });
}

if (require.main === module) {
  validateDeploymentPipelineVariables(process.env);
  const { SERVICE_PACKAGE } = process.env;

  const [script] = process.argv.slice(2);
  if (!script) {
    throw new Error('No script name was provided');
  }

  runStep({ packageName: SERVICE_PACKAGE, script }).catch(err =>
    Logger.exit(err),
  );
}
