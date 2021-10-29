/**
 * Originally based on https://bitbucket.org/atlassian/pf-site-admin-ui/src/59bd8d6b2cf4c9807dc33447f6dec9b755542efc/src/apps/billing/scripts/sync-billing-ux-openapi-spec.ts?at=master
 */
// TODO: Expose this to this via bin. As of writing, this isn't well supported (it's possible but requires internally running of ts-node or babel-node)

import { promises as fs } from 'fs';
import { resolve } from 'path';

import stableStringify from 'json-stable-stringify';
import fetch from 'node-fetch';
import { error, exception, handle, Result, success } from 'resultful';
import { generateApi } from 'swagger-typescript-api';
import yargs from 'yargs';

const downloadOpenApiSpec = async (
  schemaUrl: string,
  filePath: string,
): Promise<Result<unknown, { message: string }, Error>> => {
  try {
    const response = await fetch(schemaUrl);

    if (!response.ok) {
      return error({
        message: `Received ${response.status}`,
      });
    }

    /**
     * We want the output to be deterministic and pretty/readable. So we parse
     * the input (which is not necessarily readable), and use `json-stable-stringify`
     * to encode it in a pretty and deterministic way (JSON.stringify is not
     * deterministic).
     */
    const json = await response.json();
    await fs.writeFile(filePath, stableStringify(json, { space: 2 }), 'utf8');

    return success(null);
  } catch (err) {
    return exception(err);
  }
};

const downloadOpenApiSpecHandlingErrors = async (
  schemaUrl: string,
  filePath: string,
) => {
  const result = await downloadOpenApiSpec(schemaUrl, filePath);

  const handleFailure = (obj: any) => {
    // eslint-disable-next-line no-console
    console.error('ERROR', obj);
    process.exitCode = 1;
  };

  handle(result, {
    // eslint-disable-next-line no-console
    payload: () => console.log('Written to: ', filePath),
    error: handleFailure,
    exception: handleFailure,
  });
};

const generateApiSpec = async (filePath: string, outputDirectory: string) => {
  await generateApi({
    output: resolve(process.cwd(), outputDirectory),
    input: resolve(process.cwd(), filePath),
    modular: true,
    generateClient: false,
    extractRequestParams: true,
    extractRequestBody: true,
    generateResponses: true,
    cleanOutput: true,
    singleHttpClient: true,
    prettier: '@atlassian/atlassian-frontend-prettier-config',
  } as any);
  // https://github.com/acacode/swagger-typescript-api/pull/296
};

const actionWrapper = <Args extends unknown[]>(
  command: (...args: Args) => Promise<unknown>,
) => async (...args: Args) => {
  try {
    await command(...args);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exitCode = 1;
  }
};

yargs
  .strict()
  .command(
    'download <schema-url> <destination-path>',
    'Download an OpenAPI schema from a URL and write it to a file',
    (yargs) =>
      yargs
        .positional('schema-url', {
          describe: 'URL to download schema from',
          type: 'string',
        })
        .positional('destination-path', {
          describe: 'Path to save schema',
          type: 'string',
        }),
    (argv) =>
      actionWrapper(downloadOpenApiSpecHandlingErrors)(
        argv['schema-url'] as string,
        argv['destination-path'] as string,
      ),
  )
  .command(
    'generate <schema-path-url> <destination-dir>',
    'Generate Typescript API client from OpenAPI schema file',
    (yargs) =>
      yargs
        .positional('schema-path-url', {
          describe: 'URL or file path to get schema from',
          type: 'string',
        })
        .positional('destination-dir', {
          describe: 'Directory path to save generated client',
          type: 'string',
        }),
    (argv) =>
      actionWrapper(generateApiSpec)(
        argv['schema-path-url'] as string,
        argv['destination-dir'] as string,
      ),
  ).argv;
