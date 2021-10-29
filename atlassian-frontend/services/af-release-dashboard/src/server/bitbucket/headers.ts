const getHeaders = () => {
  const auth = Buffer.from(
    `${process.env.BITBUCKET_USER}:${process.env.BITBUCKET_PASSWORD}`,
  ).toString('base64');
  return {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  };
};

export default getHeaders;
