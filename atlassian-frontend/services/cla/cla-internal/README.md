# Atlassian Contributor License Agreement (CLA) Internal View

An internal view of Contributor License Agreements that have been signed by external parties.

## How to get CLA-Internal up and running locally

- Run `yarn` to install project dependencies

- Install `PostgreSQL`:

  - `brew install postgresql` and follow the post-install instructions.
  - Configure a local database named `clas`. Start the Postgres service if necessary: `brew services start postgresql`

- Create a file called `.env` in CLA-Internal’s project root (i.e., `cla-internal/.env`) with [dotenv-style](https://www.npmjs.com/package/dotenv) `KEY=value` environment variables, which looks like this:

  ```
  PG_DB_URL=postgres://localhost:5432/clas
  PORT=3001
  ASAP_PUBLIC_KEY_REPOSITORY_URL=http://localhost:3001/key-server/
  ASAP_PUBLIC_KEY_FALLBACK_REPOSITORY_URL=http://localhost:3001/key-server/
  ```

- Run `yarn db:init` to initialize the database (this includes running all migrations and seeding the db)

- Run `yarn dev` to start the app in watch mode

**In most cases, these steps should be sufficient to get a basic setup going.**

---

### Additional Notes

#### To play around with a local copy of the db:

1. Download the latest versions of `PostgreSQL` (`brew install postgresql`), [Sequelize](https://www.npmjs.com/package/sequelize), and [Sequelize-cli](https://www.npmjs.com/package/sequelize-cli).
2. Run the following command:
   `yarn sequelize-cli db:migrate && yarn sequelize-cli db:seed:all`

#### To test ASAP calls between services (i.e., testing API calls between CLA services):

1. Download the [asap-cli](https://bitbucket.org/atlassianlabs/asap-cli/src/master/).
2. Add the following files to CLA-Internal’s project root (all found on Lastpass):
   - `jwtKeys.js`
   - `pk.pem`
   - `.asap-config`
3. You would have to craft ASAP cURL requests with Bearer tokens. A sample of such a request is also included in [Lastpass](https://www.lastpass.com/), labelled `asap curl`.

---

## Production deployments

Production deployments are configured in Bitbucket Pipelines, and production configuration (db url, asap config) and secrets (GitHub keys) are stored there.

Production secrets are available in the `Shared-OSS` folder in [Lastpass](https://www.lastpass.com/) (please ask in `#opensource-shepherds-team` for access if **absolutely** needed — **these are not necessary for local development**).
