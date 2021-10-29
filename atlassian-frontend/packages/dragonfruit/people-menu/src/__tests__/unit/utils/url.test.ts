import { trimLastForwardSlash } from '../../../utils/url';

describe('trimLastForwardSplash', () => {
  it('should return correct value', () => {
    const url = 'https://pug.jira-dev.com/';
    expect(trimLastForwardSlash(url)).toEqual('https://pug.jira-dev.com');
  });
});
