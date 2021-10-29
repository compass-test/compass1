import AWS from 'aws-sdk';

interface NanosEnvVariables {
  BASE_URL?: string;
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;
  ASAP_PUBLIC_KEY_REPOSITORY_URL?: string;
  ASAP_PUBLIC_KEY_FALLBACK_REPOSITORY_URL?: string;
  MICROS_ENV?: string;
  MICROS_AWS_REGION?: string;
  ZONE?: string;
  MICROS_SERVICE?: string;
  ELB_DNS_NAME?: string;
  MICROS_SERVICE_DOMAIN_NAME?: string;
  MICROS_SERVICE_PORT?: string;
  MICROS_SERVICE_PROTOCOL?: string;
}
/***
 * Returns a AWS.DynamoDB.DocumentClient instance
 * When using Nanos it will be wired up to use the local running DynamoDB
 */
export const getDynamoDBDocumentClient = (config?: {
  endpoint: string;
  region: string;
}) => {
  const env: NodeJS.ProcessEnv & NanosEnvVariables = process.env;
  if (env.MICROS_ENV === 'local') {
    return new AWS.DynamoDB.DocumentClient({
      endpoint: config && config.endpoint,
      region: config && config.region,
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    });
  }
  return new AWS.DynamoDB.DocumentClient({});
};
