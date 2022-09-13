import React, { useMemo, useRef } from "react";
import Cookies from "universal-cookie";
import { createUploadLink } from "apollo-upload-client";

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

import { setContext } from "@apollo/client/link/context";

const graphqlEndpoint = "http://localhost:80/graphql";

export default function CustomApolloProvider(props) {
  const cookies = new Cookies();

  const client = useMemo(() => {
    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        auth: `ut ${cookies.get("token")}`,
        // tokenRef.current ? `ut ${tokenRef.current}` : null,
      },
    }));

    const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, location, path }) => {
          console.log(`message:${message} `);
        });
      }

      if (networkError) {
        console.log(`networkerror: ${networkError}`);
      }
    });

    const httpLink = createUploadLink({
      uri: graphqlEndpoint,
    });

    const link = ApolloLink.from([errorLink, authLink, httpLink]);
    // const wtfLink = ApolloLink.from([authLink, wsLink])

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client} {...props} />;
}
