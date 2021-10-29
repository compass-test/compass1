// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const StargateProxyStgCookieCheck: React.FC<Props> = ({
  children,
}: Props) => {
  const isStgProxyEnabled =
    process && process.env && process.env.STORYBOOK_SESSION_TOKEN;

  if (isStgProxyEnabled) {
    return (
      <>
        <section style={{ color: 'grey' }}>
          Proxy to stargate stg enabled. All calls are made to staging
          environment using your aaid.
        </section>
        {children}
      </>
    );
  }

  return (
    <>
      <h3>
        You need to setup your cookie token for a local storybook proxy to
        stargate staging
      </h3>
      <p>
        To get the session token:
        <ol>
          <li>
            Go to{' '}
            <a href="https://id.stg.internal.atlassian.com">
              https://id.stg.internal.atlassian.com
            </a>
          </li>
          <li>
            Open the devtools, and navigate to <b>Application</b> -{'> '}
            <b>Cookies</b>
          </li>
          <li>
            Copy the cookie value for <b>cloud.session.token.stg</b>
          </li>
        </ol>
      </p>
      <p>
        Then either run storybook with your session token
        <pre>
          STORYBOOK_SESSION_TOKEN='your-session-token' bolt storybook
          'your-package'
        </pre>
      </p>
      <p>
        Or export session token for multiple runs
        <pre>
          export STORYBOOK_SESSION_TOKEN='your-session-token'{'\n'}
          bolt storybook 'your-package'
        </pre>
      </p>
    </>
  );
};
