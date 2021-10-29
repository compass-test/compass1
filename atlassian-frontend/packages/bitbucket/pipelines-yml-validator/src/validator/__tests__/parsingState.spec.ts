import { InvalidEnvironment, ParsingState } from '../parsingState';

describe('parsingState util', () => {
  let parsingState: ParsingState;

  beforeEach(() => {
    parsingState = new ParsingState();
  });

  it('should return error for invalid environment', () => {
    expect(parsingState.visitEnvironment('random')).toEqual(
      jasmine.any(InvalidEnvironment),
    );
  });

  it('should allow additional valid environments', () => {
    parsingState = new ParsingState({ environments: [['foo']] });
    expect(parsingState.visitEnvironment('foo')).toBeFalsy();
  });

  it('should only allow additional valid environments', () => {
    parsingState = new ParsingState({ environments: [['foo']] });
    expect(parsingState.visitEnvironment('test')).toEqual(
      jasmine.any(InvalidEnvironment),
    );
  });

  it('should return error for environments not in order', () => {
    parsingState.visitEnvironment('staging');
    expect(parsingState.visitEnvironment('test')).toEqual(
      jasmine.any(InvalidEnvironment),
    );
  });

  it('should return error for used environments', () => {
    parsingState.visitEnvironment('staging');
    expect(parsingState.visitEnvironment('staging')).toEqual(
      jasmine.any(InvalidEnvironment),
    );
  });
});
