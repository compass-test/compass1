import { formatStatusMessageNode, formatStatusMessageNodes } from './index';

describe('formatStatusMessageNodes()', () => {
  it('should handle the single {{link:}} variable', () => {
    const str = 'This is a cool link {{link:https://google.com}}. meh.';
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(3);
    expect(result[0]).toBe('This is a cool link ');
    expect(result[1]).toMatchInlineSnapshot(`
      <ExternalLink
        href="https://google.com"
      >
        https://google.com
      </ExternalLink>
    `);
    expect(result[2]).toBe('. meh.');
  });

  it('should handle the single {{link:}} variable, and begin with the {{link:}}', () => {
    const str = '{{link:https://google.com}}. meh.';
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchInlineSnapshot(`
      <ExternalLink
        href="https://google.com"
      >
        https://google.com
      </ExternalLink>
    `);
    expect(result[1]).toBe('. meh.');
  });

  it('should handle the single {{link:}} variable, and end with the {{link:}}', () => {
    const str =
      'This is a cool site. Check it out: {{link:https://google.com}}';
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(2);
    expect(result[0]).toBe('This is a cool site. Check it out: ');
    expect(result[1]).toMatchInlineSnapshot(`
      <ExternalLink
        href="https://google.com"
      >
        https://google.com
      </ExternalLink>
    `);
  });

  it('should handle the single {{link:}} variable, and the {{link:}} only', () => {
    const str = '{{link:https://google.com}}';
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchInlineSnapshot(`
      <ExternalLink
        href="https://google.com"
      >
        https://google.com
      </ExternalLink>
    `);
  });

  it('should handle multiple {{link:}} variables', () => {
    const str =
      "This is a cool link {{link:https://google.com}}. meh. And yet here's another one {{link:https://apple.com}}";
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(4);
    expect(result[0]).toBe('This is a cool link ');
    expect(result[1]).toMatchInlineSnapshot(`
      <ExternalLink
        href="https://google.com"
      >
        https://google.com
      </ExternalLink>
    `);
    expect(result[2]).toBe(". meh. And yet here's another one ");
    expect(result[3]).toMatchInlineSnapshot(`
      <ExternalLink
        href="https://apple.com"
      >
        https://apple.com
      </ExternalLink>
    `);
  });

  it('should not parse the wrong {{link:}} format, {{{link:}}', () => {
    const str = 'This is a cool link {{{link:https://google.com}}. meh.';
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe(str);
  });

  it('should not parse the wrong {{link:}} format, {{link:}}}', () => {
    const str = 'This is a cool link {{link:https://google.com}}}. meh.';
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe(str);
  });

  it('should not parse the wrong {{link:}} format, {{{link:}}}', () => {
    const str = 'This is a cool link {{{link:https://google.com}}}. meh.';
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe(str);
  });

  it('should not parse the wrong {{link:}} format, {{link::}}', () => {
    const str = 'This is a cool link {{link::https://google.com}}. meh.';
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe(str);
  });

  it('should not parse the wrong {{link:}} format, {{123link:}}', () => {
    const str = 'This is a cool link {{123link::https://google.com}}. meh.';
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe(str);
  });

  it('should not parse if no {{link:}} exist', () => {
    const str = 'This is a cool link. meh.';
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe(str);
  });

  it('should not parse if string is empty', () => {
    const str = '';
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(0);
  });

  it('should not parse the empty {{link:}} format, {{link:}}', () => {
    const str = 'This is a cool link {{link:}}. meh.';
    const result = formatStatusMessageNodes(str);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe(str);
  });

  it('should return the same string if not a valid url', () => {
    const str = '{{link:javascript:console.log(a))}}';
    const result = formatStatusMessageNode(str);

    expect(result).toBe(str);
  });

  it('should return the passed in string if not a valid url', () => {
    const str = '{{link:htt://www.ggogle.com}}';
    const result = formatStatusMessageNode(str);

    expect(result).toBe(str);
  });

  it('should allow only link with valid https protocol', () => {
    const str = '{{link:https://apple.com}}';
    const result = formatStatusMessageNode(str);

    expect(result).toMatchInlineSnapshot(`
      <ExternalLink
        href="https://apple.com"
      >
        https://apple.com
      </ExternalLink>
    `);
  });

  it('should allow only link with valid http protocol', () => {
    const str = '{{link:http://apple.com}}';
    const result = formatStatusMessageNode(str);

    expect(result).toMatchInlineSnapshot(`
      <ExternalLink
        href="http://apple.com"
      >
        http://apple.com
      </ExternalLink>
    `);
  });
});
