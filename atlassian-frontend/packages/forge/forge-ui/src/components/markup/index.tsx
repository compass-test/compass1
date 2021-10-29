import React, { ReactNode } from 'react';
import { Props } from '..';
import { LinkProps, MarkupProps, StringProps } from '@atlassian/forge-ui-types';

const AkButton = React.lazy(
  () => import('@atlaskit/button/custom-theme-button'),
);

// taken from https://hello.atlassian.net/wiki/spaces/PRODSEC/pages/158006558/URI+scheme+Allow+listing
const PROTOCOL_ALLOWLIST = [
  'http:',
  'https:',
  'ftp:',
  'ftps:',
  'mailto:',
  'skype:',
  'callto:',
  'facetime:',
  'git:',
  'irc:',
  'irc6:',
  'news:',
  'nntp:',
  'feed:',
  'cvs:',
  'svn:',
  'mvn:',
  'ssh:',
  'scp:',
  'sftp:',
  'itms:',
  'notes:',
  'hipchat:',
  'sourcetree:',
  'urn:',
  'tel:',
  'xmpp:',
  'telnet:',
  'vnc:',
  'rdp:',
  'whatsapp:',
  'slack:',
  'sip:',
  'sips:',
  'magnet:',
  'tds:',
];

export const sanitizeUrl = (urlString?: string) => {
  const url = new URL(urlString || '', window.location.href);
  if (PROTOCOL_ALLOWLIST.includes(url.protocol)) {
    return url.toString();
  } else {
    return 'about:blank';
  }
};

// this is different to Rendered<T>, as ReactNode supports inline strings
type ReactChildren = { children: ReactNode | ReactNode[] };
type Reacted<T> = Omit<T, 'children'> & ReactChildren;

export function Em({ children }: Reacted<MarkupProps>) {
  return <em>{children}</em>;
}

export function Link({
  href,
  children,
  openNewTab,
  appearance,
}: Reacted<LinkProps>) {
  const sanitizedHref = sanitizeUrl(href);
  const linkProps = {
    rel: 'noopener noreferrer',
    ...(openNewTab ? { target: '_blank' } : {}),
  };
  if (appearance === 'primary-button' || appearance === 'button') {
    return (
      <AkButton
        appearance={appearance === 'primary-button' ? 'primary' : 'default'}
        href={sanitizedHref}
        {...linkProps}
      >
        {children}
      </AkButton>
    );
  } else {
    return (
      <a href={sanitizedHref} {...linkProps}>
        {children}
      </a>
    );
  }
}

export function Strike({ children }: Reacted<MarkupProps>) {
  return <s>{children}</s>;
}

export function String({ text }: Reacted<StringProps>) {
  return <>{text}</>;
}

export function Strong({ children }: Reacted<MarkupProps>) {
  return <strong>{children}</strong>;
}

function wrap<T extends object>(Component: (_: Reacted<T>) => JSX.Element) {
  return function WrappedComponent({
    Components,
    children,
    props: propsAny,
    render,
    renderChildren,
    dispatch,
  }: Props) {
    const props = propsAny as Omit<T, 'children'>;
    return (
      <Component {...props}>
        {renderChildren({ Components, children, render, dispatch })}
      </Component>
    );
  };
}

export const EmFn = wrap<MarkupProps>(Em);
export const LinkFn = wrap<LinkProps>(Link);
export const StrikeFn = wrap<MarkupProps>(Strike);
export const StringFn = wrap<StringProps>(String);
export const StrongFn = wrap<MarkupProps>(Strong);
