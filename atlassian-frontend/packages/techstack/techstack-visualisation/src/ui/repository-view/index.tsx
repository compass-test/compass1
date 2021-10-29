import React, { FC } from 'react';

import { RouteContext } from '@atlaskit/router';
import Spinner from '@atlaskit/spinner';

import { SpinnerWrapper } from '../../common/styled';
import { useFiltersAction } from '../../controllers/filters';
import FetchTechStack from '../../services/fetch-techstack';

import { Header } from './header';
import { TableList } from './table-list';

export const RepositoryView: FC<RouteContext> = props => {
  const {
    match: { params },
  } = props;
  const [, setFiltersAction] = useFiltersAction();
  return (
    <>
      <FetchTechStack repository={params.repositoryName as string}>
        {({ loading, data }: { loading: boolean; data: any }) => {
          setFiltersAction.setUnAvailable(true);
          setFiltersAction.showPackage('all');
          if (loading) {
            return (
              <SpinnerWrapper>
                <Spinner size={'large'} />
              </SpinnerWrapper>
            );
          }
          if (!data) {
            return null;
          }
          return (
            <>
              <Header
                packages={Object.keys(data.techstack)}
                repository={params.repositoryName as string}
              />
              <TableList data={data} />
            </>
          );
        }}
      </FetchTechStack>
    </>
  );
};
