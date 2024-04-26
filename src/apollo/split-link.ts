import { HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { envService } from '@src/helpers/env-service';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';

const getToken = () => {
  const token = localStorage.getItem('jwt');
  return token ? `Bearer ${token}` : '';
};

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${envService.serverUrl.replace(/^http/i, 'ws')}/gql-ws`,
    connectionParams: {
      authToken: getToken(),
    },
  }),
);

const httpLink = new HttpLink({
  uri: `${envService.serverUrl}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getToken(),
    },
  };
});

export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);
