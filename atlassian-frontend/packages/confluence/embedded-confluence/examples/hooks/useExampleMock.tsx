import React, { useState } from 'react';
import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import Textfield from '@atlaskit/textfield';

/**
 * Allowlisted in prod, staging, and dev (port 8081 and 9000)
 * More information about laika: https://pug.jira-dev.com/wiki/spaces/DEVLOOP/pages/20800013673/Pipeline+Documentation
 * Laika Better Together Space (testing default): https://laika.jira-dev.com/wiki/spaces/BTL/overview
 */
const DEFAULT_HOSTNAME = 'laika.jira-dev.com';
const DEFAULT_SPACE_KEY = 'BTL';
const DEFAULT_CONTENT_ID = '222953473';
const DEFAULT_PARENT_PAGE_ID = '';
const DEFAULT_TOKEN = '';
const DEFAULT_TOKEN_COOKIE_NAME = 'cloud.session.token.stg';
const DEFAULT_URL = `https://${DEFAULT_HOSTNAME}/wiki/spaces/${DEFAULT_SPACE_KEY}/pages/${DEFAULT_CONTENT_ID}?parentProduct=atlaskit`;

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto auto auto',
  gridGap: '10px',
  padding: '10px',
});

export const useExampleMock = ({
  showContentId = false,
  showHostname = false,
  showSpaceKey = false,
  showToken = false,
  showParentPageId = false,
  showUrl = false,
}: {
  showHostname?: boolean;
  showSpaceKey?: boolean;
  showContentId?: boolean;
  showToken?: boolean;
  showParentPageId?: boolean;
  showUrl?: boolean;
}) => {
  const [hostname, setHostname] = useState<string>(DEFAULT_HOSTNAME);
  const [spaceKey, setSpaceKey] = useState(DEFAULT_SPACE_KEY);
  const [contentId, setContentId] = useState(DEFAULT_CONTENT_ID);
  const [parentPageId, setParentPageId] = useState(DEFAULT_PARENT_PAGE_ID);
  const [token, setToken] = useState(DEFAULT_TOKEN);
  const [tokenCookieName, setTokenCookieName] = useState(
    DEFAULT_TOKEN_COOKIE_NAME,
  );
  const [url, setUrl] = useState(DEFAULT_URL);

  const removeTokenCookie = () => {
    Cookies.remove(tokenCookieName);
  };
  const setTokenCookie = () => {
    Cookies.set(tokenCookieName, token);
  };

  return {
    controls: (
      <Grid>
        {showHostname && (
          <div>
            <label htmlFor="hostname">Hostname: </label>
            <Textfield
              name="hostname"
              value={hostname}
              onChange={(e) =>
                setHostname((e.target as HTMLInputElement).value)
              }
            />
          </div>
        )}
        {showHostname && (
          <div>
            <label htmlFor="spaceKey">Space: </label>
            <Textfield
              name="spaceKey"
              value={spaceKey}
              onChange={(e) =>
                setSpaceKey((e.target as HTMLInputElement).value)
              }
            />
          </div>
        )}
        {showContentId && (
          <div>
            <label htmlFor="contentId">Content ID: </label>
            <Textfield
              name="contentId"
              value={contentId}
              onChange={(e) =>
                setContentId((e.target as HTMLInputElement).value)
              }
            />
          </div>
        )}
        {showParentPageId && (
          <div>
            <label htmlFor="parentPageId">Parent Page Id: </label>
            <Textfield
              name="parentPageId"
              value={parentPageId}
              onChange={(e) =>
                setParentPageId((e.target as HTMLInputElement).value)
              }
            />
          </div>
        )}
        {showToken && (
          <div>
            <label htmlFor="tokenCookieName">Token Cookie Name: </label>
            <Textfield
              name="tokenCookieName"
              value={tokenCookieName}
              onChange={(e) =>
                setTokenCookieName((e.target as HTMLInputElement).value)
              }
            />
          </div>
        )}
        {showToken && (
          <div>
            <label htmlFor="token">Token: </label>
            <Textfield
              name="token"
              value={token}
              onChange={(e) => setToken((e.target as HTMLInputElement).value)}
            />
          </div>
        )}
        {showUrl && (
          <div>
            <label htmlFor="url">URL: </label>
            <Textfield
              name="url"
              value={url}
              onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
            />
          </div>
        )}
      </Grid>
    ),
    hostname,
    spaceKey,
    contentId,
    parentPageId,
    url,
    removeTokenCookie,
    setTokenCookie,
  };
};
