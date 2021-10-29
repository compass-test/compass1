require('dotenv').config();

module.exports = {
  botID: process.env.BOT_APP_ID,
  githubOrg1: process.env.GH_ORG_1,
  githubOrg2: process.env.GH_ORG_2,
  githubOrg3: process.env.GH_ORG_3,
  githubOrg4: process.env.GH_ORG_4,
  org1InstallationID: process.env.ORG_1_INSTALLATION_ID,
  org2InstallationID: process.env.ORG_2_INSTALLATION_ID,
  org3InstallationID: process.env.ORG_3_INSTALLATION_ID,
  org4InstallationID: process.env.ORG_4_INSTALLATION_ID,
  botKey: process.env.BOT_PRIVATE_KEY,
  serviceURL: `https://${process.env.GLOBALEDGE_INGRESS_SERVICES_DNS}/cla`,
  CLAInternalURL: process.env.MESH_DEPENDENCY_CLA_INTERNAL_BASE_URL,
  microsEnv: process.env.MICROS_ENV,
  microsServiceVersion: process.env.MICROS_SERVICE_VERSION,
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  sentryBrowserDSN: process.env.SENTRY_BROWSER_DSN,
  sentryServerDSN: process.env.SENTRY_SERVER_DSN,
};
