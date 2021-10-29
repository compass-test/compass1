import {
  MAX_LENGTH_OF_LABEL,
  RESERVED_NAMESPACE_REGEXP,
  RUNNER_LABEL_REGEXP,
} from '@atlassian/pipelines-models';

import { INode, SyntaxLocation, SyntaxRange } from '../types';

import { Collector } from './collector';
import { VALID_ENVIRONMENT_NAME } from './const';
import { InvalidEnvironment, ParsingState } from './parsingState';

export class EntityError extends Error {
  range: SyntaxRange;
  type = 'error';

  constructor(message: string, rangeArg: SyntaxRange) {
    super(message);
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
    // #extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, EntityError.prototype);
    this.range = rangeArg;
  }
}

export class EntityWarning extends Error {
  range: SyntaxRange;
  type = 'warning';

  constructor(message: string, rangeArg: SyntaxRange) {
    super(message);
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
    // #extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, EntityWarning.prototype);
    this.range = rangeArg;
  }
}

export class YamlSyntaxError extends Error {
  location: SyntaxLocation;
  type = 'error';

  constructor(message: string, location: SyntaxLocation) {
    super(message);
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
    // #extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, YamlSyntaxError.prototype);
    this.location = location;
  }
}

export interface IEntity {
  description?: string;
  validate(
    node: any,
    parsingState?: ParsingState,
  ): EntityError | EntityError[] | undefined;
}

class OptionalEntity {
  constructor(private entity: IEntity) {}

  get description() {
    return this.entity.description;
  }

  validate(node: INode, parsingState: ParsingState) {
    return this.entity.validate(node, parsingState);
  }
}

class Walker {
  nodes: INode[];
  nodeIndex: number;

  constructor(nodes: INode[]) {
    this.nodes = nodes;
    this.nodeIndex = -1;
  }

  hasNext() {
    return this.nodes.length > this.nodeIndex + 1;
  }

  next() {
    if (!this.hasNext()) {
      throw new Error('Unexpected end of content.');
    }
    this.nodeIndex++;
    return this.nodes[this.nodeIndex];
  }

  trySkip() {
    if (this.hasNext()) {
      this.next();
    }
  }
}

const entityExpectedValueDictionary = {
  image: 'a Docker image name',
  clone: `'enabled', 'depth', 'lfs' or 'skip-ssl-verify'`,
  options: 'a docker, max-time or size property',
  definitions: 'a service property',
  service: 'service definition',
  pipelines: 'at least a default, branches, tags, bookmarks or custom section',
  default: 'a list of steps',
  branches: 'patterns to target specific branches',
  tags: 'patterns to target specific tags',
  bookmarks: 'patterns to target specific bookmarks',
  custom: 'names for your custom pipelines',
  step: 'a script',
  script: 'a list of commands',
};

export function createEntityError(node: INode, message: string) {
  return new EntityError(message, range(node));
}

export function createEntityWarning(node: INode, message: string) {
  return new EntityWarning(message, range(node));
}

function range(node: INode): SyntaxRange {
  return {
    start: node.start,
    end: node.end || node.start,
  };
}

export function seqOrShapeEntity(
  seqEntity: IEntity,
  shapeEntity: IEntity,
): IEntity {
  return {
    description: `either ${seqEntity.description} or ${shapeEntity.description}`,
    validate(node: INode, parsingState: ParsingState) {
      if (node.kind === 'sequence') {
        return seqEntity.validate(node);
      } else if (node.kind === 'mapping') {
        return shapeEntity.validate(node);
      }
      return createEntityError(node, `Use ${this.description}`);
    },
  };
}

// Different to the 'either' function as it only validates against seq or the given string entity, not both
export function seqOrStringEntity(
  seqEntity: IEntity,
  stringEntity: IEntity,
): IEntity {
  return {
    description: `either ${seqEntity.description} or ${stringEntity.description}`,
    validate(node: INode, parsingState: ParsingState) {
      if (node.kind === 'sequence') {
        return seqEntity.validate(node);
      } else if (node.kind === 'scalar' && typeof node.result === 'string') {
        return stringEntity.validate(node);
      }

      return createEntityError(node, `Use ${this.description}`);
    },
  };
}

export function either(...entities: IEntity[]): IEntity {
  return {
    description:
      entities.length === 1
        ? entities[0]?.description
        : `either ${entities.map((e) => e.description).join(` or `)}`,
    validate(node: INode, parsingState: ParsingState) {
      for (const entity of entities) {
        const errors = entity.validate(node, parsingState);
        if (!errors || (Array.isArray(errors) && errors.length === 0)) {
          return;
        }
      }

      return createEntityError(node, `Use ${this.description}`);
    },
  };
}

export function map(
  keyEntity: IEntity,
  valueEntity: IEntity,
  filterEntry?: any,
): IEntity {
  return {
    description: 'a map',
    validate(node: INode, parsingState: ParsingState) {
      const errors = new Collector();
      const walker = new Walker(node.children);
      while (walker.hasNext()) {
        const keyNode = walker.next();

        errors.add(keyEntity.validate(keyNode, parsingState));
        if (walker.hasNext()) {
          const valueNode = walker.next();
          errors.add(valueEntity.validate(valueNode, parsingState));
          const keyErrors =
            filterEntry &&
            filterEntry(keyNode, keyNode.result, valueNode, parsingState);
          if (keyErrors != null) {
            errors.add(keyErrors);
          }
        }
      }
      return errors.collect();
    },
  };
}

export function natural(): IEntity {
  return {
    description: 'an integer > 0',
    validate(node: INode, parsingState: ParsingState) {
      if (
        node.kind !== 'scalar' ||
        typeof node.result !== 'number' ||
        node.result < 0 ||
        Math.round(node.result) !== node.result
      ) {
        return createEntityError(node, `Use ${this.description}`);
      }
    },
  };
}

export function runnerLabel(): IEntity {
  const errorMessage =
    'Runner labels can only contain lowercase alphanumeric characters and dots that ' +
    'are not at the start or end of the label';
  return validateRunnerLabelPattern(errorMessage);
}

function validateRunnerLabelPattern(errorMessage: string): IEntity {
  return {
    description: `the regex ${new RegExp(RUNNER_LABEL_REGEXP)}`,
    validate(node: INode, parsingState: ParsingState) {
      if (node.kind !== 'scalar' || typeof node.result !== 'string') {
        return createEntityError(
          node,
          `Expected a string but found ${typeof node.result}`,
        );
      }

      const userValue = node.result;
      // check label length
      if (userValue.length > 50) {
        return createEntityError(
          node,
          `You have reached the ${MAX_LENGTH_OF_LABEL} character limit.`,
        );
      }

      // disallow illegal namespaces bitbucket.* and atlassian.*
      if (userValue.match(new RegExp(RESERVED_NAMESPACE_REGEXP))) {
        return createEntityError(
          node,
          `Namespaces bitbucket.* and atlassian.* are reserved.`,
        );
      }

      // check label regex
      if (!userValue.match(new RegExp(RUNNER_LABEL_REGEXP))) {
        return createEntityError(node, errorMessage);
      }
    },
  };
}

export function cacheName(): IEntity {
  const errorMessage =
    'Cache names can only contain lowercase alphanumeric characters and hyphens that ' +
    'are not at the start or end of the name';
  const pattern = /^(?!-)[-a-z0-9]*[a-z0-9]$/;
  return validateCacheNamePattern(pattern, errorMessage);
}

function validateCacheNamePattern(
  pattern: RegExp,
  errorMessage: string,
): IEntity {
  return {
    description: `the regex ${pattern}`,
    validate(node: INode, parsingState: ParsingState) {
      if (node.kind !== 'scalar' || typeof node.result !== 'string') {
        return createEntityError(
          node,
          `Expected a string but found ${typeof node.result}`,
        );
      }

      const userValue = node.result;
      if (reservedCacheNames().indexOf(userValue) !== -1) {
        return createEntityError(
          node,
          `"${node.result}" is a reserved cache name. Please use another name.`,
        );
      }
      if (!userValue.match(pattern)) {
        return createEntityError(node, errorMessage);
      }
    },
  };
}

export function cacheReference(): IEntity {
  return {
    validate(node: INode, parsingState: ParsingState) {
      const userValue = node.result;
      if (node.kind !== 'scalar' || typeof userValue !== 'string') {
        return createEntityError(
          node,
          `Expected a string but found a ${node.kind}.`,
        );
      }

      if (!parsingState.getCachesDefinitions().includes(userValue)) {
        return createEntityError(
          node,
          `Must reference a custom or default cache definition.`,
        );
      }
    },
  };
}

export function serviceReference(): IEntity {
  return {
    validate(node: INode, parsingState: ParsingState) {
      const userValue = node.result;
      if (node.kind !== 'scalar' || typeof userValue !== 'string') {
        return createEntityError(
          node,
          `Expected a string but found a ${node.kind}.`,
        );
      }

      if (
        !Object.keys(parsingState.getServicesDefinitions()).includes(userValue)
      ) {
        return createEntityError(
          node,
          `Must reference a custom or default service definition.`,
        );
      }
    },
  };
}

function reservedCacheNames(): string[] {
  return ['docker'];
}

export function integer(
  options: { min?: number; maxForFreeCustomers?: number; max?: number } = {},
): IEntity {
  return {
    description: 'an integer',
    validate(node: INode, parsingState: ParsingState) {
      const value = node.result;
      if (
        node.kind !== 'scalar' ||
        typeof node.result !== 'number' ||
        Math.round(value) !== value
      ) {
        return createEntityError(node, `Use ${this.description}`);
      }

      const errors: string[] = [];
      const { min, maxForFreeCustomers, max } = options;
      let notInRange = false;
      let inPaidRange = false;
      if (min !== undefined) {
        errors.push(`>= ${min}`);
        notInRange = notInRange || value < min;
      }
      if (max !== undefined) {
        errors.push(`<= ${max}`);
        notInRange = notInRange || value > max;
      }
      if (maxForFreeCustomers !== undefined) {
        errors.push(`<= ${max}`);
        inPaidRange = inPaidRange || value > maxForFreeCustomers;
      }

      if (notInRange) {
        return createEntityError(
          node,
          `Use an integer that is ${errors.join(' and ')}`,
        );
      }
      if (inPaidRange) {
        return createEntityWarning(
          node,
          `Values between ${maxForFreeCustomers} and ${max} are only available to customers on Standard or Premium plans. Please consider upgrading.`,
        );
      }
    },
  };
}

class PropertyError extends EntityError {
  property: string;

  constructor(message: string, rangeArg: SyntaxRange, property: string) {
    super(message, rangeArg);
    this.property = property;
    Object.setPrototypeOf(this, PropertyError.prototype);
  }
}

class MissingPropertyError extends PropertyError {
  constructor(message: string, rangeArg: SyntaxRange, property: string) {
    super(message, rangeArg, property);
    Object.setPrototypeOf(this, MissingPropertyError.prototype);
  }
}

class UnexpectedPropertyError extends PropertyError {
  constructor(message: string, rangeArg: SyntaxRange, property: string) {
    super(message, rangeArg, property);
    Object.setPrototypeOf(this, UnexpectedPropertyError.prototype);
  }
}

export function shape(
  spec: { [key: string]: IEntity | OptionalEntity },
  filterPerKey?: any,
  description = 'a section',
): IEntity {
  const keyEntity = string();
  return {
    description,
    validate(node: INode, parsingState: ParsingState) {
      if (node.kind !== 'mapping' && node.kind !== null) {
        return createEntityError(
          node,
          `Expected ${this.description} but found ${node.kind}.`,
        );
      }

      const walker = new Walker(node.children);
      let keysToFind: string[] = [];

      // Add the keys for all the non-optional fields.
      Object.keys(spec).forEach((key) => {
        if (!(spec[key] instanceof OptionalEntity)) {
          keysToFind.push(key);
        }
      });

      const errors = new Collector();
      while (walker.hasNext()) {
        const keyNode = walker.next();
        errors.add(keyEntity.validate(keyNode, parsingState));
        const key = keyNode.result as string;
        if (!spec.hasOwnProperty(key)) {
          errors.add(
            new UnexpectedPropertyError(
              `Unexpected property '${key}'`,
              range(keyNode),
              key,
            ),
          );
          walker.trySkip();
          continue;
        }
        keysToFind = keysToFind.filter((k) => k !== key);
        const valueNode = walker.next();
        const valueEntity: IEntity = spec[key];
        if (valueNode.result === null) {
          errors.add(
            createEntityError(
              keyNode,
              `'${key}' requires ${
                (entityExpectedValueDictionary as any)[key] || 'a value'
              }`,
            ),
          );
        } else {
          errors.add(valueEntity.validate(valueNode, parsingState));
          const keyErrors =
            filterPerKey && filterPerKey(node, key, valueNode, parsingState);
          if (keyErrors != null) {
            errors.add(keyErrors);
          }
        }
      }

      keysToFind.forEach((key) => {
        errors.add(
          new MissingPropertyError(
            `Missing required property '${key}'`,
            range(node),
            key,
          ),
        );
      });

      const foundErrors = errors.collect();

      const unexpectedPropertyErrors = foundErrors.filter(
        (e) => e instanceof UnexpectedPropertyError,
      );
      const missingPropertyErrors = foundErrors.filter(
        (e) => e instanceof MissingPropertyError,
      );
      if (
        unexpectedPropertyErrors.length === 1 &&
        missingPropertyErrors.length === 1
      ) {
        const unexpectedPropertyError = unexpectedPropertyErrors[0] as PropertyError;
        const missingPropertyError = missingPropertyErrors[0] as PropertyError;
        foundErrors.splice(foundErrors.indexOf(unexpectedPropertyError), 1);
        foundErrors.splice(foundErrors.indexOf(missingPropertyError), 1);
        foundErrors.push(
          new EntityError(
            `Unexpected property '${unexpectedPropertyError.property}', ` +
              `did you mean '${missingPropertyError.property}'?`,
            unexpectedPropertyError.range,
          ),
        );
      }

      return foundErrors;
    },
  };
}

/**
 * Returns an entity representing a map containing custom pipelines.
 * @param steps Steps list inside the custom pipeline
 * @return the entity.
 */
export function customPipelines(steps: IEntity): IEntity {
  const internal = map(string(), steps);
  return {
    ...internal,
    validate(node, parsingState: ParsingState) {
      parsingState.setCustomPipelines(true);
      const result = internal.validate(node, parsingState);
      parsingState.setCustomPipelines(false);
      return result;
    },
  };
}

const pipelineVariable = (): IEntity =>
  shape({
    name: string(),
    default: optional.string(),
  });

/**
 * Returns an entity representing a pipeline variable list.
 * @return the entity.
 */
export function pipelineVariablesSeq(): IEntity {
  const sequenceValidation = seq(pipelineVariable());
  return {
    ...sequenceValidation,
    validate(node, parsingState: ParsingState) {
      if (!parsingState.hasCustomPipelines()) {
        return createEntityError(
          node,
          `'variables' can only be defined in a custom pipeline.`,
        );
      }
      return sequenceValidation.validate(node, parsingState);
    },
  };
}

export function seq(
  itemEntity: IEntity,
  reset?: boolean,
  filter?: any,
): IEntity {
  return {
    description: 'a list',
    validate(node, parsingState) {
      if (node.kind !== 'sequence') {
        return createEntityError(node, `Use ${this.description}.`);
      }

      // invalidate empty section
      if (Array.isArray(node.children) && !node.children.length) {
        return createEntityError(node, `Use ${this.description}.`);
      }

      if (reset && parsingState !== undefined) {
        parsingState.resetEnvironments();
      }

      const error = filter && filter(node);
      if (error !== null && error !== undefined) {
        return error;
      }

      const errors = new Collector();
      const walker = new Walker(node.children);

      while (walker.hasNext()) {
        const next = walker.next();
        errors.add(itemEntity.validate(next, parsingState));
      }

      return errors.collect();
    },
  };
}

export function string(
  value?: string,
  caseSensitive = true,
  skipDescription = false,
): IEntity {
  return {
    description: value
      ? `${JSON.stringify(value).replace(/\"/g, '')}${
          skipDescription ? `` : ` as the string`
        }`
      : 'a string',
    validate(node: INode, parsingState: ParsingState) {
      if (node.kind !== 'scalar' || typeof node.result !== 'string') {
        return createEntityError(
          node,
          `Expected ${this.description} but found a ${node.kind}.`,
        );
      }

      const userValue = caseSensitive ? node.result : node.result.toLowerCase();
      if (value && userValue !== value) {
        return createEntityError(node, `Incorrect value.`);
      }
    },
  };
}

export function environment(): IEntity {
  return {
    description: 'a string or number',
    validate(node: INode, parsingState: ParsingState) {
      if (
        node.kind !== 'scalar' ||
        (typeof node.result !== 'string' && typeof node.result !== 'number')
      ) {
        return createEntityError(
          node,
          `Expected ${this.description} but found a ${node.kind}.`,
        );
      }
      if (
        typeof node.result === 'string' &&
        !String(node.result).match(new RegExp(`^${VALID_ENVIRONMENT_NAME}$`))
      ) {
        return createEntityError(
          node,
          `Environment names can use letters, spaces, numbers, underscores or hyphens.`,
        );
      }

      const visitResult = parsingState.visitEnvironment(
        String(node.result).toLowerCase(),
      );
      if (visitResult instanceof InvalidEnvironment) {
        return createEntityWarning(
          node,
          `Environment name and order needs to be defined in your deployment settings.`,
        );
      }
    },
  };
}

export function any(): IEntity {
  return {
    description: 'any',
    validate() {
      return undefined;
    },
  };
}

export function bool(value?: any): IEntity {
  return {
    description: 'a boolean',
    validate(node: INode, parsingState: ParsingState) {
      if (
        typeof node.result !== 'boolean' ||
        (value && node.result !== value)
      ) {
        return createEntityError(
          node,
          `Expected ${this.description} but found a ${node.kind}.`,
        );
      }
    },
  };
}

export const optional = {
  seqOrStringEntity: (seqEntity: IEntity, stringEntity: IEntity) =>
    new OptionalEntity(seqOrStringEntity(seqEntity, stringEntity)),
  either: (...entities: IEntity[]) => new OptionalEntity(either(...entities)),
  map: (keyEntity: IEntity, valueEntity: IEntity, filterEntry?: any) =>
    new OptionalEntity(map(keyEntity, valueEntity, filterEntry)),
  integer: (options?: any) => new OptionalEntity(integer(options)),
  natural: () => new OptionalEntity(natural()),
  cacheName: () => new OptionalEntity(cacheName()),
  seq: (itemEntity: IEntity, reset?: boolean, filter?: any) =>
    new OptionalEntity(seq(itemEntity, reset, filter)),
  shape: (
    spec: { [key: string]: IEntity | OptionalEntity },
    filterPerKey?: any,
  ) => new OptionalEntity(shape(spec, filterPerKey)),
  string: (
    value?: string,
    caseSensitive?: boolean,
    skipDescription?: boolean,
  ) => new OptionalEntity(string(value, caseSensitive, skipDescription)),
  bool: (value?: any) => new OptionalEntity(bool(value)),
  any: (value?: any) => new OptionalEntity(any()),
  of: (entity: any) => new OptionalEntity(entity),
  environment: () => new OptionalEntity(environment()),
  seqOrShapeEntity: (seqEntity: IEntity, shapeEntity: IEntity) =>
    new OptionalEntity(seqOrShapeEntity(seqEntity, shapeEntity)),
};
