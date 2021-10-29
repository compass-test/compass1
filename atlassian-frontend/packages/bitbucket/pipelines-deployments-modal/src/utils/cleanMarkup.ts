function strip_tags(_html: any) {
  var _tags = [],
    _tag = '';
  for (var _a = 1; _a < arguments.length; _a++) {
    _tag = arguments[_a].replace(/<|>/g, '').trim();
    if (arguments[_a].length > 0) {
      _tags.push(_tag, '/' + _tag);
    }
  }
  if (!(typeof _html === 'string') && !(_html instanceof String)) {
    return '';
  } else if (_tags.length === 0) {
    return _html.replace(/<(\s*\/?)[^>]+>/g, '');
  } else {
    var _re = new RegExp('<(?!(' + _tags.join('|') + ')s*/?)[^>]+>', 'g');
    return _html.replace(_re, '');
  }
}

export default function cleanMarkup(markup: string) {
  let html = (strip_tags as any)(markup, 'a');
  // 1. add "_top" target
  html = html.replace(/<a/g, '<a target="_top"');
  // 2. fix mailto links
  html = html.replace(
    /href="(.*?)&#109;&#97;&#105;&#108;&#116;&#111;&#58;(.*?)"/g,
    'href="mailto:$2"',
  );
  // 3. fix non-relative links
  html = html.replace(/href="\/(.*?)"/g, `href="https://bitbucket.org/$1"`);
  return html;
}
