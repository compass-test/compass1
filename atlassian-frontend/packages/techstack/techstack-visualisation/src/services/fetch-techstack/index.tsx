import { useRef, useState } from 'react';

import { Product } from '../../common/types';

const getData = async (repository?: string) => {
  let url =
    'https://statlas.prod.atl-paas.net/afp/techstack-reports/atlassian-frontend.json';
  if (repository === Product.JIRA) {
    url =
      'https://jira-frontend-dashboard.us-east-1.staging.public.atl-paas.net/content/master/techstack/techstack-report.json';
  } else if (repository === Product.BITBUCKET) {
    url =
      'https://statlas.prod.atl-paas.net/afp/techstack-reports/frontbucket.json';
  }
  const result = await fetch(url);
  return result.json();
};

const FetchTechStack = (props: { children: any; repository?: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const firstFetchDone = useRef(false);
  const selectedRepository = useRef<string | undefined | null>(undefined);

  const fetch = async (repository?: string) => {
    setLoading(true);
    try {
      const result = await getData(repository);
      setData(result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  if (
    !firstFetchDone.current ||
    selectedRepository.current !== props.repository
  ) {
    firstFetchDone.current = true;
    selectedRepository.current = props.repository;
    fetch(props.repository);
  }

  return props.children({
    loading,
    error,
    data,
    fetch,
  });
};

export default FetchTechStack;
