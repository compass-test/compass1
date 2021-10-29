import axios from 'axios';

import { writeFile } from '../../io/io';
import { getAxiosErrorMessage } from '../../utils/axios';

// Download the video and return it's new local path
async function downloadVideo(videoUrl: string, videoFilePath: string) {
  // Trim query parameters which may contain auth tokens for logging
  const sanitizedUrl = videoUrl.substr(0, videoUrl.indexOf('?'));
  try {
    const response = await axios.get<ArrayBuffer>(videoUrl, {
      responseType: 'arraybuffer',
    });
    const { data: buffer } = response;
    await writeFile(videoFilePath, buffer);
  } catch (error) {
    // Silently continue. Failed attachments aren't blockers.
    const message =
      getAxiosErrorMessage(error.response) || error.message || error;
    console.warn(`Failed to download: ${sanitizedUrl}\n`, message);
  }
  return videoFilePath;
}

// Get path to BrowserStack session recording
export async function getSessionVideoFilePath(
  videoUrl: string,
  sessionId: string,
) {
  const videoFilename = `recording-${sessionId.substr(0, 8)}.mp4`;
  return downloadVideo(videoUrl, videoFilename);
}
