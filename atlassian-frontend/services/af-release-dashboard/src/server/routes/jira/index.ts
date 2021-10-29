import express from 'express';
import { STATUS } from '../../constants';
import { JiraIssue, JiraIssueChangelog } from '../../../utils/jira/types';
import { JiraUtils } from '../../../utils/jira/jira-utils';
import releaseService from '../../services/releases';
import logger from '../../logger';

const router = express.Router();

router.post('/jira/webhook', async (request, response, next) => {
  const { issue, changelog } = request.body as {
    issue: JiraIssue;
    changelog: JiraIssueChangelog;
  };

  try {
    if (!JiraUtils.isReleaseTicket(issue)) {
      return response.status(200);
    }
    const { releaseName } = JiraUtils.toFabDodgemTicket(issue);
    const release = await releaseService.find(releaseName);

    if (!release) {
      await releaseService.createEmpty({
        name: releaseName,
        createdDate: new Date().toISOString() as any, // TODO: Check that a Date will work
        jiraTicket: issue.key,
        pullRequests: [],
      });
    }
    const partialRelease = JiraUtils.createPartialReleaseFromChangelogs(
      issue.key,
      [changelog],
    );

    await releaseService.update(releaseName, partialRelease);
    logger.info({
      message: `Release ${releaseName} has been updated.`,
      release: {
        name: releaseName,
        ...partialRelease,
      },
    });
    return response.status(200).json({
      status: STATUS.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
