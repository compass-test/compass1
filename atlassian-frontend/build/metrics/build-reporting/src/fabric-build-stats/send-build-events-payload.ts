/*
 * Utilities helper to send the events data to the fabric build stats service.
 */
import axios from 'axios';

import { IBuildEventProperties } from './types';

const { PIPELINES_JWT_TOKEN } = process.env;

export async function sendBuildEventsPayload(
  payload: Partial<IBuildEventProperties>,
) {
  const fabricStatsServiceUrl =
    // Default to localhost to test the service locally.
    process.env.FABRIC_STATS_SERVICE || 'http://localhost:8080';

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      Authorization: `Bearer ${PIPELINES_JWT_TOKEN}`,
    },
  };
  try {
    return axios.post(
      `${fabricStatsServiceUrl}/api/sendBuildData`,
      payload,
      config,
    );
  } catch (e) {
    if (e.isAxiosError) {
      if (e.response) {
        console.error(
          'Error sending build data',
          e.response.status,
          e.response.data,
        );
      }
      throw new Error(e.message);
    }
    throw e;
  }
}
