// eslint-disable-next-line import/no-extraneous-dependencies
import { Chance } from 'chance';

import {
  EnvironmentType,
  EvaluationErrorKind,
  EvaluationReason,
  FeatureFlagUserWithIdentifier,
  Identifiers,
  RawFlag,
} from '../index';

interface Mixins {
  environment: () => EnvironmentType;
  evaluationErrorKind: () => EvaluationErrorKind;
  evaluationReason: () => EvaluationReason;
  identifier: () => Identifiers;
  rawFlag: () => RawFlag<string>;
  user: () => FeatureFlagUserWithIdentifier;
  newUserWithSameIdentifier: (
    user: FeatureFlagUserWithIdentifier,
  ) => FeatureFlagUserWithIdentifier;
}

export type ChanceExtended = Chance.Chance & Mixins;

function randomUser(
  chance: ChanceExtended,
  user?: FeatureFlagUserWithIdentifier,
): FeatureFlagUserWithIdentifier {
  return {
    identifier: user?.identifier || {
      type: chance.identifier(),
      value: chance.string(),
    },
    custom: {
      randomAttribute: chance.string(),
    },
  };
}

function randomRawFlag(chance: ChanceExtended): RawFlag<string> {
  const flag: RawFlag<string> = {
    value: chance.string(),
    evaluationDetail: {
      reason: chance.evaluationReason(),
    },
  };

  switch (flag.evaluationDetail?.reason) {
    case EvaluationReason.RULE_MATCH:
      flag.evaluationDetail.ruleId = chance.string();
      break;
    case EvaluationReason.ERROR:
      flag.evaluationDetail.errorKind = chance.evaluationErrorKind();
      break;
    default:
  }
  return flag;
}

function chanceMixin(chanceOriginal: Chance.Chance): ChanceExtended {
  // chance is mutated when calling mixin so while we dont actually
  // have ChanceExtended now, we will when mixin functions are called.
  const chance: ChanceExtended = chanceOriginal as any;

  const mixin: Mixins = {
    environment: () => chance.pickone(Object.values(EnvironmentType)),
    evaluationErrorKind: () =>
      chance.pickone(Object.values(EvaluationErrorKind)),
    evaluationReason: () => chance.pickone(Object.values(EvaluationReason)),
    identifier: () => chance.pickone(Object.values(Identifiers)),
    rawFlag: () => randomRawFlag(chance),
    user: () => randomUser(chance),
    newUserWithSameIdentifier: (user: FeatureFlagUserWithIdentifier) =>
      randomUser(chance, user),
  };

  // Mixin (our type) and MixinDescriptor (chance type) are incompatible
  // as MixinDescriptor requires a type for index (eg { [key: string]: any })
  return chance.mixin(mixin as any);
}

const createRandomNumber = (): string => {
  const num = Math.random() + 1; // +1 because Dave is paranoid about falsey destroying everything
  // Using precision so console log doesnt cut off some values
  return Number(num.toPrecision(12)).toString();
};

export default function generateRandom(
  testClass: string,
  seed?: string,
): ChanceExtended {
  const randomSeed = seed || createRandomNumber();
  // eslint-disable-next-line no-console
  console.log(`Generating random seed for ${testClass}: ${randomSeed}`);
  const chance = new Chance(randomSeed);
  return chanceMixin(chance);
}

const mathOriginal = Object.create(global.Math);

// Remember to clean up your mocks!!
export function mockGlobalMath(chance: ChanceExtended): void {
  const mathMock = Object.create(global.Math);
  mathMock.random = jest
    .fn()
    .mockImplementation(() => chance.floating({ min: 0, max: 1, fixed: 12 }));

  global.Math = mathMock;
}

export function restoreGlobalMath(): void {
  global.Math = mathOriginal;
}
