import path from 'path';
import { promises as fsp } from 'fs';
//import fs from 'fs';
import globby from 'globby';
import { safeLoad } from 'js-yaml';
import { DeploymentMetadata } from './deployment-metadata';

/**
 * Read the service descriptor for a service
 * @param serviceDir The directory of the service
 * @returns the contents of the descriptor typed as `any`
 */
export async function readServiceDescriptor(
  serviceName: string,
  serviceDir: string,
) {
  let serviceDescriptors = await globby(['*.sd.+(yml|yaml)'], {
    cwd: serviceDir,
  });
  if (serviceDescriptors.length === 0) {
    throw new Error(
      'No Service Descriptor exists for this service [file name must match *.sd.(yml|yaml)]',
    );
  } else if (serviceDescriptors.length > 1) {
    serviceDescriptors = serviceDescriptors.filter(sd =>
      sd.startsWith(`${serviceName}.sd.`),
    );
    if (serviceDescriptors.length === 0) {
      throw new Error(
        'There are multiple Service Descriptors for this service [matching *.sd.(yml|yaml)], but none that can be prioritised [matching <service-name>.sd.(yml|yaml)]',
      );
    }
  }
  const sdFileName = serviceDescriptors[0];
  let sdYaml;
  try {
    const serviceDescriptor = await fsp.readFile(
      path.join(serviceDir, sdFileName),
      'utf-8',
    );
    sdYaml = safeLoad(serviceDescriptor);
  } catch {
    throw new Error('The Service Descriptor can not be parsed');
  }
  if (typeof sdYaml !== 'object') {
    throw new Error('The Service Descriptor can not be parsed');
  }
  return sdYaml as any;
}

// For master deployments: changesets need to be consumed before deploying
// So we write the metadata to a file then read it after `yarn changeset version` has been executed
const METADATA_FILE = 'service-deployment-metadata.json';

export function writeDeploymentMetadata(metadata: DeploymentMetadata) {
  return fsp.writeFile(METADATA_FILE, JSON.stringify(metadata));
}

export async function readDeploymentMetadata(): Promise<DeploymentMetadata> {
  const data = await fsp.readFile(METADATA_FILE);
  await fsp.unlink(METADATA_FILE);
  return JSON.parse(data.toString());
}

// Save the artefact url of deployments in a file
const ARTEACT_URL_FILE = 'service-deployment-artefact-url.txt';

export function writeDeploymentArtefactUrl(url: string) {
  return fsp.writeFile(ARTEACT_URL_FILE, url);
}

export async function readDeploymentArtefactUrl(): Promise<string | undefined> {
  try {
    const data = await fsp.readFile(ARTEACT_URL_FILE);
    return data.toString();
  } catch (e) {
    return undefined;
  }
}
