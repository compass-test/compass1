import React from 'react';
import { Link, LinkComponent } from '@atlassian/search-dialog';

interface Props {
  linkComponent?: LinkComponent;
  href: string;
  i18nTemplateString: string;
}
const START_TAG = '<a>';
const END_TAG = '</a>';

/**
 * A react component which replaces ONE <a></a> tag in the supplied i18n template string with a link, or link component if supplied.
 * This class would be redudant if we could use react-intl 3.x, but we can not.
 */
export const I18nTemplatedLink = ({
  linkComponent,
  href,
  i18nTemplateString,
}: Props) => {
  const [start, rest] = i18nTemplateString.split(START_TAG, 2);

  const [linkText, end] = rest
    ? rest.split(END_TAG, 2)
    : [undefined, undefined];

  return (
    <>
      {start}
      {linkText ? (
        <Link linkComponent={linkComponent} href={href}>
          {linkText}
        </Link>
      ) : null}
      {end}
    </>
  );
};
