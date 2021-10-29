const fetch = require('node-fetch');

module.exports = (app, { getRouter }) => {
  const router = getRouter('/');
  const {
    MESH_DEPENDENCY_CLA_INTERNAL_BASE_URL: CLAInternalURL,
    CLA_EXTERNAL_URL: CLAExternalURL,
    GITHUB_WEB_COMMIT_BOT_ID: githubWebBotID,
    GITHUB_ACTIONS_BOT_ID: githubActionsBotID,
    DEPENDABOT_ID: dependabotID,
    GREENKEEPER_BOT_ID: greenkeeperBotID,
    ATLASSIAN_BAMBOO_AGENT_ID: bambooAgentID,
    DEPENDABOT_PREVIEW_ID: dependabotPreviewID,
    RENOVATE_BOT_ID: renovateBotID,
    TASKCAT_ID: taskCatID,
  } = process.env;

  router.get('/healthcheck', (_, res) => {
    res.sendStatus(200);
  });

  router.get('/', (_, res) => {
    res.redirect(CLAExternalURL);
  });

  app.on(
    ['pull_request.opened', 'pull_request.synchronize'],
    async (context) => {
      await getPendingSigneesAndUpdatePR(
        context.octokit,
        context.payload,
        context.pullRequest(),
      );
    },
  );

  const whitelistedBotIDs = new Set([
    Number(githubWebBotID),
    Number(githubActionsBotID),
    Number(dependabotID),
    Number(greenkeeperBotID),
    Number(bambooAgentID),
    Number(dependabotPreviewID),
    Number(renovateBotID),
    Number(taskCatID),
  ]);

  const getPendingSigneesAndUpdatePR = async (
    octokit,
    payload,
    pullRequestParams,
  ) => {
    const { sha } = payload.pull_request.head;
    const { owner, repo: repoName, pull_number: number } = pullRequestParams;
    const { data: commits } = await octokit.pulls.listCommits(
      pullRequestParams,
    );

    // Maps commit author IDs to their current usernames
    // This is needed in case a user changes their username after signing the CLA
    const IDsToCurrentLogins = {};
    const externalEmails = new Set();

    for (const { author, committer, commit } of commits) {
      if (author === null && isExternalEmail(commit.author.email)) {
        externalEmails.add(commit.author.email.trim().toLowerCase());
      } else if (
        author &&
        // Filter out bot account IDs
        !whitelistedBotIDs.has(author.id) &&
        (await isNotOrgMember(octokit, owner, author.login))
      ) {
        IDsToCurrentLogins[author.id] = author.login;
      }

      if (committer === null && isExternalEmail(commit.committer.email)) {
        externalEmails.add(commit.committer.email.trim().toLowerCase());
      } else if (
        committer &&
        !whitelistedBotIDs.has(committer.id) &&
        (await isNotOrgMember(octokit, owner, committer.login))
      ) {
        IDsToCurrentLogins[committer.id] = committer.login;
      }
    }

    const {
      IDsOfNotSigned,
      loginsOfNotSigned,
      emailsOfNotSigned,
    } = await getPendingSignees(IDsToCurrentLogins, Array.from(externalEmails));

    if (emailsOfNotSigned.length || loginsOfNotSigned.length) {
      const loginsAndEmails = loginsOfNotSigned.concat(emailsOfNotSigned);
      const loginsOrEmails = loginsAndEmails
        .map((loginOrEmail) => `❌${loginOrEmail}\n`)
        .join('');

      const body = `Thank you for your submission! Like many open source projects, we ask that you sign our <a href=${CLAExternalURL}>CLA (Contributor License Agreement)</a> before we can accept your contribution.
      <strong>If your email is listed below</strong>, please ensure that you sign the CLA with the <strong>same email address</strong>.</br>
      <strong>The following users still need to sign our CLA:</strong></br>${loginsOrEmails}<p><sub>Already signed the CLA? To re-check, try refreshing the page.</sub></p>`;

      const upsertPR = await fetch(
        `${CLAInternalURL}/api/pull-requests/${number}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-SLAuth-Egress': true,
          },
          body: JSON.stringify({
            repo_owner: owner,
            repo_name: repoName,
            commit_sha: sha,
            github_ids: IDsOfNotSigned,
            github_names: loginsOfNotSigned,
            emails: emailsOfNotSigned,
          }),
        },
      );

      const { pullRequestEntry, isNewEntry } = await upsertPR.json();

      if (isNewEntry) {
        const { data: comment } = await octokit.issues.createComment({
          owner,
          repo: repoName,
          issue_number: number,
          body,
        });

        await fetch(`${CLAInternalURL}/api/pull-requests/${number}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-SLAuth-Egress': true,
          },
          body: JSON.stringify({
            repo_owner: owner,
            repo_name: repoName,
            comment_id: comment.id,
          }),
        });
      } else {
        await octokit.issues.updateComment({
          owner,
          repo: repoName,
          comment_id: pullRequestEntry.comment_id,
          body,
        });
      }

      await octokit.repos.createCommitStatus({
        owner,
        repo: repoName,
        sha,
        state: 'pending',
        target_url: CLAExternalURL,
        context: 'CLA',
        description:
          'Merging is blocked until the CLA has been signed by all external contributors.',
      });
    } else {
      await octokit.repos.createCommitStatus({
        owner,
        repo: repoName,
        sha,
        state: 'success',
        target_url: CLAExternalURL,
        context: 'CLA',
        description: 'Hooray! All contributors have signed the CLA.',
      });
    }
  };

  const getPendingSignees = async (IDsToCurrentLogins, externalEmails) => {
    const response = await fetch(
      `${CLAInternalURL}/api/pull-requests/pending-signees`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-SLAuth-Egress': true,
        },
        body: JSON.stringify({
          externalIDs: Object.keys(IDsToCurrentLogins),
          externalEmails,
        }),
      },
    );

    const { IDs, emails } = await response.json();
    const IDsOfSigned = new Set(IDs);
    const emailsOfSigned = new Set(emails);

    const IDsOfNotSigned = [];
    const loginsOfNotSigned = [];

    for (const [id, login] of Object.entries(IDsToCurrentLogins)) {
      if (!IDsOfSigned.has(Number(id))) {
        IDsOfNotSigned.push(id);
        loginsOfNotSigned.push(login);
      }
    }

    const emailsOfNotSigned = externalEmails.filter(
      (email) => !emailsOfSigned.has(email),
    );

    return {
      IDsOfNotSigned,
      loginsOfNotSigned,
      emailsOfNotSigned,
    };
  };

  const isExternalEmail = (email) => {
    return !email.endsWith('@atlassian.com');
  };

  const isNotOrgMember = async (octokit, org, username) => {
    try {
      await octokit.orgs.checkMembershipForUser({
        org,
        username,
      });
    } catch (e) {
      return e.status === 404;
    }

    return false;
  };
};
