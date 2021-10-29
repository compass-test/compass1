import './redirects.test.mock';
import { getRedirectURL } from '../../redirects';

describe('getRedirectURL', () => {
  it('should return redirect url for avatar ds', () => {
    const actual = getRedirectURL('/packages/design-system/avatar');

    expect(actual).toEqual('https://atlassian.design/components/avatar/');
  });

  it('should return redirect url for avatar core', () => {
    const actual = getRedirectURL('/packages/core/avatar');

    expect(actual).toEqual('https://atlassian.design/components/avatar/');
  });

  it('should return undefined for paths with no redirect', () => {
    const actual = getRedirectURL('/packages/navigation/legacy');

    expect(actual).toEqual(undefined);
  });
});
