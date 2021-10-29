import { useState, useEffect } from 'react';
import { client } from '../../server/constants';
import { ReleaseRequestPayload } from '../interfaces/release-request-payload';

interface ReleaseProps {
  withPullRequests?: boolean;
}

interface SingleReleaseProps extends ReleaseProps {
  name: string;
}

interface ArrayReleaseProps extends ReleaseProps {
  limit?: number;
}

type ReturnValue<Props> = Props extends SingleReleaseProps
  ? ReleaseRequestPayload
  : ReleaseRequestPayload[];

function isSingleReleaseProps(
  props: ReleaseProps,
): props is SingleReleaseProps {
  return !!(props as SingleReleaseProps).name;
}

export function useFetchReleases<
  T extends SingleReleaseProps | ArrayReleaseProps
>(props: T): ReturnValue<T> | undefined {
  const [allReleases, setAllReleases] = useState<ReturnValue<T> | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(false);
  let url = '/api/v1/';
  if (isSingleReleaseProps(props)) {
    url += `release/${props.name}?`;
  } else {
    const limit = (props as ArrayReleaseProps).limit;
    let sizeUrl = limit ? `?size=${limit}` : '?';
    url += `releases${sizeUrl}&`;
  }

  if (props.withPullRequests) {
    url += 'expand=pull_requests';
  }

  useEffect(() => {
    const fetchAllReleases = async () => {
      try {
        setIsLoading(true);
        const releases = await client.get(url);
        setIsLoading(false);
        setAllReleases(releases.data.payload);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllReleases();
  }, [url]);

  if (isLoading) {
    return undefined;
  }
  return allReleases;
}
