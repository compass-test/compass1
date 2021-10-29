import axios from 'axios';

export async function createLandRequest(prId: number, token: string) {
  return await axios.post(
    'https://atlassian-frontend-landkid.services.atlassian.com/api/create-landrequest',
    {
      prId,
      entryPoint: 'land-when-able',
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
}
