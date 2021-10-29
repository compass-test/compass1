const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createPassport = require('./passport');
const routes = require('./routes');
const { constellationUrl, apiPath } = require('./constants');

const serviceSingleton = () => {
  let instance;

  const getInstance = async () => {
    if (!instance) {
      const app = express();
      const apiPathValue = await apiPath();
      const constellationUrlValue = await constellationUrl();
      app.use(
        cors({
          origin: async (origin, callback) => {
            if (origin === constellationUrlValue || !origin) {
              callback(null, true);
            } else {
              callback(new Error('Origin not allowed by CORS.'));
            }
          },
          credentials: true,
        }),
      );
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(cookieParser());

      const passport = await createPassport();

      app.use((req, res, next) => {
        passport.initialize()(req, res, next);
      });

      routes(app, passport, {
        apiPath: apiPathValue,
        constellationUrl: constellationUrlValue,
      });

      instance = serverless(app);
    }
    return instance;
  };

  return getInstance;
};

const serverlessServiceCreator = serviceSingleton();

module.exports.serviceSingleton = serviceSingleton;

module.exports.handler = async (event, context) => {
  const serverlessService = await serverlessServiceCreator();
  const result = await serverlessService(event, context);
  return result;
};
