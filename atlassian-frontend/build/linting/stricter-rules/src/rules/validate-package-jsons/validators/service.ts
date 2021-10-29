import { PackageJsonValidators } from '../types';
import {
  customPipelineExclusions,
  customEnvExclusions,
} from '../../../common/exclusion-lists';

const ENVIRONMENTS = [
  'statlas',
  'pdev',
  'pdev-apse2',
  'ddev',
  'dev-west2',
  'adev',
  'adev-west',
  'adev-west2',
  'stg-east',
  'stg-west',
  'stg-west2',
  'stg-euwest',
  'stg-eucentral',
  'stg-apse',
  'prod-east',
  'prod-west',
  'prod-west2',
  'prod-euwest',
  'prod-eucentral',
  'prod-apse',
  'prod-apse2',
];

const serviceValidators: PackageJsonValidators = [
  function mustDefineServiceName({ config }) {
    const afServices = config['af:services'];
    return afServices && !afServices.serviceName
      ? 'af:services.serviceName must be defined'
      : undefined;
  },
  function noCustomPipeline({ name, config }) {
    const afServices = config['af:services'];
    return (afServices?.master?.continuous?.customPipeline ||
      afServices?.branch?.customPipeline) &&
      !customPipelineExclusions.has(name)
      ? "Custom deployment pipelines aren't allowed without explicit AFP approval"
      : undefined;
  },
  function allowedEnvironments({ name, config }) {
    if (customEnvExclusions.has(name)) {
      return undefined;
    }
    const masterEnv = config['af:services']?.master?.continuous?.env || [];
    const branchEnv = config['af:services']?.branch?.env || [];
    const envs = [
      ...(Array.isArray(masterEnv) ? masterEnv : [masterEnv]),
      ...(Array.isArray(branchEnv) ? branchEnv : [branchEnv]),
    ];
    const illegalEnvs = envs.filter(e => !ENVIRONMENTS.includes(e));
    if (illegalEnvs.length) {
      return `af:services includes env declarations that are not valid: ${illegalEnvs.join(
        ',',
      )}`;
    }
    return undefined;
  },
];

export default serviceValidators;
