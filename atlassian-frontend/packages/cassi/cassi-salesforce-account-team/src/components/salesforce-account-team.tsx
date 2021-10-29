import React, { ComponentProps } from 'react';

import { gql, useQuery } from '@apollo/client';

import Avatar from '@atlaskit/avatar';
import { CustomerCentralProvider } from '@atlassian/customer-central-graph';

import {
  AccountMember,
  AvatarContainer,
  Container,
  ErrorContainer,
  List,
  LoadingContainer,
  LoadingRectangle,
  Name,
  NoResultsContainer,
  Role,
  Row,
} from './styled';

export const fetchSalesforceAccountTeamQuery = gql`
  query fetchSalesforceAccountTeam($domain: String!) {
    domain(url: $domain) {
      salesforceAccountTeam {
        id
        avatarUrl
        firstName
        lastName
        role
        slackInfo {
          slackTeamId
          slackUserId
        }
      }
    }
  }
`;

interface Props {
  /**
    Domain associated with the Salesforce Account Team
    Example: `atlassian.com`
   **/
  domain: string;
  /**
    Customize the view to remove the avatar in more compact display
   **/
  hideAvatar?: boolean;
}

interface QueryResponseData {
  domain: {
    salesforceAccountTeam?: SalesforceAccountTeamMember[];
  };
}
interface SalesforceAccountTeamMember {
  slackInfo: SlackInfo;
  id: string;
  avatarUrl: string;
  role: string;
  firstName: string;
  lastName: string;
}

interface SlackInfo {
  slackUserId: string;
  slackTeamId: string;
}

const linkToSlack = (slackInfo: SlackInfo) => {
  const { slackUserId, slackTeamId } = slackInfo;

  if (!slackUserId || !slackTeamId) {
    return;
  }

  window.open(`slack://user?team=${slackTeamId}&id=${slackUserId}`);
};

export const SalesforceAccountTeamWithoutProvider = ({
  domain,
  hideAvatar,
}: Props) => {
  const { data, loading, error } = useQuery<QueryResponseData>(
    fetchSalesforceAccountTeamQuery,
    {
      variables: {
        domain,
      },
    },
  );

  if (loading) {
    return (
      <Container>
        <LoadingContainer data-testid="loading-container">
          <LoadingRectangle contentWidth="60%" marginTop="0" />
          <LoadingRectangle contentWidth="60%" />
          <LoadingRectangle contentWidth="60%" />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer data-testid="error-container">
          Something went wrong :(
        </ErrorContainer>
      </Container>
    );
  }

  const salesforceAccountMembers = data?.domain?.salesforceAccountTeam ?? [];
  const hasResults = salesforceAccountMembers.length > 0;

  if (!hasResults) {
    return (
      <Container>
        <NoResultsContainer>
          There is no associated account team in Salesforce
        </NoResultsContainer>
      </Container>
    );
  }

  return (
    <Container>
      <List data-testid="results-container">
        {salesforceAccountMembers.map((member, index) => (
          <Row key={member.id + index}>
            <Role>{`${member.role}: `}</Role>
            <AccountMember onClick={() => linkToSlack(member.slackInfo)}>
              {!hideAvatar && (
                <AvatarContainer>
                  <Avatar src={member.avatarUrl} size={'small'} />
                </AvatarContainer>
              )}
              <Name>{`${member.firstName} ${member.lastName}`}</Name>
            </AccountMember>
          </Row>
        ))}
      </List>
    </Container>
  );
};

const SalesforceAccountTeam = (
  props: ComponentProps<typeof SalesforceAccountTeamWithoutProvider>,
) => {
  return (
    <CustomerCentralProvider>
      <SalesforceAccountTeamWithoutProvider {...props} />
    </CustomerCentralProvider>
  );
};

export default SalesforceAccountTeam;
