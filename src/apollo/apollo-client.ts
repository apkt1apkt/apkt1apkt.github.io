import { ApolloClient, InMemoryCache } from '@apollo/client';
import { splitLink } from '@src/apollo/split-link';

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',

      nextFetchPolicy(currentFetchPolicy, { reason, initialFetchPolicy }) {
        if (reason === 'variables-changed') {
          return initialFetchPolicy;
        }

        if (currentFetchPolicy === 'network-only' || currentFetchPolicy === 'cache-and-network') {
          return 'cache-first';
        }

        return currentFetchPolicy;
      },
    },
  },
});
