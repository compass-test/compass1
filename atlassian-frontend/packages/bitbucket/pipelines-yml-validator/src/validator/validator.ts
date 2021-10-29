import {
  MAX_NUMBER_OF_CUSTOM_LABELS,
  SELF_HOSTED_LABEL,
  SYSTEM_LABELS,
} from '@atlassian/pipelines-models';

import { INode, Options } from '../types';

import { Collector } from './collector';
import { DEFAULT_ENVIRONMENTS, MAX_STEP_DURATION, MAX_STEPS } from './const';
import {
  bool,
  cacheName,
  cacheReference,
  createEntityError,
  customPipelines,
  either,
  EntityError,
  IEntity,
  integer,
  natural,
  optional,
  pipelineVariablesSeq,
  runnerLabel,
  seq,
  serviceReference,
  shape,
  string,
  YamlSyntaxError,
} from './entities';
import { ParsingState } from './parsingState';
import { Converter } from './yaml';

const oidcShape = () =>
  shape({
    enable: bool(),
  });

const stepCloneShape = () =>
  optional.shape({
    depth: optional.either(string('full'), natural()),
    lfs: optional.bool(),
    enabled: optional.bool(),
    'skip-ssl-verify': optional.bool(),
  });

const rootEntityCloneShape = () =>
  optional.shape({
    depth: optional.either(string('full'), natural()),
    lfs: optional.bool(),
    enabled: optional.bool(),
  });

const imageShape = () =>
  shape({
    name: optional.string(),
    username: optional.string(),
    password: optional.string(),
    email: optional.string(),
    'run-as-user': optional.integer(),
    aws: optional.either(
      shape({
        'access-key': string(),
        'secret-key': string(),
      }),
      shape({
        'oidc-role': string(),
      }),
    ),
  });

const serviceFilter = (node: INode) => {
  if (node.result.length > 5) {
    return createEntityError(node, `You need less than 5 services in a step.`);
  }

  return null;
};

const isSelfHostedRunnerStep = (step: INode) => {
  let isSelfHosted = false;

  if (Array.isArray(step.result['runs-on'])) {
    // label list
    isSelfHosted = step.result['runs-on'].includes(SELF_HOSTED_LABEL);
  } else if (
    step.result['runs-on'] !== null ||
    step.result['runs-on'] !== undefined
  ) {
    // inline label
    isSelfHosted = step.result['runs-on'] === SELF_HOSTED_LABEL;
  }
  return isSelfHosted;
};

const stepFilter = (
  step: INode,
  key: string,
  node: INode,
  parsingState: ParsingState,
) => {
  let entityError: any = null;
  if (
    key === 'services' &&
    step.result.services !== undefined &&
    step.result.services !== null &&
    Array.isArray(step.result.services)
  ) {
    const servicesMemory = parsingState.getSumOfServicesMemory(
      step.result.services,
    );
    const buildContainerMemoryLimit = parsingState.getBuildContainerMemoryLimit(
      step.result.size,
    );

    if (buildContainerMemoryLimit - servicesMemory < 1024) {
      entityError = createEntityError(
        node,
        `You've exceeded the services memory limit of ${buildContainerMemoryLimit}. Try reducing it.`,
      );
    }
  } else if (
    key === 'runs-on' &&
    step.result['runs-on'] !== undefined &&
    step.result['runs-on'] !== null &&
    Array.isArray(step.result['runs-on'])
  ) {
    // Check that there are only 10 labels, other than 'self.hosted' and system label
    const runnerLabels = step.result['runs-on'].filter(
      (label) => label !== SELF_HOSTED_LABEL && !SYSTEM_LABELS.includes(label),
    );

    // Check that runs-on contains only one system label
    const systemLabels = step.result['runs-on'].filter((value) =>
      SYSTEM_LABELS.includes(value),
    );

    if (systemLabels?.length > 1) {
      entityError = createEntityError(
        node,
        `There can only be 1 system label.`,
      );
    }

    if (runnerLabels.length > MAX_NUMBER_OF_CUSTOM_LABELS) {
      entityError = createEntityError(
        node,
        `You have reached the ${MAX_NUMBER_OF_CUSTOM_LABELS} custom label limit.`,
      );
    }
  } else if (
    key === 'caches' &&
    step.result.caches !== undefined &&
    step.result.caches !== null
  ) {
    const hasDockerService =
      parsingState.getGlobalOptionsDocker() ||
      (step.result.services !== undefined &&
      step.result.services !== null &&
      Array.isArray(step.result.services)
        ? step.result.services.includes('docker')
        : false);

    const hasDockerCache =
      Array.isArray(step.result.caches) &&
      step.result.caches.includes('docker');

    if (hasDockerCache && !hasDockerService) {
      entityError = createEntityError(
        node,
        `It looks like docker isn't defined as a service in this step. ` +
          `You'll need to add that before you can add a docker cache.`,
      );
    }
  } else if (
    key === 'clone' &&
    step.result.clone !== null &&
    step.result.clone !== undefined
  ) {
    if (step.result.clone['skip-ssl-verify'] && !isSelfHostedRunnerStep(step)) {
      entityError = createEntityError(
        node,
        `Skipping ssl certificate verification is only allowed on steps running on runners using the self.hosted label.`,
      );
    }
  } else if (
    key === 'size' &&
    step.result.size !== null &&
    step.result.size !== undefined
  ) {
    if (isSelfHostedRunnerStep(step)) {
      if (!/^(1x|2x|4x|8x)$/.test(step.result.size)) {
        entityError = createEntityError(
          node,
          `Use either 1x, 2x, 4x or 8x as the string`,
        );
      }
    } else {
      if (!/^(1x|2x)$/.test(step.result.size)) {
        entityError = createEntityError(
          node,
          `Use either 1x or 2x as the string`,
        );
      }
    }
  }
  return entityError;
};

const artifactsShape = (): IEntity =>
  shape({
    download: optional.bool(),
    paths: optional.seq(string()),
  });

const stepShape = (options: Options): IEntity =>
  shape(
    {
      name: optional.string(),
      image: optional.either(string(), imageShape()),
      'max-time': optional.integer({
        min: 1,
        maxForFreeCustomers: 120,
        max: options.maxStepDuration,
      }),
      size: optional.any(), // filtered in stepFilter
      script: seq(either(string(), pipeShape())),
      'after-script': optional.seq(either(string(), pipeShape())),
      artifacts: optional.seqOrShapeEntity(seq(string()), artifactsShape()),
      caches: optional.seq(cacheReference()),
      services: optional.seq(serviceReference(), false, serviceFilter),
      trigger: optional.either(
        string('manual', false),
        string('automatic', false),
      ),
      deployment: optional.environment(),
      clone: stepCloneShape(),
      condition: optional.of(conditionShape()),
      'runs-on': optional.seqOrStringEntity(seq(runnerLabel()), runnerLabel()),
      oidc: optional.either(bool(), oidcShape()),
    },
    stepFilter,
  );

const steps = (options: Options) =>
  seq(
    shape({
      variables: optional.of(pipelineVariablesSeq()),
      step: optional.of(stepShape(options)),
      parallel: optional.of(
        seq(
          shape({
            step: optional.of(stepShape(options)),
          }),
        ),
      ),
    }),
    true,
    (list: any) => validatePipelineVariables(list) || validateSteps(list),
  );

/**
 * Validate any pipeline variables that may be present.
 * @param node The YAML sequence node being validated.
 * @return EntityError or null if no errors.
 */
const validatePipelineVariables = (node: INode): EntityError => {
  const variables = node.children
    .map((element, index) => ({ element, index }))
    .filter(
      ({ element, index }) =>
        Object.keys(element.result).length === 1 &&
        element.result.hasOwnProperty('variables'),
    );

  if (variables.length > 1) {
    return createEntityError(
      variables[0].element,
      `'variables' can only be defined once per pipeline.`,
    );
  }

  if (variables[0]) {
    if (variables[0].index > 0) {
      return createEntityError(
        variables[0].element,
        `'variables' must appear before steps or parallel steps.`,
      );
    }

    const variableList = variables[0].element.result.variables;
    if (!Array.isArray(variableList)) {
      return createEntityError(
        variables[0].element,
        `'variables' must be a list.`,
      );
    }

    if (
      variableList.length !==
      [
        ...new Set(variableList.map((v: any) => JSON.stringify(v))),
      ].map((v: any) => JSON.parse(v)).length
    ) {
      return createEntityError(
        variables[0].element,
        `The same variable name is used more than once.`,
      );
    }
    if (variableList) {
      // com.atlassian.pipelines.plan.application.util.VariableParseUtil
      const regexp = new RegExp('^[A-Za-z_][A-Za-z0-9_]*$');

      for (const variable of variableList) {
        const name = variable ? variable.name : undefined;

        if (typeof name === 'string' && !regexp.test(name)) {
          return createEntityError(
            variables[0].element,
            `Variable name ` +
              name +
              ` is invalid. ` +
              `It should contain only alphanumeric characters and underscores ` +
              `and it should not begin with a number.`,
          );
        }
      }
    }
  }

  return null as any;
};

/**
 * Validate any steps (including parallel steps) that may be present.
 * @param node The YAML sequence node being validated.
 * @return EntityError or null if no errors.
 */
const validateSteps = (node: INode): EntityError => {
  const stepDefinitions = node.children;

  if (stepDefinitions.length > 0) {
    const firstStepNode = stepDefinitions[0];

    try {
      const trigger = firstStepNode.result.step.trigger;
      if (typeof trigger === 'string' && trigger.toLowerCase() === 'manual') {
        return createEntityError(
          firstStepNode,
          `The first step of a pipeline can't be manually triggered.`,
        );
      }
    } catch (e) {}
  }

  const numberOfSteps = stepDefinitions
    .map((definition) => {
      if (
        definition.result.hasOwnProperty('parallel') &&
        Array.isArray(definition.result.parallel)
      ) {
        return definition.result.parallel.length;
      } else if (definition.result.hasOwnProperty('step')) {
        return 1;
      } else {
        return 0;
      }
    })
    .reduce((val, i) => i + val, 0);

  if (numberOfSteps > MAX_STEPS) {
    return createEntityError(
      node,
      `You can't define more than ${MAX_STEPS} steps in total.`,
    );
  }

  return null as any;
};

const pipeShape = () =>
  shape(
    {
      pipe: optional.string(),
      task: optional.string(),
      name: optional.string(),
      environment: optional.map(string(), string()),
      variables: optional.map(
        string(),
        either(string(), seq(string()), integer()),
      ),
    },
    null,
    'a pipe',
  );

const conditionShape = () =>
  shape(
    {
      changesets: shape(
        {
          includePaths: seq(string()),
        },
        null,
        'a changesets condition',
      ),
    },
    null,
    'a condition',
  );

const rootEntity = (options: Options) =>
  shape({
    image: optional.either(string(), imageShape()),
    clone: rootEntityCloneShape(),
    options: optional.shape({
      docker: optional.bool(),
      'max-time': optional.integer({
        min: 1,
        maxForFreeCustomers: 120,
        max: options.maxStepDuration,
      }),
      size: optional.either(string('1x', false, true), string('2x', false)),
    }),
    definitions: optional.shape({
      services: optional.map(
        string(),
        shape({
          image: optional.either(string(), imageShape()),
          environment: optional.map(string(), string()),
          variables: optional.map(string(), string()),
          memory: optional.integer({ min: 128 }),
          type: optional.either(string('docker', true, true)),
        }),
        (
          keyNode: INode,
          serviceKey: string,
          serviceValue: INode,
          parsingState: ParsingState,
        ) => {
          if (
            serviceKey === 'docker' ||
            serviceValue.result?.type === 'docker'
          ) {
            return null;
          }
          if (!serviceValue.result) {
            return createEntityError(
              keyNode,
              `You need to tell us which image to use.`,
            );
          } else if (!serviceValue.result.hasOwnProperty('image')) {
            return createEntityError(
              keyNode,
              `You need to tell us which image to use.`,
            );
          }
        },
      ),
      caches: optional.map(cacheName(), string()),
    }),
    pipelines: shape({
      branches: optional.map(string(), steps(options)),
      bookmarks: optional.map(string(), steps(options)),
      custom: optional.of(customPipelines(steps(options))),
      tags: optional.map(string(), steps(options)),
      'pull-requests': optional.map(string(), steps(options)),
      default: optional.of(steps(options)),
    }),
  });

export default function validateYaml(
  bitbucketPipelinesYml: string,
  options: Options = {
    maxStepDuration: MAX_STEP_DURATION,
    environments: DEFAULT_ENVIRONMENTS,
  },
) {
  const converter = new Converter(bitbucketPipelinesYml);
  const parsingState = new ParsingState(options);

  const result = converter.toTree(bitbucketPipelinesYml);

  if (result instanceof YamlSyntaxError) {
    return [result];
  }
  if (converter.hasAnchor) {
    return []; // ignore errors
  }

  parsingState.setJSObject(converter.JSObject);
  return Collector.from(rootEntity(options).validate(result, parsingState));
}
