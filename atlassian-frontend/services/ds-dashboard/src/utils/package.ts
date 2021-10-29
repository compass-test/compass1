import { getWorkspaces, Package as BoltPackage } from 'bolt';
import { Maybe, None, Some } from 'monet';

import always from 'lodash/fp/always';
import get from 'lodash/get';
import memoize from 'lodash/memoize';
import negate from 'lodash/fp/negate';
import _pick from 'lodash/pick';

import { or, and } from './fp';

import type { Predicate } from '../types/util';
import type {
  PackageJSON,
  TechStack,
  ReleaseModel,
  Theming,
  Documentation,
} from '../types/package';

type GetDataOptions = {
  shouldHidePrivate?: boolean;
  shouldHideDeprecated?: boolean;
};

const npmScope = /^@\w+\//;
const normalize = (pkg: BoltPackage): PackageJSON => pkg.config as PackageJSON;

export const getPackage = memoize(
  async (name: string): Promise<Maybe<PackageJSON>> => {
    const namePattern = npmScope.test(name) ? name : `@atlaskit/${name}`;
    const [pkg] = await getWorkspaces({ only: namePattern });
    return Maybe.fromUndefined(pkg).map(normalize);
  },
);

export const getPackageUnsafe = memoize(
  async (name: string): Promise<PackageJSON> => {
    const pkg = await getPackage(name);
    return pkg.some();
  },
);

const filterNone = always(true);
const maybeFilter = <T>(shouldFilter: boolean, predicate: Predicate<T>) =>
  shouldFilter ? predicate : filterNone;

const isOwnedByDST = (pkg: PackageJSON) =>
  get(pkg, 'atlassian.team') === 'Design System Team';

/**
 * Gets packages owned by DST (`atlassian.team` === "Design System Team") using the bolt API.
 *
 * Options can be used to hide private and deprecated packages.
 *
 * @example await getAllPackages()
 * @example await getAllPackages({ shouldHidePrivate: true, shouldHideDeprecated: true })
 */
export const getAllPackages = memoize(
  async (options?: GetDataOptions): Promise<PackageJSON[]> => {
    const { shouldHidePrivate = false, shouldHideDeprecated = false } =
      options ?? {};
    const filter = and(
      isOwnedByDST,
      maybeFilter(shouldHidePrivate, isPublic),
      maybeFilter(shouldHideDeprecated, negate(isDeprecated)),
    );

    const results = await getWorkspaces();
    const packages = results.map((pkg) => pkg.config as PackageJSON);

    return packages.filter(filter);
  },
  (options?: GetDataOptions) =>
    options && `${options.shouldHideDeprecated}-${options.shouldHidePrivate}`,
);

export const isPrivate = (pkg: PackageJSON): boolean => pkg?.private ?? false;

export const isInPublicMirror = (pkg: PackageJSON): boolean =>
  pkg?.atlassian?.inPublicMirror ?? false;

export const isPublic = (pkg: PackageJSON): boolean => {
  const isMarkedPrivate = pkg?.private ?? false;
  //const isInPublicMirror = pkg?.atlassian?.inPublicMirror ?? false;
  return !isMarkedPrivate /*&& isInPublicMirror*/;
};

/**
 * Some packages are marked deprecated to signal to non-Atlassians
 * that they're intended for internal usage only.
 *
 * They aren't actually deprecated though.
 */
const deprecationExclusions = ['@atlaskit/ds-lib'];
export const isDeprecated = (pkg: PackageJSON): boolean =>
  !deprecationExclusions.includes(pkg.name) &&
  pkg?.atlassian?.website?.deprecated !== undefined;

/**
 * Returns the name used for documentation purposes (`atlassian.website.name`).
 * If none is specified it will guess it based off the package name.
 */
export const getDisplayName = (pkg: PackageJSON): string =>
  pkg?.atlassian?.website?.name ?? guessDisplayName(pkg);

/**
 * Guesses a display name based off the package name.
 */
const guessDisplayName = (pkg: PackageJSON): string =>
  getUnscopedName(pkg)
    .replace(/^[a-z]/, (match) => match.toUpperCase())
    .replace(/\-/g, () => ' ');

/**
 * Returns the package name with its npm scope removed.
 * @example 'avatar' // from '@atlaskit/avatar'
 */
export const getUnscopedName = (pkg: PackageJSON): string =>
  pkg.name.replace(npmScope, '');

/**
 * Returns the package description. This may not exist.
 */
export const getDescription = (pkg: PackageJSON): Maybe<string> =>
  Maybe.fromUndefined(pkg?.description);

export const getTechStack = (pkg: PackageJSON): Maybe<TechStack> =>
  Maybe.fromUndefined(pkg?.techstack);

export const getAtlaskitPage = (pkg: PackageJSON): Maybe<string> =>
  isPublic(pkg)
    ? Some(
        `https://atlaskit.atlassian.com/packages/design-system/${getUnscopedName(
          pkg,
        )}`,
      )
    : None();

export const getConstellationPage = (pkg: PackageJSON): Maybe<string> =>
  Maybe.fromUndefined(pkg?.homepage).filter((href) =>
    href.startsWith('https://atlassian.design/'),
  );

export const getDocumentation = (pkg: PackageJSON): Maybe<Documentation> =>
  isPublic(pkg) && isInPublicMirror(pkg)
    ? getConstellationPage(pkg)
        .map(always('constellation' as Documentation))
        .orElse(getAtlaskitPage(pkg).map(always('atlaskit')))
    : Maybe.none();

export const isLiteModed = (pkg: PackageJSON): boolean =>
  pkg?.techstack?.['@repo/internal']?.['ui-components']?.includes(
    'lite-mode',
  ) ?? false;

export const hasTokens = (pkg: PackageJSON): boolean =>
  getTheming(pkg)
    .filter((theming) => theming === 'tokens')
    .isSome();

export const getReleaseModel = (pkg: PackageJSON): Maybe<ReleaseModel> =>
  Maybe.fromUndefined(pkg?.atlassian?.releaseModel);

export const hasDependency = (dep: string) => (pkg: PackageJSON): boolean =>
  Boolean(pkg?.dependencies?.[dep]);

export const hasDevDependency = (dep: string) => (pkg: PackageJSON): boolean =>
  Boolean(pkg?.devDependencies?.[dep]);

export const hasPeerDependency = (dep: string) => (pkg: PackageJSON): boolean =>
  Boolean(pkg?.peerDependencies?.[dep]);

export const hasSomeDependency = (dep: string): Predicate<PackageJSON> =>
  or(hasDependency(dep), hasDevDependency(dep), hasPeerDependency(dep));

export const hasRuntimeDependency = (dep: string): Predicate<PackageJSON> =>
  or(hasDependency(dep), hasPeerDependency(dep));

export const hasStyledComponents: Predicate<PackageJSON> = hasRuntimeDependency(
  'styled-components',
);

const stylingLibs = [
  'styled-components',
  '@emotion/styled',
  '@emotion/core',
  '@compiled/react',
] as const;
export type Styling = typeof stylingLibs[number];
export const getStyling = (pkg: PackageJSON): Maybe<Styling> =>
  Maybe.fromUndefined(
    stylingLibs.find((lib) => hasRuntimeDependency(lib)(pkg)),
  );

export const getTheming = (pkg: PackageJSON): Maybe<Theming> => {
  const value = pkg?.techstack?.['@repo/internal']?.['theming'];
  switch (typeof value) {
    case 'string':
      return Maybe.some(value);

    case 'object':
      return Maybe.fromUndefined(value[0]);

    case 'undefined':
      return Maybe.none();
  }
};

export const getVersion = (pkg: PackageJSON): Maybe<string> => {
  return Maybe.fromUndefined(pkg.version);
};

/**
 * The lodash pick function was just giving a Partial<PackageJSON>
 * return type.
 *
 * This wraps it to give better typing.
 */
const pick = <Object, Key extends keyof Object>(
  obj: Object,
  ...keys: Key[]
): Pick<Object, Key> => {
  return _pick(obj, keys) as Pick<Object, Key>;
};

export const trimPackageJSON = (pkg: PackageJSON): PackageJSON => {
  const trimmed = pick(
    pkg,
    'name',
    'version',
    'description',
    'techstack',
    'dependencies',
    'peerDependencies',
    'devDependencies',
    'private',
    'atlassian',
    'homepage',
    'website',
  );

  return trimmed;
};
