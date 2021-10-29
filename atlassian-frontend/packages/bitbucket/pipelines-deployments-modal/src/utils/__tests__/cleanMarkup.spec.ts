import cleanMarkup from '../cleanMarkup';

describe('cleanMarkup util', () => {
  it('should strip all HTML tags except links', () => {
    expect(cleanMarkup('<p><br /><h1>foo</h1><a href="">bar</a></p>')).toEqual(
      'foo<a target="_top" href="">bar</a>',
    );
  });
  it('should parse commit message', () => {
    expect(
      cleanMarkup(
        '<p>Merged in foo (<a href="/foo/bar">pull request #1</a>)</p>',
      ),
    ).toEqual(
      'Merged in foo (<a target="_top" href="https://bitbucket.org/foo/bar">pull request #1</a>)',
    );
  });
});
