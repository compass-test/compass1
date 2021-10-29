type GetMe = {
  extended_profile: ExtendedProfile;
};

type ExtendedProfile = {
  job_title: string;
  team_type: string;
};

const handleFetchResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }

  const error = new Error(
    `API responded with failure HTTP code: ${response.status}`,
  );
  throw error;
};

export const getAtlassianAccount = async (): Promise<GetMe> =>
  fetch('/gateway/api/me').then(handleFetchResponse);

export type GetUserSegmentationData = {
  title: string;
  teamType: string;
};

export const getUserSegmentationData = async (
  onUserSegError?: (err: Error) => void,
): Promise<GetUserSegmentationData> => {
  const response = {
    title: 'Unknown',
    teamType: 'Unknown',
  };

  try {
    const {
      extended_profile: extendedProfile = {
        job_title: 'Unknown',
        team_type: 'Unknown',
      },
    } = await getAtlassianAccount();

    response.title = extendedProfile.job_title;
    response.teamType = extendedProfile.team_type;
  } catch (err) {
    if (typeof onUserSegError === 'function') {
      onUserSegError(err);
    }
  }

  return response;
};
