import axios from 'axios';
import retry from 'async-retry';
/**
 * NOTE: This utility will manage the browserstack build queues.
 * It checks the number of build running in BS and if the number is greater than the X limit, it will retry after Y time.
 * The goal is to prevent Browserstack to be hammered and reduce the number of timeout for users.
 *
 * @see https://api.browserstack.com/automate/plan.json
 * @see https://api.browserstack.com/app-automate/plan.json
 * */
const product = String(process.env.BS_PRODUCT || 'automate').toLowerCase();
const numberOfTries = Number(process.env.BS_RETRY) || 5;
const retryTimeout = product === 'app-automate' ? 15000 : 10000;
const percentageOfSessionsAllowed =
  Number(process.env.BS_SESSIONS_ALLOWED) || 80;
const user = process.env.BROWSERSTACK_USERNAME || '';
const key = process.env.BROWSERSTACK_KEY || '';
const auth = Buffer.from(`${user}:${key}`).toString('base64');

async function checkBSParallelSessions() {
  const response = await axios.get(
    `https://api.browserstack.com/${product}/plan.json`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    },
  );

  const percentageOfUsedSessions = Math.floor(
    (response.data.parallel_sessions_running /
      (response.data.team_parallel_sessions_max_allowed +
        response.data.queued_sessions_max_allowed)) *
      100,
  );

  if (percentageOfUsedSessions > percentageOfSessionsAllowed) {
    return Promise.reject(
      new Error(
        `Browserstack is currently running with ${percentageOfUsedSessions} % of used sessions concurrently, the limit is ${percentageOfSessionsAllowed} %, please try again later`,
      ),
    );
  }
}

async function main() {
  try {
    // Retry uses an exponential backoff with the default exponential of 2
    await retry(
      async () => {
        // if anything throws, we retry
        await checkBSParallelSessions();
      },
      {
        minTimeout: retryTimeout,
        factor: 2,
        onRetry: e => console.log(e),
        retries: numberOfTries,
      },
    );
  } catch (err) {
    console.log(`Even after the ${numberOfTries} tries, it fails with: ${err}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(e => {
    console.error(e);
    process.exit(1);
  });
}
