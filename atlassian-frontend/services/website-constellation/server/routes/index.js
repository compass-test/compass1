const contentful = require('contentful');
const __set = require('lodash/set');
const { replaceEntryHyperlink, omitParent } = require('../utils');
const {
  contentfulAccessToken,
  contentfulSpaceId,
  constellationCookieDomain,
  constellationCookie,
} = require('../constants');

function validateRedirect(redirectURI) {
  if (redirectURI == null) return '/';
  return redirectURI;
}

let client;

const getContentfulClient = async () => {
  if (!client) {
    const contentfulSpaceIdValue = await contentfulSpaceId();
    const contentfulAccessTokenValue = await contentfulAccessToken();

    client = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: contentfulSpaceIdValue,
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: contentfulAccessTokenValue,
    });
  }

  return client;
};

// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.

function api(app, passport, env) {
  app.get(`${env.apiPath}/google`, (req, res, next) => {
    const redirectURI = validateRedirect(req.query.redirect);
    const authenticator = passport.authenticate('google', {
      scope: ['profile'],
      prompt: 'consent',
      state: redirectURI,
    });

    authenticator(req, res, next);
  });

  app.get(`${env.apiPath}/healthcheck`, (_, res) => {
    return res.status(200).json({ status: '200 OK' });
  });

  app.get(
    `${env.apiPath}/status`,
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      return res.status(200).json({ success: true });
    },
  );

  app.get(
    `${env.apiPath}/contentful/:entryId`,
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { entryId } = req.params;
      const contentfulClient = await getContentfulClient();
      try {
        // first try to resolve the entry up to 2 levels deep
        await contentfulClient
          .getEntry(entryId, {
            include: 2,
            content_type: 'guideline',
            select:
              // Emulates the fields fetched from GraphQL for unauthenticated guideline pages
              'fields.title,fields.parent,fields.slug,fields.description,fields.bodyText',
          })
          .then((entry) => {
            return omitParent(entry);
          })
          .then((entry) => {
            try {
              // we're going to try and invoke res.json here
              // if it chokes here we'll catch it
              return res.json(entry);
            } catch (e) {
              // and run the subsequent response through our recursive replaceEntryHyperlink fn here.
              // we're doing this to avoid having to traverse the entry object if we don't need to.
              // should this fail too, then the catch at the very bottom will handle the error.
              const newBodyTextContent = entry.fields.bodyText.content.map(
                replaceEntryHyperlink,
              );
              __set(entry, 'fields.bodyText.content', newBodyTextContent);
              return res.json(entry);
            }
          });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
        res.status(500);
      }
    },
  );

  app.get(`${env.apiPath}/callback`, (req, res) => {
    /**
     * https://product-fabric.atlassian.net/browse/DST-2313
     *
     * Investigation found that on the 'bad flow' the
     * returned auth code was being double encoded which
     * was why passport complained about it being malformed.
     *
     * This appears to be an inconsistency with AWS Lambda, documented
     * as an issue in `serverless-http`:
     * https://github.com/dougmoscrop/serverless-http/issues/74
     *
     * Here we are double decoding it as a workaround. This
     * is not an ideal final solution.
     *
     * TODO: mitigate/fix the root cause:
     * https://product-fabric.atlassian.net/browse/DST-2444
     */
    return res.redirect(
      `${env.apiPath}/callback2${decodeURIComponent(
        decodeURIComponent(req._parsedUrl.search),
      )}`,
    );
  });

  app.get(
    `${env.apiPath}/callback2`,
    (req, res, next) => {
      passport.authenticate('google', (err, user) => {
        const redirectUrl = `${env.constellationUrl}${
          req.query.state ? req.query.state.replace(/%2F/g, '/') : ''
        }`;

        const retryUrl = redirectUrl.replace(/\/*$/, '/?retry');
        if (err) {
          // eslint-disable-next-line no-console
          console.error('### Auth request redirected due to error:', err);
          return res.redirect(retryUrl);
        }
        if (!user) {
          // eslint-disable-next-line no-console
          console.error('### Auth request redirected due to missing user');
          return res.redirect(retryUrl);
        }
        req.user = user;
        return next();
      })(req, res, next);
    },

    async (req, res) => {
      // take the token from req.user (attached by passport)
      // and store it in a signed http only cookie.
      const constellationCookieValue = await constellationCookie();
      const constellationCookieDomainValue = await constellationCookieDomain();

      const redirectUrl = `${env.constellationUrl}${
        req.query.state ? req.query.state.replace(' ', '/') : ''
      }`;

      res.cookie(constellationCookieValue, req.user.token, {
        secure: !process.env.NETLIFY_DEV, // if NETLIFY_DEV is on don't mark this as secure
        sameSite: 'Lax',
        domain: process.env.NETLIFY_DEV
          ? undefined
          : constellationCookieDomainValue,
      });
      res.redirect(redirectUrl);
    },
  );
}

module.exports = api;
