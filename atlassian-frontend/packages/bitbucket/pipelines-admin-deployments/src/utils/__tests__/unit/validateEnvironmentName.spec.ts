import { Environment } from '@atlassian/pipelines-models';

import { MAX_ENVIRONMENTS } from '../../../const';
import validateEnvironmentName from '../../validateEnvironmentName';

describe('validateEnvironmentName util', () => {
  it('should mark invalid empty environment name', () => {
    expect(validateEnvironmentName('', [])).toEqual(
      'Please fill out this field.',
    );
  });
  it('should mark invalid environment name with special characters', () => {
    expect(validateEnvironmentName('foo#', [])).toEqual(
      'Use letters, spaces, numbers, underscore or hyphen.',
    );
  });
  it('should mark invalid environment name longer than 30 characters', () => {
    expect(
      validateEnvironmentName(
        'foo foo foo foo foo foo foo foo foo foo foo ',
        [],
      ),
    ).toEqual('Environment name must be less than 30 characters.');
  });
  it('should mark invalid environment with duplicate name', () => {
    expect(
      validateEnvironmentName('foo', [new Environment({ name: 'foo' })]),
    ).toEqual('Environment name must be unique.');
  });
  it('should mark invalid environment with duplicate name with hyphens', () => {
    expect(
      validateEnvironmentName('foo bar', [
        new Environment({ name: 'Foo-bAr' }),
      ]),
    ).toEqual('Name is too similar to existing Foo-bAr environment.');
  });
  it('should mark invalid environment that exceeds environment limit', () => {
    expect(
      validateEnvironmentName(
        'foo',
        Array.from({ length: MAX_ENVIRONMENTS }).map(
          (key, index) => new Environment({ name: `foo_${index}` }),
        ),
      ),
    ).toEqual(`You can only have ${MAX_ENVIRONMENTS} environments.`);
  });
});
