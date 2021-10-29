import { ForgeDoc } from '@atlassian/forge-ui-types';
import { Type } from 'io-ts';
import { reporter } from './errorReporter';
import { Maybe, Rule } from '../types';

export const hasEmptyChildren: Rule = (element: ForgeDoc) => {
  const { type, children } = element;
  return children.length === 0
    ? { errors: [], warnings: [] }
    : { errors: [`${type} cannot have children.`], warnings: [] };
};

export const hasSingleChild: Rule = (element: ForgeDoc) => {
  const { type, children } = element;
  return children.length <= 1
    ? { errors: [], warnings: [] }
    : { errors: [`${type} can only have a single child.`], warnings: [] };
};

export const hasValidChildren = (validChildren: string[]): Rule => (
  element: ForgeDoc,
) => {
  const { type, children } = element;
  const invalidChildren = children.filter(
    (child) => !validChildren.includes(child.type),
  );

  const errors = invalidChildren.map((invalidChild) =>
    validChildren.length > 1
      ? `Expected direct child of ${type} to be one of [${validChildren.join(
          ', ',
        )}]. Received ${invalidChild.type} component.`
      : `Expected direct child of ${type} to be ${validChildren[0]}. Received ${invalidChild.type} component.`,
  );

  return {
    errors,
    warnings: [],
  };
};

export const hasNoInvalidChildren = (invalidChildren: string[]): Rule => (
  element: ForgeDoc,
) => {
  const { type, children } = element;

  const errors = children
    .filter((child) => invalidChildren.includes(child.type))
    .map((element) => `${element.type} cannot be used as child of ${type}`);

  return {
    errors,
    warnings: [],
  };
};

export const hasValidParent = (validParents: string[]): Rule => (
  element: ForgeDoc,
  path: string[],
) => {
  if (!path) {
    return { errors: [], warnings: [] };
  }

  const parent = path.pop();

  if (parent && validParents.includes(parent)) {
    return { errors: [], warnings: [] };
  }

  if (validParents.length > 1) {
    return {
      errors: [
        `${element.type} must be a direct child of one of [${validParents.join(
          ', ',
        )}].`,
      ],
      warnings: [],
    };
  }

  return {
    errors: [
      `${element.type} must be a direct child of a ${validParents[0]} component.`,
    ],
    warnings: [],
  };
};

export const hasValidAncestor = (validAncestors: string[]): Rule => (
  element: ForgeDoc,
  path: string[],
) => {
  const ok =
    !!path &&
    path.filter((ancestor) => validAncestors.includes(ancestor)).length > 0;

  if (ok) {
    return { errors: [], warnings: [] };
  }
  return {
    errors: [
      `${element.type} must be used within ${
        validAncestors.length > 1
          ? `one of [${validAncestors.join(', ')}]`
          : `a ${validAncestors[0]} component`
      }.`,
    ],
    warnings: [],
  };
};

export const hasNoInvalidAncestors = (invalidAncestors: string[]): Rule => (
  element: ForgeDoc,
  path: string[],
) => {
  if (!path) {
    return { errors: [], warnings: [] };
  }

  const errors = path
    .filter((ancestor) => invalidAncestors.includes(ancestor))
    .map(
      (invalidAncestor) =>
        `${element.type} cannot be used within a ${invalidAncestor} component.`,
    );

  return {
    errors,
    warnings: [],
  };
};

export const hasValidProps = <P>(propValidator: Type<P, P, any>): Rule => (
  element: ForgeDoc,
) => {
  const result = propValidator.decode(element.props);
  return {
    errors: [],
    warnings: reporter(result),
  };
};

export const mustBeUsedWithinModule = (expectedModuleType: string): Rule => (
  element: ForgeDoc,
  path: string[],
  moduleType?: string,
) => {
  if (!path) {
    return { errors: [], warnings: [] };
  }

  let errors = [];
  if (moduleType !== expectedModuleType) {
    errors.push(
      `${element.type} must be used in the ${expectedModuleType} module.`,
    );
  }

  return {
    errors,
    warnings: [],
  };
};

export const mustBeUsedWithinModules = (
  ...expectedModuleTypes: string[]
): Rule => (element: ForgeDoc, path: string[], moduleType?: string) => {
  if (!path) {
    return { errors: [], warnings: [] };
  }

  let errors = [];
  if (moduleType !== undefined && !expectedModuleTypes.includes(moduleType)) {
    errors.push(
      `${element.type} must be used in one of [${expectedModuleTypes.join(
        ', ',
      )}].`,
    );
  }

  return {
    errors,
    warnings: [],
  };
};

export const mustBeUsedWithinEntryPoint = (
  expectedEntryPoint: string,
): Rule => (
  element: ForgeDoc,
  path: string[],
  _moduleType?: string,
  entryPoint?: Maybe<string>,
) => {
  let errors = [];
  if (entryPoint !== expectedEntryPoint) {
    errors.push(
      `${element.type} must be used in the ${expectedEntryPoint} entry point.`,
    );
  }

  return {
    errors,
    warnings: [],
  };
};

export const mustBeTopLevelComponent = (element: ForgeDoc, path: string[]) => {
  if (!path) {
    return { errors: [], warnings: [] };
  }

  let errors = [];
  if (path.length > 1) {
    errors.push(
      `${element.type} was used within a ${
        path.slice(-1)[0]
      } but it must be used at the root.`,
    );
  }
  return {
    errors,
    warnings: [],
  };
};

export function isWithin(components: string[]): Rule {
  return (element: ForgeDoc, path: string[]) => {
    const ok = !!path && path.some((ancestor) => components.includes(ancestor));

    if (ok) {
      return { errors: [], warnings: [] };
    }

    if (components.length === 1) {
      return {
        errors: [
          `${element.type} must be used within a ${components[0]} component.`,
        ],
        warnings: [],
      };
    }

    return {
      errors: [
        `${element.type} must be used within one of [${components.join(
          ', ',
        )}].`,
      ],
      warnings: [],
    };
  };
}
