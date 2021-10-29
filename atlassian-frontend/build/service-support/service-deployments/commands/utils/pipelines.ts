import { PipelinesClient } from '@atlaskit/build-utils/bitbucket';
import { DeploymentMetadata } from './deployment-metadata';

type Callback = (servicePackage: string, url: string) => void;

/**
 * Trigger pipelines to deploy all services that are found to require deployment
 * @param serviceDeploymentMetadata Information required for each service deployment
 * @param branch The remote branch to trigger the pipelines on
 * @param pipelinesClient Client for triggering pipelines
 * @param callback Optional function that is called on each trigger, used for logging
 */
export async function triggerDeploymentPipelines(
  serviceDeploymentMetadata: DeploymentMetadata,
  triggerOpts: { branch: string; commit?: string },
  pipelinesClient: PipelinesClient,
  callback?: Callback,
) {
  return Promise.all(
    serviceDeploymentMetadata.map(service =>
      pipelinesClient
        .trigger({
          ...triggerOpts,
          pipeline: service.pipeline,
          variables: [
            {
              key: 'SERVICE_PACKAGE',
              value: service.package,
            },
            {
              key: 'MICROS_ENV',
              value: service.env,
            },
            {
              key: 'CHANGED_PACKAGES',
              value: service.triggeredBy.join(','),
            },
          ],
        })
        .then(
          pipeline =>
            callback &&
            callback(
              service.package,
              pipelinesClient.getUrl(pipeline.build_number),
            ),
        ),
    ),
  );
}
