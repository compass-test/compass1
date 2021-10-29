import type { AllMigrationPayload, AnySourceScreen } from '../../common/types';

type AnyPayload = Record<string, any>;
type AnyContext = Record<string, any>;

// Custom type guard to narrow down from any payload to migration payload
export const isMigrationPayload = (
  payload: AnyPayload,
): payload is AllMigrationPayload => {
  const validTypes: AllMigrationPayload['eventType'][] = [
    'SCREEN',
    'TRACK',
    'UI',
  ];
  return validTypes.includes(payload.eventType);
};

// Resolve source screen from contexts
const isSourceScreen = <S extends AnySourceScreen>(
  source: unknown,
): source is S => {
  return typeof source === 'string';
};

// Find the latest source property in the contexts and consider it as the source screen
export const getSourceScreenFromContext = <S extends AnySourceScreen>(
  contexts: AnyContext[],
  defaultSourceScreen: S,
): S => {
  return contexts.reduce<S>((acc, context) => {
    return isSourceScreen<S>(context.source) ? context.source : acc;
  }, defaultSourceScreen);
};
