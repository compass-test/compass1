const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const JWTModule = require('jsonwebtoken');
const {
  jwtSecret,
  jwtExpiry,
  googleCallbackUrl,
  googleClientId,
  googleClientSecret,
  constellationCookie,
} = require('../constants');

async function createPassport() {
  const cookieKey = await constellationCookie();
  const jwtSecretValue = await jwtSecret();
  const jwtExpiryValue = await jwtExpiry();
  const googleCallbackUrlValue = await googleCallbackUrl();
  const googleClientIdValue = await googleClientId();
  const googleClientSecretValue = await googleClientSecret();

  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientIdValue,
        clientSecret: googleClientSecretValue,
        callbackURL: googleCallbackUrlValue,
      },
      async (accessToken, refreshToken, { displayName, photos }, done) => {
        // on successful google oAuth2.0 validation
        // we hash the necessary but not sensitive parts of the retrieved google profile
        // into a signed JWT
        // and set the expiry to 1d.

        const profile = { displayName, photos };

        const token = JWTModule.sign(profile, jwtSecretValue, {
          expiresIn: jwtExpiryValue,
          algorithm: 'HS256',
        });

        return done(null, { token });
      },
    ),
  );

  passport.use(
    new JWTStrategy(
      {
        algorithm: ['HS256', 'HS384'],
        jwtFromRequest(req) {
          if (!req.cookies) {
            throw new Error('Missing cookie-parser middleware');
          }
          return req.cookies[cookieKey] || null;
        },
        secretOrKey: jwtSecretValue,
      },
      ({ displayName, photos }, done) => {
        // on successful decryption of the JWT token
        // we pass the payload (the users google displayName and photo)
        // to passport to attach to req.user
        return done(null, { displayName, photos });
      },
    ),
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  return passport;
}

module.exports = createPassport;
